( function() {
  if ( typeof wp === 'undefined' || !wp.blocks ) return;

  var registerBlockType = wp.blocks.registerBlockType;
  var createElement = wp.element.createElement;
  var Fragment = wp.element.Fragment;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody = wp.components.PanelBody;
  var Button = wp.components.Button;
  var SelectControl = wp.components.SelectControl;
  var TextControl = wp.components.TextControl;
  var TextareaControl = wp.components.TextareaControl;
  var RadioControl = wp.components.RadioControl;

  registerBlockType('geo-blocks/video-geo', {
    title: 'VideoGEO',
    icon: 'video-alt3',
    category: 'media',
    attributes: {
      // Type de source
      sourceType: { type: 'string', default: 'file' },
      
      // Fichier vidéo
      videoId: { type: 'number' },
      url: { type: 'string', default: '' },
      posterUrl: { type: 'string', default: '' },
      
      // URL externe
      externalUrl: { type: 'string', default: '' },
      
      // Métadonnées
      title: { type: 'string', default: '' },
      description: { type: 'string', default: '' },
      duration: { type: 'string', default: '' },
      creator: { type: 'string', default: '' },
      licenseType: { type: 'string', default: 'cc-by-sa' },
      licenseCustom: { type: 'string', default: '' },
      transcript: { type: 'string', default: '' },
      showTranscript: { type: 'boolean', default: false }
    },

    edit: function( props ) {
      var attrs = props.attributes || {};
      var set = props.setAttributes;
      var blockProps = useBlockProps();

      // Fonction pour générer l'URL d'embed
      function getEmbedUrl(url) {
        if (!url) return '';
        
        var embedUrl = url;
        
        // YouTube
        if (url.includes('youtube.com/watch?v=')) {
          embedUrl = url.replace('watch?v=', 'embed/').split('&')[0];
        } else if (url.includes('youtu.be/')) {
          var videoId = url.split('youtu.be/')[1].split('?')[0];
          embedUrl = 'https://www.youtube.com/embed/' + videoId;
        }
        
        // Vimeo
        if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
          var vimeoId = url.split('vimeo.com/')[1].split('?')[0].split('/')[0];
          embedUrl = 'https://player.vimeo.com/video/' + vimeoId;
        }
        
        // Dailymotion
        if (url.includes('dailymotion.com/video/')) {
          embedUrl = url.replace('dailymotion.com/video/', 'dailymotion.com/embed/video/');
        } else if (url.includes('dai.ly/')) {
          var dmId = url.split('dai.ly/')[1].split('?')[0];
          embedUrl = 'https://www.dailymotion.com/embed/video/' + dmId;
        }
        
        return embedUrl;
      }

      var licenseOptions = [
        { label: 'CC BY-SA 4.0 (par défaut)', value: 'cc-by-sa' },
        { label: 'CC BY 4.0', value: 'cc-by' },
        { label: 'CC BY-NC 4.0', value: 'cc-by-nc' },
        { label: 'CC0 (domaine public)', value: 'cc0' },
        { label: 'Autre licence (URL)', value: 'custom' }
      ];

      return createElement( Fragment, null,
        
        // Panel latéral (Sidebar)
        createElement( InspectorControls, null,
          createElement( PanelBody, { title: 'Métadonnées VideoGEO', initialOpen: true },
            createElement( TextControl, { 
              label: 'Titre de la vidéo', 
              value: attrs.title, 
              onChange: function(v){ set({ title: v }); } 
            }),
            createElement( TextareaControl, { 
              label: 'Description (pour IA et SEO)', 
              value: attrs.description, 
              onChange: function(v){ set({ description: v }); },
              rows: 3
            }),
            createElement( TextControl, { 
              label: 'Durée (format ISO 8601)', 
              value: attrs.duration, 
              onChange: function(v){ set({ duration: v }); },
              help: 'Ex: PT5M (5 minutes), PT1M30S (1min30sec)',
              placeholder: 'PT5M'
            }),
            createElement( TextControl, { 
              label: 'Auteur / créateur', 
              value: attrs.creator, 
              onChange: function(v){ set({ creator: v }); } 
            }),
            createElement( SelectControl, {
              label: 'Licence',
              value: attrs.licenseType,
              options: licenseOptions,
              onChange: function(v){ set({ licenseType: v }); }
            }),
            attrs.licenseType === 'custom' && createElement( TextControl, {
              label: 'URL licence personnalisée',
              value: attrs.licenseCustom,
              onChange: function(v){ set({ licenseCustom: v }); },
              placeholder: 'https://...'
            })
          ),
          createElement( PanelBody, { title: 'Transcription (GEO)', initialOpen: false },
            createElement( TextareaControl, {
              label: 'Transcription de la vidéo',
              value: attrs.transcript,
              onChange: function(v){ set({ transcript: v }); },
              rows: 8,
              help: 'Texte intégral de la vidéo. Essentiel pour le GEO et l\'accessibilité.'
            }),
            createElement( wp.components.ToggleControl, {
              label: 'Afficher la transcription sur la page',
              checked: attrs.showTranscript,
              onChange: function(v){ set({ showTranscript: v }); },
              help: 'Si activé, la transcription sera visible sous la vidéo dans un accordéon.'
            })
          )
        ),

        // Contenu principal du bloc
        createElement( 'div', blockProps,
          
          // Sélecteur de type de source
          createElement( 'div', { 
            style: { 
              marginBottom: '16px',
              padding: '12px',
              background: '#f0f0f0',
              borderRadius: '4px'
            } 
          },
            createElement( RadioControl, {
              label: 'Type de source vidéo',
              selected: attrs.sourceType || 'file',
              options: [
                { label: '📁 Fichier (médiathèque)', value: 'file' },
                { label: '🌐 URL externe (YouTube, Vimeo, Dailymotion)', value: 'external' }
              ],
              onChange: function(value) {
                set({ sourceType: value });
              }
            })
          ),

          // === SOURCE : FICHIER ===
          attrs.sourceType === 'file' && createElement( 'div', { className: 'geo-video-file-source' },
            
            createElement( 'div', { 
              style: { 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '12px',
                flexWrap: 'wrap'
              } 
            },
              createElement( MediaUpload, {
                onSelect: function(media){
                  console.log('Fichier vidéo sélectionné:', media);
                  set({ 
                    videoId: media.id, 
                    url: media.url,
                    externalUrl: '',
                    sourceType: 'file',
                    title: attrs.title || media.title || '',
                    description: attrs.description || media.description || ''
                  });
                },
                allowedTypes: ['video'],
                value: attrs.videoId,
                render: function(obj){
                  return createElement( Button, { 
                    onClick: obj.open, 
                    variant: 'primary'
                  }, 
                    attrs.url && !attrs.externalUrl ? 'Remplacer la vidéo' : 'Choisir une vidéo' 
                  );
                }
              }),
              
              createElement( MediaUpload, {
                onSelect: function(media){
                  set({ posterUrl: media.url });
                },
                allowedTypes: ['image'],
                value: attrs.posterUrl,
                render: function(obj){
                  return createElement( Button, { 
                    onClick: obj.open, 
                    variant: 'secondary'
                  }, 
                    attrs.posterUrl ? 'Remplacer la vignette' : 'Ajouter une vignette' 
                  );
                }
              })
            ),

            // Prévisualisation fichier
            createElement( 'div', { style: { marginTop: '12px' } },
              attrs.url && !attrs.externalUrl ? 
                createElement('figure', { 
                  className: 'geo-media geo-video',
                  style: { margin: 0 }
                },
                  createElement('video', { 
                    src: attrs.url, 
                    controls: true, 
                    poster: attrs.posterUrl || undefined,
                    style: { 
                      maxWidth: '100%', 
                      maxHeight: '400px',
                      display: 'block',
                      borderRadius: '4px'
                    }
                  }),
                  attrs.title && createElement('figcaption', { 
                    style: { 
                      marginTop: '8px',
                      fontSize: '14px',
                      color: '#666',
                      textAlign: 'center'
                    } 
                  }, attrs.title)
                ) 
              : 
                createElement('div', { 
                  style: { 
                    padding: '40px', 
                    border: '2px dashed #ddd', 
                    borderRadius: '4px', 
                    textAlign: 'center',
                    color: '#666',
                    background: '#fafafa'
                  } 
                }, 
                  createElement('div', { style: { fontSize: '48px', marginBottom: '10px' } }, '🎬'),
                  createElement('p', { style: { margin: 0 } }, 'Aucune vidéo sélectionnée')
                )
            )
          ),

          // === SOURCE : URL EXTERNE ===
          attrs.sourceType === 'external' && createElement( 'div', { className: 'geo-video-external-source' },
            
            createElement( TextControl, {
              label: 'URL de la vidéo YouTube, Vimeo ou Dailymotion',
              value: attrs.externalUrl || '',
              onChange: function(url) {
                console.log('URL externe saisie:', url);
                set({ 
                  externalUrl: url,
                  url: url, // Pour le JSON-LD
                  videoId: null, // Réinitialiser
                  sourceType: 'external'
                });
              },
              placeholder: 'https://youtube.com/watch?v=... ou https://vimeo.com/...',
              help: 'Collez l\'URL complète de la vidéo',
              style: { marginBottom: '12px' }
            }),

            // Info sur la plateforme détectée
            attrs.externalUrl && createElement( 'div', {
              style: {
                padding: '8px 12px',
                background: '#e7f3ff',
                border: '1px solid #2271b1',
                borderRadius: '4px',
                marginBottom: '12px',
                fontSize: '13px',
                color: '#004085'
              }
            },
              attrs.externalUrl.includes('youtube.com') || attrs.externalUrl.includes('youtu.be') ? 
                '▶️ Plateforme détectée : YouTube' :
              attrs.externalUrl.includes('vimeo.com') ? 
                '▶️ Plateforme détectée : Vimeo' :
              attrs.externalUrl.includes('dailymotion.com') || attrs.externalUrl.includes('dai.ly') ?
                '▶️ Plateforme détectée : Dailymotion' :
                '⚠️ URL non reconnue (YouTube, Vimeo ou Dailymotion attendu)'
            ),

            // Prévisualisation URL externe
            createElement( 'div', { style: { marginTop: '12px' } },
              attrs.externalUrl ? 
                createElement('figure', { 
                  className: 'geo-media geo-video',
                  style: { margin: 0 }
                },
                  createElement('div', {
                    style: {
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                      overflow: 'hidden',
                      borderRadius: '4px'
                    }
                  },
                    createElement('iframe', {
                      src: getEmbedUrl(attrs.externalUrl),
                      style: { 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%', 
                        height: '100%',
                        border: 'none'
                      },
                      allowFullScreen: true,
                      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    })
                  ),
                  attrs.title && createElement('figcaption', { 
                    style: { 
                      marginTop: '8px',
                      fontSize: '14px',
                      color: '#666',
                      textAlign: 'center'
                    } 
                  }, attrs.title)
                ) 
              : 
                createElement('div', { 
                  style: { 
                    padding: '40px', 
                    border: '2px dashed #ddd', 
                    borderRadius: '4px', 
                    textAlign: 'center',
                    color: '#666',
                    background: '#fafafa'
                  } 
                }, 
                  createElement('div', { style: { fontSize: '48px', marginBottom: '10px' } }, '🌐'),
                  createElement('p', { style: { margin: 0 } }, 'Collez une URL YouTube, Vimeo ou Dailymotion ci-dessus')
                )
            ),

            // Bouton pour vignette personnalisée
            attrs.externalUrl && createElement( 'div', { 
              style: { 
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid #ddd'
              } 
            },
              createElement( MediaUpload, {
                onSelect: function(media){
                  set({ posterUrl: media.url });
                },
                allowedTypes: ['image'],
                value: attrs.posterUrl,
                render: function(obj){
                  return createElement( Button, { 
                    onClick: obj.open, 
                    variant: 'secondary'
                  }, 
                    attrs.posterUrl ? 'Remplacer la vignette personnalisée' : 'Ajouter une vignette personnalisée' 
                  );
                }
              })
            )
          )
        )
      );
    },

    save: function() {
      return null; // Rendu côté serveur
    }
  });

} )();