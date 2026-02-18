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
    { value: 'default', label: 'Classique (bleu)' },
    { value: 'accent', label: 'Accent (violet)' },
    { value: 'success', label: 'Succes (vert)' },
    { value: 'warning', label: 'Alerte (rouge)' },
    { value: 'minimal', label: 'Minimal' }
  ];

  var SIZES = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' }
  ];

  registerBlockType('geo-blocks/stats-geo', {
    title: 'Stats GEO',
    icon: 'chart-bar',
    category: 'text',
    attributes: {
      value: { type: 'string', default: '' },
      unit: { type: 'string', default: '' },
      label: { type: 'string', default: '' },
      source: { type: 'string', default: '' },
      sourceUrl: { type: 'string', default: '' },
      year: { type: 'string', default: '' },
      style: { type: 'string', default: 'default' },
      size: { type: 'string', default: 'medium' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps({
        className: 'geo-stats geo-stats-style-' + attributes.style + ' geo-stats-size-' + attributes.size
      });

      return createElement('div', null,
        createElement(InspectorControls, null,
          createElement(PanelBody, { title: __('Options Stats', 'geo-blocks-suite') },
            createElement(TextControl, {
              label: __('Unite (%, €, M, etc.)', 'geo-blocks-suite'),
              value: attributes.unit,
              onChange: function(val) { setAttributes({ unit: val }); }
            }),
            createElement(SelectControl, {
              label: __('Style', 'geo-blocks-suite'),
              value: attributes.style,
              options: STYLES,
              onChange: function(val) { setAttributes({ style: val }); }
            }),
            createElement(SelectControl, {
              label: __('Taille', 'geo-blocks-suite'),
              value: attributes.size,
              options: SIZES,
              onChange: function(val) { setAttributes({ size: val }); }
            })
          ),
          createElement(PanelBody, { title: __('Source', 'geo-blocks-suite'), initialOpen: false },
            createElement(TextControl, {
              label: __('Source', 'geo-blocks-suite'),
              value: attributes.source,
              onChange: function(val) { setAttributes({ source: val }); },
              placeholder: __('Ex: INSEE, Statista...', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('URL de la source', 'geo-blocks-suite'),
              value: attributes.sourceUrl,
              onChange: function(val) { setAttributes({ sourceUrl: val }); },
              placeholder: 'https://...'
            }),
            createElement(TextControl, {
              label: __('Annee', 'geo-blocks-suite'),
              value: attributes.year,
              onChange: function(val) { setAttributes({ year: val }); },
              placeholder: '2024'
            })
          )
        ),
        createElement('div', blockProps,
          createElement('div', { className: 'geo-stats-box' },
            createElement('div', { className: 'geo-stats-value-wrapper' },
              createElement(RichText, {
                tagName: 'span',
                className: 'geo-stats-value',
                value: attributes.value,
                onChange: function(val) { setAttributes({ value: val }); },
                placeholder: '85'
              }),
              attributes.unit && createElement('span', { className: 'geo-stats-unit' }, attributes.unit)
            ),
            createElement(RichText, {
              tagName: 'p',
              className: 'geo-stats-label',
              value: attributes.label,
              onChange: function(val) { setAttributes({ label: val }); },
              placeholder: __('Description du chiffre...', 'geo-blocks-suite')
            }),
            (attributes.source || attributes.year) && createElement('div', { className: 'geo-stats-source' },
              attributes.source && createElement('span', null, 'Source : ', attributes.source),
              attributes.year && createElement('span', null, ' (', attributes.year, ')')
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var blockProps = useBlockProps.save({
        className: 'geo-stats geo-stats-style-' + attributes.style + ' geo-stats-size-' + attributes.size
      });

      var valueText = attributes.value ? attributes.value.replace(/<[^>]+>/g, '') : '';
      var labelText = attributes.label ? attributes.label.replace(/<[^>]+>/g, '') : '';

      var schema = {
        "@context": "https://schema.org",
        "@type": "Observation",
        "value": valueText + (attributes.unit || ''),
        "name": labelText
      };

      if (attributes.source) {
        schema.observedBy = {
          "@type": "Organization",
          "name": attributes.source
        };
        if (attributes.sourceUrl) {
          schema.observedBy.url = attributes.sourceUrl;
        }
      }

      if (attributes.year) {
        schema.observationDate = attributes.year;
      }

      return createElement('div', blockProps,
        createElement('figure', { className: 'geo-stats-box', 'data-geo-stats': 'true' },
          createElement('div', { className: 'geo-stats-value-wrapper' },
            createElement(RichText.Content, { tagName: 'span', className: 'geo-stats-value', value: attributes.value }),
            attributes.unit && createElement('span', { className: 'geo-stats-unit' }, attributes.unit)
          ),
          attributes.label && createElement(RichText.Content, { tagName: 'figcaption', className: 'geo-stats-label', value: attributes.label }),
          (attributes.source || attributes.year) && createElement('div', { className: 'geo-stats-source' },
            'Source : ',
            attributes.sourceUrl
              ? createElement('a', { href: attributes.sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, attributes.source || 'Lien')
              : (attributes.source || ''),
            attributes.year && createElement('span', null, ' (', attributes.year, ')')
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });
})();
