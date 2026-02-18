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

  var TITLES = [
    { value: 'En bref', label: 'En bref' },
    { value: 'TL;DR', label: 'TL;DR' },
    { value: 'A retenir', label: 'A retenir' },
    { value: 'L\'essentiel', label: 'L\'essentiel' },
    { value: 'Resume', label: 'Resume' },
    { value: 'custom', label: 'Personnalise...' }
  ];

  registerBlockType('geo-blocks/tldr-geo', {
    title: 'TL;DR GEO',
    icon: 'excerpt-view',
    category: 'text',
    attributes: {
      content: { type: 'string', default: '' },
      title: { type: 'string', default: 'En bref' },
      style: { type: 'string', default: 'default' },
      showIcon: { type: 'boolean', default: true }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var content = attributes.content;
      var title = attributes.title;
      var style = attributes.style;
      var showIcon = attributes.showIcon;
      var blockProps = useBlockProps({ className: 'geo-tldr geo-tldr-style-' + style });

      var isCustomTitle = !TITLES.some(function(t) { return t.value === title && t.value !== 'custom'; });
      var selectValue = isCustomTitle ? 'custom' : title;

      var charCount = content ? content.replace(/<[^>]+>/g, '').length : 0;
      var charClass = charCount > 280 ? 'geo-tldr-char-warning' : 'geo-tldr-char-ok';

      return createElement(
        'div',
        null,
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Options TL;DR', 'geo-blocks-suite') },
            createElement(SelectControl, {
              label: __('Titre', 'geo-blocks-suite'),
              value: selectValue,
              options: TITLES,
              onChange: function(val) {
                if (val === 'custom') {
                  setAttributes({ title: '' });
                } else {
                  setAttributes({ title: val });
                }
              }
            }),
            (selectValue === 'custom' || isCustomTitle) && createElement(TextControl, {
              label: __('Titre personnalise', 'geo-blocks-suite'),
              value: title,
              onChange: function(val) { setAttributes({ title: val }); },
              placeholder: __('Votre titre...', 'geo-blocks-suite')
            }),
            createElement(SelectControl, {
              label: __('Style visuel', 'geo-blocks-suite'),
              value: style,
              options: STYLES,
              onChange: function(val) { setAttributes({ style: val }); }
            }),
            createElement(ToggleControl, {
              label: __('Afficher l\'icone', 'geo-blocks-suite'),
              checked: showIcon,
              onChange: function(val) { setAttributes({ showIcon: val }); }
            })
          ),
          createElement(
            PanelBody,
            { title: __('Conseils GEO', 'geo-blocks-suite'), initialOpen: false },
            createElement('p', null, __('Un bon TL;DR pour les IA :', 'geo-blocks-suite')),
            createElement('ul', null,
              createElement('li', null, __('1-3 phrases maximum', 'geo-blocks-suite')),
              createElement('li', null, __('Repond a la question principale', 'geo-blocks-suite')),
              createElement('li', null, __('Moins de 280 caracteres ideal', 'geo-blocks-suite')),
              createElement('li', null, __('Evite le jargon technique', 'geo-blocks-suite'))
            )
          )
        ),
        createElement(
          'div',
          blockProps,
          createElement(
            'div',
            { className: 'geo-tldr-header' },
            showIcon && createElement('span', { className: 'geo-tldr-icon' }, '💡'),
            createElement('span', { className: 'geo-tldr-title' }, title || 'En bref')
          ),
          createElement(RichText, {
            tagName: 'p',
            className: 'geo-tldr-content',
            value: content,
            onChange: function(val) { setAttributes({ content: val }); },
            placeholder: __('Resumez l\'essentiel en 1-3 phrases...', 'geo-blocks-suite')
          }),
          createElement(
            'div',
            { className: 'geo-tldr-footer ' + charClass },
            createElement('span', null, charCount + '/280 caracteres'),
            charCount > 280 && createElement('span', { className: 'geo-tldr-warning' }, ' (trop long)')
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var content = attributes.content;
      var title = attributes.title || 'En bref';
      var style = attributes.style;
      var showIcon = attributes.showIcon;
      var blockProps = useBlockProps.save({ className: 'geo-tldr geo-tldr-style-' + style });

      var plainText = content ? content.replace(/<[^>]+>/g, '') : '';

      return createElement(
        'div',
        blockProps,
        createElement(
          'aside',
          { className: 'geo-tldr-box', 'data-geo-tldr': 'true', role: 'note', 'aria-label': title },
          createElement(
            'div',
            { className: 'geo-tldr-header' },
            showIcon && createElement('span', { className: 'geo-tldr-icon', 'aria-hidden': 'true' }, '💡'),
            createElement('strong', { className: 'geo-tldr-title' }, title)
          ),
          createElement(RichText.Content, { tagName: 'p', className: 'geo-tldr-content', value: content })
        ),
        createElement('meta', { itemProp: 'abstract', content: plainText }),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPageElement",
          "name": title,
          "text": plainText,
          "cssSelector": ".geo-tldr-box"
        }, null, 2))
      );
    }
  });

})();
