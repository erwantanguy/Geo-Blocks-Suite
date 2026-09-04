(function(){
  if ( typeof wp === 'undefined' || !wp.blocks ) {
    return;
  }

  var registerBlockType = wp.blocks.registerBlockType;
  var __ = wp.i18n.__;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var SelectControl = wp.components.SelectControl;
  var ToggleControl = wp.components.ToggleControl;
  var createElement = wp.element.createElement;

  var STYLES = [
    { value: 'default', label: 'Par defaut (bleu)' },
    { value: 'success', label: 'Succes (vert)' },
    { value: 'warning', label: 'Attention (orange)' },
    { value: 'info', label: 'Info (violet)' },
    { value: 'minimal', label: 'Minimal (gris)' }
  ];

  registerBlockType('geo-blocks/update-geo', {
    title: 'Mise a jour GEO',
    icon: 'update',
    category: 'text',
    attributes: {
      updateDate: { type: 'string', default: '' },
      note: { type: 'string', default: '' },
      autoDate: { type: 'boolean', default: false },
      style: { type: 'string', default: 'default' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps({ className: 'geo-update geo-update-style-' + attributes.style });

      return createElement(
        'div',
        null,
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Options de mise a jour', 'geo-blocks-suite') },
            createElement(ToggleControl, {
              label: __('Date automatique (date du jour)', 'geo-blocks-suite'),
              checked: attributes.autoDate,
              onChange: function(val) {
                if (val) {
                  var today = new Date();
                  var yyyy = today.getFullYear();
                  var mm = String(today.getMonth() + 1).padStart(2, '0');
                  var dd = String(today.getDate()).padStart(2, '0');
                  setAttributes({ autoDate: true, updateDate: yyyy + '-' + mm + '-' + dd });
                } else {
                  setAttributes({ autoDate: false });
                }
              },
              help: attributes.autoDate
                ? __('La date sera mise a jour au moment de l\'enregistrement du bloc.', 'geo-blocks-suite')
                : __('Saisissez manuellement la date de mise a jour.', 'geo-blocks-suite')
            }),
            !attributes.autoDate && createElement(TextControl, {
              label: __('Date de mise a jour', 'geo-blocks-suite'),
              value: attributes.updateDate,
              onChange: function(val) { setAttributes({ updateDate: val }); },
              placeholder: 'YYYY-MM-DD'
            }),
            createElement(SelectControl, {
              label: __('Style visuel', 'geo-blocks-suite'),
              value: attributes.style,
              options: STYLES,
              onChange: function(val) { setAttributes({ style: val }); }
            })
          ),
          createElement(
            PanelBody,
            { title: __('Conseils fraicheur', 'geo-blocks-suite'), initialOpen: false },
            createElement('p', null, __('Un encart de mise a jour :', 'geo-blocks-suite')),
            createElement('ul', null,
              createElement('li', null, __('Signale la fraicheur aux visiteurs et aux IA', 'geo-blocks-suite')),
              createElement('li', null, __('Essentiel pour les contenus YMYL', 'geo-blocks-suite')),
              createElement('li', null, __('Decrivez ce qui a ete modifie', 'geo-blocks-suite')),
              createElement('li', null, __('Genere dateModified en JSON-LD', 'geo-blocks-suite'))
            )
          )
        ),
        createElement(
          'div',
          blockProps,
          createElement(
            'div',
            { className: 'geo-update-box' },
            createElement(
              'div',
              { className: 'geo-update-header' },
              createElement('span', { className: 'geo-update-icon', 'aria-hidden': 'true' }, '🔄'),
              createElement(
                'span',
                { className: 'geo-update-label' },
                __('Mis a jour le', 'geo-blocks-suite') + (attributes.updateDate ? ' ' + attributes.updateDate : ' ...')
              )
            ),
            createElement(RichText, {
              tagName: 'p',
              className: 'geo-update-note',
              value: attributes.note,
              onChange: function(val) { setAttributes({ note: val }); },
              placeholder: __('Ex : actualisation des tarifs 2026, ajout de la section securite...', 'geo-blocks-suite')
            })
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;

      var jsonLd = createElement('script', { type: 'application/ld+json' }, JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPageElement",
        "name": "Mise a jour",
        "dateModified": attributes.updateDate || undefined,
        "text": attributes.note ? attributes.note.replace(/<[^>]+>/g, '') : undefined
      }, null, 2));

      var blockProps = useBlockProps.save({ className: 'geo-update geo-update-style-' + attributes.style });

      return createElement(
        'div',
        blockProps,
        createElement(
          'div',
          { className: 'geo-update-box', 'data-geo-update': 'true' },
          createElement('meta', { itemProp: 'dateModified', content: attributes.updateDate || '' }),
          createElement(
            'div',
            { className: 'geo-update-header' },
            createElement('span', { className: 'geo-update-icon', 'aria-hidden': 'true' }, '🔄'),
            createElement(
              'span',
              { className: 'geo-update-label' },
              __('Mis a jour le', 'geo-blocks-suite') + (attributes.updateDate ? ' ' + attributes.updateDate : '')
            )
          ),
          createElement(RichText.Content, { tagName: 'p', className: 'geo-update-note', value: attributes.note })
        ),
        jsonLd
      );
    }
  });

})();
