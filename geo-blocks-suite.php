<?php
/**
 * Plugin Name: GEO Blocks Suite
 * Description: Blocs Gutenberg optimisés GEO - BlockquoteGEO, FAQGEO, ImageGEO, VideoGEO, AudioGEO avec JSON-LD Schema.org.
 * Version: 1.0.1
 * Author: Erwan Tanguy - Ticoët
 * Author URI: https://www.ticoet.fr/
 * Text Domain: geo-blocks-suite
 * License: GPL2+
 */

if (!defined('ABSPATH')) {
    exit;
}

define('GEO_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('GEO_BLOCKS_URL', plugin_dir_url(__FILE__));
define('GEO_BLOCKS_VERSION', '1.0.1');

function geo_blocks_register_editor_assets() {
    $blocks = [
        'blockquote-geo',
        'faq-geo',
        'image-geo',
        'video-geo',
        'audio-geo',
    ];

    foreach ($blocks as $block) {
        $block_path = GEO_BLOCKS_PATH . 'blocks/' . $block;
        $block_url  = GEO_BLOCKS_URL . 'blocks/' . $block;

        if (file_exists($block_path . '/index.js')) {
            wp_register_script(
                'geo-blocks-' . $block . '-editor',
                $block_url . '/index.js',
                ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-api-fetch'],
                GEO_BLOCKS_VERSION,
                true
            );
        }

        if (file_exists($block_path . '/editor.css')) {
            wp_register_style(
                'geo-blocks-' . $block . '-editor-style',
                $block_url . '/editor.css',
                [],
                GEO_BLOCKS_VERSION
            );
        }

        if (file_exists($block_path . '/style.css')) {
            wp_register_style(
                'geo-blocks-' . $block . '-style',
                $block_url . '/style.css',
                [],
                GEO_BLOCKS_VERSION
            );
        }
    }
}
add_action('init', 'geo_blocks_register_editor_assets');

function geo_blocks_register_all() {

    $blocks = [
        'blockquote-geo',
        'faq-geo',
        'image-geo',
        'video-geo',
        'audio-geo',
    ];

    foreach ($blocks as $block) {
        $block_path = GEO_BLOCKS_PATH . 'blocks/' . $block;

        if (file_exists($block_path . '/block.json')) {
            $args = [
                'editor_script' => 'geo-blocks-' . $block . '-editor',
                'editor_style'  => 'geo-blocks-' . $block . '-editor-style',
                'style'         => 'geo-blocks-' . $block . '-style',
            ];

            if ($block === 'video-geo') {
                $args['render_callback'] = 'geo_blocks_render_video';
            }

            if ($block === 'image-geo') {
                $args['render_callback'] = 'geo_blocks_render_image';
            }

            if ($block === 'audio-geo') {
                $args['render_callback'] = 'geo_blocks_render_audio';
            }

            register_block_type($block_path, $args);
        }
    }
}
add_action('init', 'geo_blocks_register_all', 20);

/**
 * Rendu du bloc VideoGEO
 * V1.0.1 - Support fichier local ET URLs externes (YouTube, Vimeo, Dailymotion)
 */
function geo_blocks_render_video($attrs, $content) {

    // Debug
    if (defined('WP_DEBUG') && WP_DEBUG) {
        error_log('VideoGEO render - attrs: ' . print_r($attrs, true));
    }

    // Récupérer les attributs
    $source_type   = $attrs['sourceType'] ?? 'file';
    $url           = $attrs['url'] ?? '';
    $external_url  = $attrs['externalUrl'] ?? '';
    $title         = $attrs['title'] ?? '';
    $description   = $attrs['description'] ?? '';
    $creator       = $attrs['creator'] ?? '';
    $duration      = $attrs['duration'] ?? '';
    $poster_url    = $attrs['posterUrl'] ?? '';
    
    $license_type   = $attrs['licenseType'] ?? 'cc-by-sa';
    $license_custom = $attrs['licenseCustom'] ?? '';
    $license        = geo_blocks_resolve_license($license_type, $license_custom);

    // ✅ CORRECTION : Déterminer l'URL finale selon le type de source
    $final_url = '';
    $is_external = false;

    if ($source_type === 'external' && !empty($external_url)) {
        // Source externe (YouTube, Vimeo, Dailymotion)
        $final_url = $external_url;
        $is_external = true;
    } elseif (!empty($url)) {
        // Source fichier
        $final_url = $url;
        $is_external = false;
    }

    // Si aucune URL, ne rien afficher
    if (empty($final_url)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('VideoGEO: Aucune URL trouvée (url: "' . $url . '", externalUrl: "' . $external_url . '")');
        }
        return '<!-- VideoGEO: Aucune URL fournie -->';
    }

    if (defined('WP_DEBUG') && WP_DEBUG) {
        error_log('VideoGEO: URL finale = ' . $final_url . ' (externe: ' . ($is_external ? 'oui' : 'non') . ')');
    }

    // Générer le HTML de la vidéo
    if ($is_external) {
        // URL externe → iframe
        $embed_url = geo_blocks_convert_to_embed($final_url);
        
        $html_video = '<div class="geo-video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
                src="' . esc_url($embed_url) . '" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
        </div>';
    } else {
        // Fichier local → balise video
        $poster_attr = $poster_url ? ' poster="' . esc_url($poster_url) . '"' : '';
        $html_video = '<video src="' . esc_url($final_url) . '"' . $poster_attr . ' controls style="width: 100%; height: auto;"></video>';
    }

    // Générer les crédits
    $credits_html = '';
    if ($creator || $license) {
        $credits_parts = [];
        if ($creator) {
            $credits_parts[] = '<span class="geo-creator">Auteur : ' . esc_html($creator) . '</span>';
        }
        if ($license) {
            $credits_parts[] = '<a href="' . esc_url($license) . '" class="geo-license" target="_blank" rel="noopener">Licence</a>';
        }
        $credits_html = '<div class="geo-credits">' . implode(' | ', $credits_parts) . '</div>';
    }

    // Générer le JSON-LD
    $json = [
        "@context"    => "https://schema.org",
        "@type"       => "VideoObject",
        "name"        => esc_html($title),
        "description" => esc_html($description),
        "contentUrl"  => esc_url($final_url),
        "license"     => esc_url($license),
    ];

    if ($poster_url) {
        $json["thumbnailUrl"] = esc_url($poster_url);
    }
    if ($duration) {
        $json["duration"] = $duration;
    }
    if ($creator) {
        $json["creator"] = [
            "@type" => "Person",
            "name"  => esc_html($creator)
        ];
    }

    $json_ld = '<script type="application/ld+json">' . wp_json_encode($json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . '</script>';

    // Retourner le HTML complet
    return '
        <figure class="geo-media geo-video">
            ' . $html_video . '
            ' . ($title ? '<figcaption>' . esc_html($title) . '</figcaption>' : '') . '
            ' . $credits_html . '
        </figure>
        ' . $json_ld;
}

/**
 * Convertit une URL YouTube/Vimeo/Dailymotion en URL d'embed
 */
function geo_blocks_convert_to_embed($url) {
    if (empty($url)) {
        return '';
    }

    $embed_url = $url;

    // YouTube
    if (strpos($url, 'youtube.com/watch?v=') !== false) {
        $embed_url = str_replace('watch?v=', 'embed/', $url);
        // Retirer les paramètres après l'ID
        $embed_url = preg_replace('/&.*$/', '', $embed_url);
    } elseif (strpos($url, 'youtu.be/') !== false) {
        $video_id = str_replace(['https://youtu.be/', 'http://youtu.be/'], '', $url);
        $video_id = preg_replace('/\?.*$/', '', $video_id); // Retirer les paramètres
        $embed_url = 'https://www.youtube.com/embed/' . $video_id;
    }

    // Vimeo
    if (strpos($url, 'vimeo.com/') !== false && strpos($url, 'player.vimeo.com') === false) {
        $video_id = preg_replace('/.*vimeo\.com\/(\d+).*/', '$1', $url);
        $embed_url = 'https://player.vimeo.com/video/' . $video_id;
    }

    // Dailymotion
    if (strpos($url, 'dailymotion.com/video/') !== false) {
        $embed_url = str_replace('dailymotion.com/video/', 'dailymotion.com/embed/video/', $url);
    } elseif (strpos($url, 'dai.ly/') !== false) {
        $video_id = str_replace(['https://dai.ly/', 'http://dai.ly/'], '', $url);
        $video_id = preg_replace('/\?.*$/', '', $video_id);
        $embed_url = 'https://www.dailymotion.com/embed/video/' . $video_id;
    }

    return $embed_url;
}

function geo_blocks_render_image($attrs, $content) {

    if (empty($attrs['url'])) {
        return '';
    }

    $alt         = $attrs['alt'] ?? '';
    $description = $attrs['description'] ?? '';
    $caption     = $attrs['caption'] ?? '';
    $creator     = $attrs['creator'] ?? '';
    $url         = $attrs['url'];
    $fullUrl     = $attrs['fullUrl'] ?? $url;

    $licenseType   = $attrs['licenseType'] ?? 'cc-by-sa';
    $licenseCustom = $attrs['licenseCustom'] ?? '';
    $license       = geo_blocks_resolve_license($licenseType, $licenseCustom);

    $credits_html = '';
    if ($creator || $license) {
        $credits_parts = [];
        if ($creator) {
            $credits_parts[] = '<span class="geo-creator">Auteur : ' . esc_html($creator) . '</span>';
        }
        if ($license) {
            $credits_parts[] = '<a href="' . esc_url($license) . '" class="geo-license" target="_blank" rel="noopener">Licence</a>';
        }
        $credits_html = '<div class="geo-credits">' . implode(' | ', $credits_parts) . '</div>';
    }

    $html = '<figure class="geo-media geo-image">
                <a href="' . esc_url($fullUrl) . '" class="geo-lightbox" data-geo-src="' . esc_url($fullUrl) . '">
                    <img src="' . esc_url($url) . '" alt="' . esc_attr($description ?: $alt) . '">
                </a>
                ' . ($caption ? '<figcaption>' . esc_html($caption) . '</figcaption>' : '') . '
                ' . $credits_html . '
            </figure>';

    $json = [
        "@context"    => "https://schema.org",
        "@type"       => "ImageObject",
        "name"        => esc_html($alt),
        "description" => esc_html($description),
        "caption"     => esc_html($caption),
        "contentUrl"  => esc_url($fullUrl),
        "license"     => esc_url($license),
    ];

    if ($creator) {
        $json["creator"] = [
            "@type" => "Person",
            "name"  => esc_html($creator)
        ];
    }

    return $html . '<script type="application/ld+json">' . wp_json_encode($json, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
}

function geo_blocks_render_audio($attrs, $content) {

    if (empty($attrs['url'])) {
        return '';
    }

    $title       = $attrs['title'] ?? '';
    $description = $attrs['description'] ?? '';
    $creator     = $attrs['creator'] ?? '';
    $duration    = $attrs['duration'] ?? '';
    $url         = $attrs['url'];

    $licenseType   = $attrs['licenseType'] ?? 'cc-by-sa';
    $licenseCustom = $attrs['licenseCustom'] ?? '';
    $license       = geo_blocks_resolve_license($licenseType, $licenseCustom);

    $credits_html = '';
    if ($creator || $license) {
        $credits_parts = [];
        if ($creator) {
            $credits_parts[] = '<span class="geo-creator">Auteur : ' . esc_html($creator) . '</span>';
        }
        if ($license) {
            $credits_parts[] = '<a href="' . esc_url($license) . '" class="geo-license" target="_blank" rel="noopener">Licence</a>';
        }
        $credits_html = '<div class="geo-credits">' . implode(' | ', $credits_parts) . '</div>';
    }

    $html = '<figure class="geo-media geo-audio">
                <audio src="' . esc_url($url) . '" controls></audio>
                ' . ($title ? '<figcaption>' . esc_html($title) . '</figcaption>' : '') . '
                ' . $credits_html . '
            </figure>';

    $json = [
        "@context"    => "https://schema.org",
        "@type"       => "AudioObject",
        "name"        => esc_html($title),
        "description" => esc_html($description),
        "contentUrl"  => esc_url($url),
        "license"     => esc_url($license),
    ];

    if ($duration) {
        $json["duration"] = $duration;
    }
    if ($creator) {
        $json["creator"] = [
            "@type" => "Person",
            "name"  => esc_html($creator)
        ];
    }

    return $html . '<script type="application/ld+json">' . wp_json_encode($json, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
}

function geo_blocks_resolve_license($type, $custom) {
    switch ($type) {
        case 'cc-by':
            return 'https://creativecommons.org/licenses/by/4.0/';
        case 'cc-by-nc':
            return 'https://creativecommons.org/licenses/by-nc/4.0/';
        case 'cc0':
            return 'https://creativecommons.org/publicdomain/zero/1.0/';
        case 'custom':
            return !empty($custom) ? $custom : 'https://creativecommons.org/licenses/by-sa/4.0/';
        case 'cc-by-sa':
        default:
            return 'https://creativecommons.org/licenses/by-sa/4.0/';
    }
}

function geo_blocks_enqueue_assets() {
    wp_enqueue_style(
        'geo-blocks-style',
        GEO_BLOCKS_URL . 'assets/style.css',
        [],
        GEO_BLOCKS_VERSION
    );

    wp_enqueue_script(
        'geo-blocks-lightbox',
        GEO_BLOCKS_URL . 'assets/lightbox.js',
        [],
        GEO_BLOCKS_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'geo_blocks_enqueue_assets');