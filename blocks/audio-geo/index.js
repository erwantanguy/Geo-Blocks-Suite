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

  registerBlockType('geo-blocks/audio-geo', {
    title: 'AudioGEO',
    icon: 'format-audio',
    category: 'media',
    attributes: {
      audioId: { type: 'number' },
      url: { type: 'string', default: '' },
      title: { type: 'string', default: '' },
      description: { type: 'string', default: '' },
      duration: { type: 'string', default: '' },
      creator: { type: 'string', default: '' },
      licenseType: { type: 'string', default: 'cc-by-sa' },
      licenseCustom: { type: 'string', default: '' }
    },

    edit: function( props ) {
      var attrs = props.attributes || {};
      var set = props.setAttributes;
      var blockProps = useBlockProps();

      var licenseOptions = [
        { label: 'CC BY-SA 4.0 (par defaut)', value: 'cc-by-sa' },
        { label: 'CC BY 4.0', value: 'cc-by' },
        { label: 'CC BY-NC 4.0', value: 'cc-by-nc' },
        { label: 'CC0 (domaine public)', value: 'cc0' },
        { label: 'Autre licence (URL)', value: 'custom' }
      ];

      return createElement( Fragment, null,
        createElement( InspectorControls, null,
          createElement( PanelBody, { title: 'Options AudioGEO', initialOpen: true },
            createElement( TextControl, { 
              label: 'Titre du fichier audio', 
              value: attrs.title, 
              onChange: function(v){ set({ title: v }); } 
            }),
            createElement( TextareaControl, { 
              label: 'Description (pour IA et SEO)', 
              value: attrs.description, 
              onChange: function(v){ set({ description: v }); } 
            }),
            createElement( TextControl, { 
              label: 'Duree (format ISO 8601, ex: PT3M45S)', 
              value: attrs.duration, 
              onChange: function(v){ set({ duration: v }); },
              help: 'PT1H = 1 heure, PT5M = 5 minutes, PT30S = 30 secondes'
            }),
            createElement( TextControl, { 
              label: 'Auteur / createur', 
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
              label: 'URL licence personnalisee',
              value: attrs.licenseCustom,
              onChange: function(v){ set({ licenseCustom: v }); },
              placeholder: 'https://...'
            })
          )
        ),

        createElement( 'div', blockProps,
          createElement( MediaUpload, {
            onSelect: function(media){
              set({ 
                audioId: media.id, 
                url: media.url,
                title: attrs.title || media.title || '',
                description: attrs.description || media.description || ''
              });
            },
            allowedTypes: ['audio'],
            render: function(obj){
              return createElement( Button, { onClick: obj.open, isPrimary: true }, 
                attrs.url ? 'Remplacer le fichier audio' : 'Choisir un fichier audio' 
              );
            }
          }),

          createElement( 'div', { style: { marginTop: '12px' } },
            attrs.url ? createElement('figure', { className: 'geo-media geo-audio' },
              createElement('audio', { 
                src: attrs.url, 
                controls: true,
                style: { width: '100%' }
              }),
              attrs.title && createElement('figcaption', null, attrs.title)
            ) : createElement('p', null, 'Aucun fichier audio selectionne')
          )
        )
      );
    },

    save: function() {
      return null;
    }
  });

} )();
