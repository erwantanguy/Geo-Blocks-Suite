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
  var createElement = wp.element.createElement;

  registerBlockType('geo-blocks/blockquote-geo', {
    title: 'Blockquote GEO',
    icon: 'format-quote',
    category: 'text',
    attributes: {
      content: { type: 'string', source: 'html', selector: 'blockquote p' },
      citeUrl: { type: 'string', default: '' },
      author: { type: 'string', default: '' },
      sourceTitle: { type: 'string', default: '' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var content = attributes.content;
      var citeUrl = attributes.citeUrl;
      var author = attributes.author;
      var sourceTitle = attributes.sourceTitle;
      var blockProps = useBlockProps();

      return createElement(
        'div',
        null,
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Options du bloc de citation', 'geo-blocks-suite') },
            createElement(TextControl, {
              label: __('Lien source (URL)', 'geo-blocks-suite'),
              value: citeUrl,
              onChange: function(val){ setAttributes({ citeUrl: val }); }
            }),
            createElement(TextControl, {
              label: __('Auteur (facultatif)', 'geo-blocks-suite'),
              value: author,
              onChange: function(val){ setAttributes({ author: val }); }
            }),
            createElement(TextControl, {
              label: __('Titre ou media source (facultatif)', 'geo-blocks-suite'),
              value: sourceTitle,
              onChange: function(val){ setAttributes({ sourceTitle: val }); }
            })
          )
        ),
        createElement(
          'div',
          blockProps,
          createElement(
            'blockquote',
            { cite: citeUrl },
            createElement(RichText, {
              tagName: 'p',
              value: content,
              onChange: function(val){ setAttributes({ content: val }); },
              placeholder: __('Saisir la citation...', 'geo-blocks-suite')
            }),
            createElement('footer', null,
              author ? createElement('cite', null,
                author,
                sourceTitle ? createElement('span', null, ' - ', sourceTitle) : null
              ) : null
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var content = attributes.content;
      var citeUrl = attributes.citeUrl;
      var author = attributes.author;
      var sourceTitle = attributes.sourceTitle;
      var blockProps = useBlockProps.save();

      var schema = {
        "@context": "https://schema.org",
        "@type": "Quotation",
        text: content ? content.replace(/<[^>]+>/g, '') : '',
        creator: author ? { "@type": "Person", name: author } : undefined,
        citation: citeUrl || undefined,
        isPartOf: sourceTitle ? {
            "@type": "CreativeWork",
            "name": sourceTitle
        } : undefined
      };

      return createElement(
        'div',
        blockProps,
        createElement(
          'blockquote',
          { cite: citeUrl, "data-geo": "true" },
          createElement(RichText.Content, { tagName: 'p', value: content }),
          createElement(
            "footer",
            null,
            author && createElement("span", { className: "author" }, author, " "),
            sourceTitle && createElement("cite", null, " - ", sourceTitle)
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });

})();
