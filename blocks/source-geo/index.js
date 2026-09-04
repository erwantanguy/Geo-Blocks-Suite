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
  var createElement = wp.element.createElement;

  var STYLES = [
    { value: 'default', label: 'Par defaut (bleu)' },
    { value: 'success', label: 'Succes (vert)' },
    { value: 'warning', label: 'Attention (orange)' },
    { value: 'info', label: 'Info (violet)' },
    { value: 'minimal', label: 'Minimal (gris)' }
  ];

  registerBlockType('geo-blocks/source-geo', {
    title: 'Source GEO',
    icon: 'admin-links',
    category: 'text',
    attributes: {
      sourceName: { type: 'string', default: '' },
      sourceUrl: { type: 'string', default: '' },
      sourceTitle: { type: 'string', default: '' },
      sourceDate: { type: 'string', default: '' },
      sourcePublisher: { type: 'string', default: '' },
      description: { type: 'string', default: '' },
      style: { type: 'string', default: 'default' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps({ className: 'geo-source geo-source-style-' + attributes.style });

      return createElement(
        'div',
        null,
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Metadonnees de la source', 'geo-blocks-suite') },
            createElement(TextControl, {
              label: __('Nom de la source', 'geo-blocks-suite'),
              value: attributes.sourceName,
              onChange: function(val) { setAttributes({ sourceName: val }); },
              placeholder: __('Ex : INSEE, Ministere de la Sante...', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('Titre du document', 'geo-blocks-suite'),
              value: attributes.sourceTitle,
              onChange: function(val) { setAttributes({ sourceTitle: val }); },
              placeholder: __('Titre de l\'etude ou de l\'article source', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('URL', 'geo-blocks-suite'),
              value: attributes.sourceUrl,
              onChange: function(val) { setAttributes({ sourceUrl: val }); },
              placeholder: 'https://...',
              type: 'url'
            }),
            createElement(TextControl, {
              label: __('Date de publication', 'geo-blocks-suite'),
              value: attributes.sourceDate,
              onChange: function(val) { setAttributes({ sourceDate: val }); },
              placeholder: 'YYYY-MM-DD'
            }),
            createElement(TextControl, {
              label: __('Editeur / Organisme', 'geo-blocks-suite'),
              value: attributes.sourcePublisher,
              onChange: function(val) { setAttributes({ sourcePublisher: val }); },
              placeholder: __('Ex : INSEE, OMS, Universite...', 'geo-blocks-suite')
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
            { title: __('Conseils EEAT', 'geo-blocks-suite'), initialOpen: false },
            createElement('p', null, __('Une bonne source renforce l\'EEAT :', 'geo-blocks-suite')),
            createElement('ul', null,
              createElement('li', null, __('Source officielle ou reconnue', 'geo-blocks-suite')),
              createElement('li', null, __('Date de publication visible', 'geo-blocks-suite')),
              createElement('li', null, __('Lien direct vers le document original', 'geo-blocks-suite')),
              createElement('li', null, __('Nom de l\'organisme editeur', 'geo-blocks-suite'))
            )
          )
        ),
        createElement(
          'div',
          blockProps,
          createElement(
            'div',
            { className: 'geo-source-box' },
            createElement(
              'div',
              { className: 'geo-source-header' },
              createElement('span', { className: 'geo-source-icon', 'aria-hidden': 'true' }, '📚'),
              createElement('span', { className: 'geo-source-label' }, attributes.sourceName || __('Source', 'geo-blocks-suite'))
            ),
            createElement(RichText, {
              tagName: 'p',
              className: 'geo-source-description',
              value: attributes.description,
              onChange: function(val) { setAttributes({ description: val }); },
              placeholder: __('Decrivez brievement ce que cette source confirme...', 'geo-blocks-suite')
            }),
            (attributes.sourceUrl || attributes.sourceDate || attributes.sourcePublisher) && createElement(
              'div',
              { className: 'geo-source-meta' },
              attributes.sourceUrl && createElement(
                'a',
                { href: attributes.sourceUrl, className: 'geo-source-link', target: '_blank', rel: 'noopener noreferrer' },
                (attributes.sourceTitle || attributes.sourceUrl)
              ),
              attributes.sourcePublisher && createElement(
                'span',
                { className: 'geo-source-publisher' },
                ' — ' + attributes.sourcePublisher
              ),
              attributes.sourceDate && createElement(
                'span',
                { className: 'geo-source-date' },
                ' (' + attributes.sourceDate + ')'
              )
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;

      var citationData = {
        "@context": "https://schema.org",
        "@type": "Citation",
        "name": attributes.sourceName || ''
      };

      if (attributes.sourceTitle) {
        citationData.headline = attributes.sourceTitle;
      }
      if (attributes.sourceUrl) {
        citationData.url = attributes.sourceUrl;
      }
      if (attributes.sourceDate) {
        citationData.datePublished = attributes.sourceDate;
      }
      if (attributes.sourcePublisher) {
        citationData.publisher = {
          "@type": "Organization",
          "name": attributes.sourcePublisher
        };
      }
      if (attributes.description) {
        citationData.description = attributes.description.replace(/<[^>]+>/g, '');
      }

      var jsonLd = createElement('script', { type: 'application/ld+json' }, JSON.stringify(citationData, null, 2));

      var blockProps = useBlockProps.save({ className: 'geo-source geo-source-style-' + attributes.style });

      return createElement(
        'div',
        blockProps,
        createElement(
          'div',
          { className: 'geo-source-box', 'data-geo-source': 'true' },
          createElement(
            'div',
            { className: 'geo-source-header' },
            createElement('span', { className: 'geo-source-icon', 'aria-hidden': 'true' }, '📚'),
            createElement('span', { className: 'geo-source-label' }, attributes.sourceName || __('Source', 'geo-blocks-suite'))
          ),
          createElement(RichText.Content, { tagName: 'p', className: 'geo-source-description', value: attributes.description }),
          (attributes.sourceUrl || attributes.sourceDate || attributes.sourcePublisher) && createElement(
            'div',
            { className: 'geo-source-meta' },
            attributes.sourceUrl && createElement(
              'a',
              { href: attributes.sourceUrl, className: 'geo-source-link', target: '_blank', rel: 'noopener noreferrer' },
              (attributes.sourceTitle || attributes.sourceUrl)
            ),
            attributes.sourcePublisher && createElement(
              'span',
              { className: 'geo-source-publisher' },
              ' — ' + attributes.sourcePublisher
            ),
            attributes.sourceDate && createElement(
              'span',
              { className: 'geo-source-date' },
              ' (' + attributes.sourceDate + ')'
            )
          )
        ),
        jsonLd
      );
    }
  });

})();
