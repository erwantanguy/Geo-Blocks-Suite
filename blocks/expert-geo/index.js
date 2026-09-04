(function(){
  if ( typeof wp === 'undefined' || !wp.blocks ) {
    return;
  }

  var registerBlockType = wp.blocks.registerBlockType;
  var __ = wp.i18n.__;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var SelectControl = wp.components.SelectControl;
  var Button = wp.components.Button;
  var createElement = wp.element.createElement;

  var STYLES = [
    { value: 'default', label: 'Par defaut (bleu)' },
    { value: 'success', label: 'Succes (vert)' },
    { value: 'warning', label: 'Attention (orange)' },
    { value: 'info', label: 'Info (violet)' },
    { value: 'minimal', label: 'Minimal (gris)' }
  ];

  registerBlockType('geo-blocks/expert-geo', {
    title: 'Avis expert GEO',
    icon: 'awards',
    category: 'text',
    attributes: {
      expertName: { type: 'string', default: '' },
      credentials: { type: 'string', default: '' },
      quote: { type: 'string', default: '' },
      expertUrl: { type: 'string', default: '' },
      expertImage: { type: 'string', default: '' },
      style: { type: 'string', default: 'default' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps({ className: 'geo-expert geo-expert-style-' + attributes.style });

      return createElement(
        'div',
        null,
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Expert', 'geo-blocks-suite') },
            createElement(TextControl, {
              label: __('Nom de l\'expert', 'geo-blocks-suite'),
              value: attributes.expertName,
              onChange: function(val) { setAttributes({ expertName: val }); },
              placeholder: __('Ex : Dr Jean Dupont', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('Credentials / Titre', 'geo-blocks-suite'),
              value: attributes.credentials,
              onChange: function(val) { setAttributes({ credentials: val }); },
              placeholder: __('Ex : Medecin, 20 ans d experience, cardiologue...', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('URL profil / site', 'geo-blocks-suite'),
              value: attributes.expertUrl,
              onChange: function(val) { setAttributes({ expertUrl: val }); },
              placeholder: 'https://...',
              type: 'url'
            }),
            createElement(MediaUpload, {
              onSelect: function(media) {
                setAttributes({ expertImage: media.url });
              },
              allowedTypes: ['image'],
              render: function(obj) {
                return createElement(
                  Button,
                  { variant: 'secondary', onClick: obj.open },
                  attributes.expertImage ? __('Changer la photo', 'geo-blocks-suite') : __('Photo de l\'expert', 'geo-blocks-suite')
                );
              }
            }),
            attributes.expertImage && createElement(
              Button,
              {
                variant: 'link',
                isDestructive: true,
                onClick: function() { setAttributes({ expertImage: '' }); }
              },
              __('Retirer la photo', 'geo-blocks-suite')
            ),
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
            createElement('p', null, __('Un bon avis expert :', 'geo-blocks-suite')),
            createElement('ul', null,
              createElement('li', null, __('Nom et credentials visibles', 'geo-blocks-suite')),
              createElement('li', null, __('Avis factuel et verifiable', 'geo-blocks-suite')),
              createElement('li', null, __('Lien vers un profil officiel', 'geo-blocks-suite')),
              createElement('li', null, __('Genere un schema Person cite', 'geo-blocks-suite'))
            )
          )
        ),
        createElement(
          'div',
          blockProps,
          createElement(
            'div',
            { className: 'geo-expert-box' },
            createElement(
              'div',
              { className: 'geo-expert-quote-row' },
              createElement('span', { className: 'geo-expert-quote-mark', 'aria-hidden': 'true' }, '“'),
              createElement(RichText, {
                tagName: 'blockquote',
                className: 'geo-expert-quote',
                value: attributes.quote,
                onChange: function(val) { setAttributes({ quote: val }); },
                placeholder: __('L\'avis ou la citation de l\'expert...', 'geo-blocks-suite')
              })
            ),
            createElement(
              'div',
              { className: 'geo-expert-author-row' },
              attributes.expertImage && createElement('img', {
                className: 'geo-expert-photo',
                src: attributes.expertImage,
                alt: attributes.expertName || __('Photo de l\'expert', 'geo-blocks-suite')
              }),
              createElement(
                'div',
                { className: 'geo-expert-identity' },
                attributes.expertUrl && !attributes.expertImage && createElement(
                  'a',
                  { href: attributes.expertUrl, className: 'geo-expert-link' },
                  attributes.expertName || __('Expert', 'geo-blocks-suite')
                ),
                (!attributes.expertUrl || attributes.expertImage) && createElement(
                  'span',
                  { className: 'geo-expert-name' },
                  attributes.expertName || __('Nom de l\'expert', 'geo-blocks-suite')
                ),
                attributes.credentials && createElement(
                  'span',
                  { className: 'geo-expert-credentials' },
                  attributes.credentials
                )
              )
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;

      var plainQuote = attributes.quote ? attributes.quote.replace(/<[^>]+>/g, '') : '';

      var personData = {
        "@type": "Person",
        "name": attributes.expertName || undefined
      };

      if (attributes.credentials) {
        personData.jobTitle = attributes.credentials;
      }
      if (attributes.expertUrl) {
        personData.url = attributes.expertUrl;
      }
      if (attributes.expertImage) {
        personData.image = attributes.expertImage;
      }

      var jsonLd = createElement('script', { type: 'application/ld+json' }, JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Quotation",
        "text": plainQuote || undefined,
        "spokenByCharacter": personData,
        "cite": attributes.expertUrl || undefined
      }, null, 2));

      var blockProps = useBlockProps.save({ className: 'geo-expert geo-expert-style-' + attributes.style });

      return createElement(
        'div',
        blockProps,
        createElement(
          'div',
          { className: 'geo-expert-box', 'data-geo-expert': 'true' },
          createElement(
            'div',
            { className: 'geo-expert-quote-row' },
            createElement('span', { className: 'geo-expert-quote-mark', 'aria-hidden': 'true' }, '“'),
            createElement(RichText.Content, { tagName: 'blockquote', className: 'geo-expert-quote', value: attributes.quote })
          ),
          createElement(
            'div',
            { className: 'geo-expert-author-row' },
            attributes.expertImage && createElement('img', {
              className: 'geo-expert-photo',
              src: attributes.expertImage,
              alt: attributes.expertName || ''
            }),
            createElement(
              'div',
              { className: 'geo-expert-identity' },
              attributes.expertUrl && !attributes.expertImage && createElement(
                'a',
                { href: attributes.expertUrl, className: 'geo-expert-link' },
                attributes.expertName
              ),
              (!attributes.expertUrl || attributes.expertImage) && createElement(
                'span',
                { className: 'geo-expert-name' },
                attributes.expertName
              ),
              attributes.credentials && createElement(
                'span',
                { className: 'geo-expert-credentials' },
                attributes.credentials
              )
            )
          )
        ),
        jsonLd
      );
    }
  });

})();
