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

  function resolveLicense(licenseType, customUrl) {
    switch (licenseType) {
      case 'cc-by': return "https://creativecommons.org/licenses/by/4.0/";
      case 'cc-by-nc': return "https://creativecommons.org/licenses/by-nc/4.0/";
      case 'cc0': return "https://creativecommons.org/publicdomain/zero/1.0/";
      case 'custom': return (customUrl && customUrl.trim()) ? customUrl : "https://creativecommons.org/licenses/by-sa/4.0/";
      case 'cc-by-sa':
      default: return "https://creativecommons.org/licenses/by-sa/4.0/";
    }
  }

  registerBlockType('geo-blocks/image-geo', {
    title: 'ImageGEO',
    icon: 'format-image',
    category: 'media',
    attributes: {
      imageId: { type: 'number' },
      url: { type: 'string', default: '' },
      fullUrl: { type: 'string', default: '' },
      size: { type: 'string', default: 'large' },
      alt: { type: 'string', default: '' },
      caption: { type: 'string', default: '' },
      description: { type: 'string', default: '' },
      creator: { type: 'string', default: '' },
      licenseType: { type: 'string', default: 'cc-by-sa' },
      licenseCustom: { type: 'string', default: '' }
    },

    edit: function( props ) {
      var attrs = props.attributes || {};
      var set = props.setAttributes;
      var blockProps = useBlockProps();

      var sizeOptions = [
        { label: 'Miniature', value: 'thumbnail' },
        { label: 'Moyenne', value: 'medium' },
        { label: 'Grande', value: 'large' },
        { label: 'Originale', value: 'full' }
      ];

      var licenseOptions = [
        { label: 'CC BY-SA 4.0 (par defaut)', value: 'cc-by-sa' },
        { label: 'CC BY 4.0', value: 'cc-by' },
        { label: 'CC BY-NC 4.0', value: 'cc-by-nc' },
        { label: 'CC0 (domaine public)', value: 'cc0' },
        { label: 'Autre licence (URL)', value: 'custom' }
      ];

      return createElement( Fragment, null,
        createElement( 'div', blockProps,
          createElement( MediaUpload, {
            onSelect: function(media){
              var sizeKey = attrs.size || 'large';
              var url = (media.sizes && media.sizes[sizeKey] && media.sizes[sizeKey].url) ? media.sizes[sizeKey].url : media.url;
              var full = (media.sizes && media.sizes.full && media.sizes.full.url) ? media.sizes.full.url : media.url;
              set({ imageId: media.id, url: url, fullUrl: full, alt: media.alt || '' });
            },
            allowedTypes: ['image'],
            render: function(obj){
              return createElement( Button, { onClick: obj.open, isPrimary: true }, attrs.url ? 'Remplacer l\'image' : 'Choisir une image' );
            }
          }),

          createElement( InspectorControls, null,
            createElement( PanelBody, { title: 'Options ImageGEO', initialOpen: true },
              createElement( SelectControl, {
                label: 'Taille a afficher',
                value: attrs.size,
                options: sizeOptions,
                onChange: function(v){
                    set({ size: v });
                    if (attrs.imageId) {
                        wp.apiFetch({ path: '/wp/v2/media/' + attrs.imageId })
                            .then(function(media){
                                if (!media || !media.media_details) return;
                                var sizes = media.media_details.sizes || {};
                                var newUrl = sizes[v] && sizes[v].source_url ? sizes[v].source_url : media.source_url;
                                var full = sizes.full && sizes.full.source_url ? sizes.full.source_url : media.source_url;
                                set({ url: newUrl, fullUrl: full });
                            });
                    }
                }
              }),
              createElement( TextControl, { label: 'Alt (texte alternatif)', value: attrs.alt, onChange: function(v){ set({ alt: v }); } }),
              createElement( TextControl, { label: 'Legende (caption)', value: attrs.caption, onChange: function(v){ set({ caption: v }); } }),
              createElement( TextControl, { label: 'Description (pour IA)', value: attrs.description, onChange: function(v){ set({ description: v }); } }),
              createElement( TextControl, { label: 'Auteur / createur', value: attrs.creator, onChange: function(v){ set({ creator: v }); } }),
              createElement( SelectControl, {
                label: 'Licence',
                value: attrs.licenseType,
                options: licenseOptions,
                onChange: function(v){ set({ licenseType: v }); }
              }),
              attrs.licenseType === 'custom' && createElement( TextControl, {
                label: 'URL licence personnalisee',
                value: attrs.licenseCustom,
                onChange: function(v){ set({ licenseCustom: v }); },
                placeholder: 'https://...'
              })
            )
          ),

          createElement( 'div', { style: { marginTop: '12px' } },
            attrs.url ? createElement('figure', { className: 'geo-media geo-image' },
              createElement('a', { href: attrs.fullUrl || attrs.url, className: 'geo-lightbox', 'data-geo-src': (attrs.fullUrl || attrs.url) },
                createElement('img', { src: attrs.url, alt: attrs.alt || '' })
              ),
              attrs.caption ? createElement('figcaption', null, attrs.caption) : null
            ) : createElement('p', null, 'Aucune image selectionnee')
          )
        )
      );
    },

    save: function() {
      return null;
    }
  });

} )();
