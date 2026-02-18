(function(){
  if (typeof wp === 'undefined' || !wp.blocks) return;

  var registerBlockType = wp.blocks.registerBlockType;
  var __ = wp.i18n.__;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var SelectControl = wp.components.SelectControl;
  var createElement = wp.element.createElement;

  var STYLES = [
    { value: 'default', label: 'Dictionnaire (bleu)' },
    { value: 'card', label: 'Carte (blanc)' },
    { value: 'highlight', label: 'Surligne (jaune)' },
    { value: 'minimal', label: 'Minimal (gris)' }
  ];

  registerBlockType('geo-blocks/definition-geo', {
    title: 'Definition GEO',
    icon: 'book-alt',
    category: 'text',
    attributes: {
      term: { type: 'string', default: '' },
      definition: { type: 'string', default: '' },
      source: { type: 'string', default: '' },
      sourceUrl: { type: 'string', default: '' },
      style: { type: 'string', default: 'default' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps({ className: 'geo-definition geo-definition-style-' + attributes.style });

      return createElement('div', null,
        createElement(InspectorControls, null,
          createElement(PanelBody, { title: __('Options Definition', 'geo-blocks-suite') },
            createElement(SelectControl, {
              label: __('Style visuel', 'geo-blocks-suite'),
              value: attributes.style,
              options: STYLES,
              onChange: function(val) { setAttributes({ style: val }); }
            }),
            createElement(TextControl, {
              label: __('Source (facultatif)', 'geo-blocks-suite'),
              value: attributes.source,
              onChange: function(val) { setAttributes({ source: val }); },
              placeholder: __('Ex: Wikipedia, Larousse...', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('URL de la source', 'geo-blocks-suite'),
              value: attributes.sourceUrl,
              onChange: function(val) { setAttributes({ sourceUrl: val }); },
              placeholder: 'https://...'
            })
          )
        ),
        createElement('div', blockProps,
          createElement('div', { className: 'geo-definition-box' },
            createElement('div', { className: 'geo-definition-header' },
              createElement('span', { className: 'geo-definition-icon' }, '📖'),
              createElement('span', { className: 'geo-definition-label' }, __('Definition', 'geo-blocks-suite'))
            ),
            createElement(RichText, {
              tagName: 'dt',
              className: 'geo-definition-term',
              value: attributes.term,
              onChange: function(val) { setAttributes({ term: val }); },
              placeholder: __('Terme a definir...', 'geo-blocks-suite')
            }),
            createElement(RichText, {
              tagName: 'dd',
              className: 'geo-definition-text',
              value: attributes.definition,
              onChange: function(val) { setAttributes({ definition: val }); },
              placeholder: __('Definition du terme...', 'geo-blocks-suite')
            }),
            attributes.source && createElement('div', { className: 'geo-definition-source' },
              'Source : ', attributes.source
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var blockProps = useBlockProps.save({ className: 'geo-definition geo-definition-style-' + attributes.style });

      var termText = attributes.term ? attributes.term.replace(/<[^>]+>/g, '') : '';
      var definitionText = attributes.definition ? attributes.definition.replace(/<[^>]+>/g, '') : '';

      var schema = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": termText,
        "description": definitionText
      };

      if (attributes.sourceUrl) {
        schema.inDefinedTermSet = {
          "@type": "DefinedTermSet",
          "name": attributes.source || "Source",
          "url": attributes.sourceUrl
        };
      }

      return createElement('div', blockProps,
        createElement('dl', { className: 'geo-definition-box', 'data-geo-definition': 'true' },
          createElement('div', { className: 'geo-definition-header' },
            createElement('span', { className: 'geo-definition-icon', 'aria-hidden': 'true' }, '📖'),
            createElement('span', { className: 'geo-definition-label' }, 'Definition')
          ),
          createElement(RichText.Content, { tagName: 'dt', className: 'geo-definition-term', value: attributes.term }),
          createElement(RichText.Content, { tagName: 'dd', className: 'geo-definition-text', value: attributes.definition }),
          attributes.source && createElement('div', { className: 'geo-definition-source' },
            'Source : ',
            attributes.sourceUrl
              ? createElement('a', { href: attributes.sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, attributes.source)
              : attributes.source
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });
})();
