(function(){
  if (typeof wp === 'undefined' || !wp.blocks) return;

  var registerBlockType = wp.blocks.registerBlockType;
  var __ = wp.i18n.__;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var SelectControl = wp.components.SelectControl;
  var Button = wp.components.Button;
  var createElement = wp.element.createElement;

  var STYLES = [
    { value: 'default', label: 'Classique' },
    { value: 'card', label: 'Carte' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'horizontal', label: 'Horizontal' }
  ];

  registerBlockType('geo-blocks/author-geo', {
    title: 'Author Box GEO',
    icon: 'admin-users',
    category: 'text',
    attributes: {
      name: { type: 'string', default: '' },
      jobTitle: { type: 'string', default: '' },
      bio: { type: 'string', default: '' },
      imageUrl: { type: 'string', default: '' },
      imageId: { type: 'number', default: 0 },
      website: { type: 'string', default: '' },
      linkedin: { type: 'string', default: '' },
      twitter: { type: 'string', default: '' },
      email: { type: 'string', default: '' },
      style: { type: 'string', default: 'default' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps({ className: 'geo-author geo-author-style-' + attributes.style });

      function onSelectImage(media) {
        setAttributes({
          imageId: media.id,
          imageUrl: media.url
        });
      }

      return createElement('div', null,
        createElement(InspectorControls, null,
          createElement(PanelBody, { title: __('Options Author Box', 'geo-blocks-suite') },
            createElement(SelectControl, {
              label: __('Style', 'geo-blocks-suite'),
              value: attributes.style,
              options: STYLES,
              onChange: function(val) { setAttributes({ style: val }); }
            })
          ),
          createElement(PanelBody, { title: __('Liens sociaux', 'geo-blocks-suite'), initialOpen: false },
            createElement(TextControl, {
              label: __('Site web', 'geo-blocks-suite'),
              value: attributes.website,
              onChange: function(val) { setAttributes({ website: val }); },
              placeholder: 'https://...'
            }),
            createElement(TextControl, {
              label: __('LinkedIn', 'geo-blocks-suite'),
              value: attributes.linkedin,
              onChange: function(val) { setAttributes({ linkedin: val }); },
              placeholder: 'https://linkedin.com/in/...'
            }),
            createElement(TextControl, {
              label: __('Twitter/X', 'geo-blocks-suite'),
              value: attributes.twitter,
              onChange: function(val) { setAttributes({ twitter: val }); },
              placeholder: 'https://twitter.com/...'
            }),
            createElement(TextControl, {
              label: __('Email', 'geo-blocks-suite'),
              value: attributes.email,
              onChange: function(val) { setAttributes({ email: val }); },
              placeholder: 'email@example.com'
            })
          )
        ),
        createElement('div', blockProps,
          createElement('div', { className: 'geo-author-box' },
            createElement('div', { className: 'geo-author-avatar' },
              createElement(MediaUpload, {
                onSelect: onSelectImage,
                allowedTypes: ['image'],
                value: attributes.imageId,
                render: function(obj) {
                  return createElement('div', {
                    className: 'geo-author-avatar-wrapper',
                    onClick: obj.open
                  },
                    attributes.imageUrl
                      ? createElement('img', { src: attributes.imageUrl, alt: attributes.name })
                      : createElement('div', { className: 'geo-author-avatar-placeholder' }, '👤')
                  );
                }
              })
            ),
            createElement('div', { className: 'geo-author-info' },
              createElement('div', { className: 'geo-author-label' }, __('A propos de l\'auteur', 'geo-blocks-suite')),
              createElement(RichText, {
                tagName: 'h4',
                className: 'geo-author-name',
                value: attributes.name,
                onChange: function(val) { setAttributes({ name: val }); },
                placeholder: __('Nom de l\'auteur', 'geo-blocks-suite')
              }),
              createElement(RichText, {
                tagName: 'p',
                className: 'geo-author-job',
                value: attributes.jobTitle,
                onChange: function(val) { setAttributes({ jobTitle: val }); },
                placeholder: __('Titre / Fonction', 'geo-blocks-suite')
              }),
              createElement(RichText, {
                tagName: 'p',
                className: 'geo-author-bio',
                value: attributes.bio,
                onChange: function(val) { setAttributes({ bio: val }); },
                placeholder: __('Biographie courte...', 'geo-blocks-suite')
              }),
              (attributes.website || attributes.linkedin || attributes.twitter) && createElement('div', { className: 'geo-author-links' },
                attributes.website && createElement('span', null, '🌐'),
                attributes.linkedin && createElement('span', null, '💼'),
                attributes.twitter && createElement('span', null, '🐦')
              )
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var blockProps = useBlockProps.save({ className: 'geo-author geo-author-style-' + attributes.style });

      var sameAs = [];
      if (attributes.website) sameAs.push(attributes.website);
      if (attributes.linkedin) sameAs.push(attributes.linkedin);
      if (attributes.twitter) sameAs.push(attributes.twitter);

      var schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": attributes.name ? attributes.name.replace(/<[^>]+>/g, '') : '',
        "jobTitle": attributes.jobTitle ? attributes.jobTitle.replace(/<[^>]+>/g, '') : '',
        "description": attributes.bio ? attributes.bio.replace(/<[^>]+>/g, '') : ''
      };

      if (attributes.imageUrl) schema.image = attributes.imageUrl;
      if (attributes.email) schema.email = 'mailto:' + attributes.email;
      if (attributes.website) schema.url = attributes.website;
      if (sameAs.length > 0) schema.sameAs = sameAs;

      return createElement('div', blockProps,
        createElement('aside', { className: 'geo-author-box', 'data-geo-author': 'true', itemScope: true, itemType: 'https://schema.org/Person' },
          attributes.imageUrl && createElement('div', { className: 'geo-author-avatar' },
            createElement('img', { src: attributes.imageUrl, alt: attributes.name ? attributes.name.replace(/<[^>]+>/g, '') : '', itemProp: 'image' })
          ),
          createElement('div', { className: 'geo-author-info' },
            createElement('div', { className: 'geo-author-label' }, 'A propos de l\'auteur'),
            attributes.name && createElement(RichText.Content, { tagName: 'h4', className: 'geo-author-name', value: attributes.name, itemProp: 'name' }),
            attributes.jobTitle && createElement(RichText.Content, { tagName: 'p', className: 'geo-author-job', value: attributes.jobTitle, itemProp: 'jobTitle' }),
            attributes.bio && createElement(RichText.Content, { tagName: 'p', className: 'geo-author-bio', value: attributes.bio, itemProp: 'description' }),
            (attributes.website || attributes.linkedin || attributes.twitter || attributes.email) && createElement('div', { className: 'geo-author-links' },
              attributes.website && createElement('a', { href: attributes.website, target: '_blank', rel: 'noopener noreferrer', itemProp: 'url', title: 'Site web' }, '🌐'),
              attributes.linkedin && createElement('a', { href: attributes.linkedin, target: '_blank', rel: 'noopener noreferrer', itemProp: 'sameAs', title: 'LinkedIn' }, '💼'),
              attributes.twitter && createElement('a', { href: attributes.twitter, target: '_blank', rel: 'noopener noreferrer', itemProp: 'sameAs', title: 'Twitter' }, '🐦'),
              attributes.email && createElement('a', { href: 'mailto:' + attributes.email, itemProp: 'email', title: 'Email' }, '✉️')
            )
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });
})();
