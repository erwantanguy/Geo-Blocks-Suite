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
  var Button = wp.components.Button;
  var createElement = wp.element.createElement;

  var LAYOUTS = [
    { value: 'side-by-side', label: 'Cote a cote' },
    { value: 'stacked', label: 'Empile' }
  ];

  registerBlockType('geo-blocks/proscons-geo', {
    title: 'Pros/Cons GEO',
    icon: 'columns',
    category: 'text',
    attributes: {
      title: { type: 'string', default: '' },
      pros: { type: 'array', default: [] },
      cons: { type: 'array', default: [] },
      prosLabel: { type: 'string', default: 'Avantages' },
      consLabel: { type: 'string', default: 'Inconvenients' },
      layout: { type: 'string', default: 'side-by-side' }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var pros = attributes.pros || [];
      var cons = attributes.cons || [];
      var blockProps = useBlockProps({ className: 'geo-proscons geo-proscons-layout-' + attributes.layout });

      function addItem(type) {
        if (type === 'pros') {
          setAttributes({ pros: pros.concat(['']) });
        } else {
          setAttributes({ cons: cons.concat(['']) });
        }
      }

      function updateItem(type, index, value) {
        if (type === 'pros') {
          var newPros = pros.map(function(item, i) { return i === index ? value : item; });
          setAttributes({ pros: newPros });
        } else {
          var newCons = cons.map(function(item, i) { return i === index ? value : item; });
          setAttributes({ cons: newCons });
        }
      }

      function removeItem(type, index) {
        if (type === 'pros') {
          setAttributes({ pros: pros.filter(function(_, i) { return i !== index; }) });
        } else {
          setAttributes({ cons: cons.filter(function(_, i) { return i !== index; }) });
        }
      }

      return createElement('div', null,
        createElement(InspectorControls, null,
          createElement(PanelBody, { title: __('Options Pros/Cons', 'geo-blocks-suite') },
            createElement(SelectControl, {
              label: __('Disposition', 'geo-blocks-suite'),
              value: attributes.layout,
              options: LAYOUTS,
              onChange: function(val) { setAttributes({ layout: val }); }
            }),
            createElement(TextControl, {
              label: __('Label Avantages', 'geo-blocks-suite'),
              value: attributes.prosLabel,
              onChange: function(val) { setAttributes({ prosLabel: val }); }
            }),
            createElement(TextControl, {
              label: __('Label Inconvenients', 'geo-blocks-suite'),
              value: attributes.consLabel,
              onChange: function(val) { setAttributes({ consLabel: val }); }
            })
          )
        ),
        createElement('div', blockProps,
          attributes.title !== undefined && createElement(RichText, {
            tagName: 'h4',
            className: 'geo-proscons-title',
            value: attributes.title,
            onChange: function(val) { setAttributes({ title: val }); },
            placeholder: __('Titre (facultatif)', 'geo-blocks-suite')
          }),
          createElement('div', { className: 'geo-proscons-columns' },
            createElement('div', { className: 'geo-proscons-column geo-proscons-pros' },
              createElement('div', { className: 'geo-proscons-header' },
                createElement('span', { className: 'geo-proscons-icon' }, '✅'),
                createElement('span', { className: 'geo-proscons-label' }, attributes.prosLabel)
              ),
              createElement('ul', { className: 'geo-proscons-list' },
                pros.map(function(item, index) {
                  return createElement('li', { key: index, className: 'geo-proscons-item' },
                    createElement(RichText, {
                      tagName: 'span',
                      value: item,
                      onChange: function(val) { updateItem('pros', index, val); },
                      placeholder: __('Avantage...', 'geo-blocks-suite')
                    }),
                    createElement(Button, {
                      icon: 'no-alt',
                      label: __('Supprimer', 'geo-blocks-suite'),
                      onClick: function() { removeItem('pros', index); },
                      className: 'geo-proscons-remove'
                    })
                  );
                })
              ),
              createElement(Button, {
                variant: 'secondary',
                onClick: function() { addItem('pros'); },
                className: 'geo-proscons-add'
              }, '+ ', __('Ajouter', 'geo-blocks-suite'))
            ),
            createElement('div', { className: 'geo-proscons-column geo-proscons-cons' },
              createElement('div', { className: 'geo-proscons-header' },
                createElement('span', { className: 'geo-proscons-icon' }, '❌'),
                createElement('span', { className: 'geo-proscons-label' }, attributes.consLabel)
              ),
              createElement('ul', { className: 'geo-proscons-list' },
                cons.map(function(item, index) {
                  return createElement('li', { key: index, className: 'geo-proscons-item' },
                    createElement(RichText, {
                      tagName: 'span',
                      value: item,
                      onChange: function(val) { updateItem('cons', index, val); },
                      placeholder: __('Inconvenient...', 'geo-blocks-suite')
                    }),
                    createElement(Button, {
                      icon: 'no-alt',
                      label: __('Supprimer', 'geo-blocks-suite'),
                      onClick: function() { removeItem('cons', index); },
                      className: 'geo-proscons-remove'
                    })
                  );
                })
              ),
              createElement(Button, {
                variant: 'secondary',
                onClick: function() { addItem('cons'); },
                className: 'geo-proscons-add'
              }, '+ ', __('Ajouter', 'geo-blocks-suite'))
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var pros = attributes.pros || [];
      var cons = attributes.cons || [];
      var blockProps = useBlockProps.save({ className: 'geo-proscons geo-proscons-layout-' + attributes.layout });

      var schema = {
        "@context": "https://schema.org",
        "@type": "Review",
        "name": attributes.title ? attributes.title.replace(/<[^>]+>/g, '') : 'Avantages et Inconvenients',
        "positiveNotes": {
          "@type": "ItemList",
          "itemListElement": pros.map(function(item, index) {
            return {
              "@type": "ListItem",
              "position": index + 1,
              "name": item ? item.replace(/<[^>]+>/g, '') : ''
            };
          })
        },
        "negativeNotes": {
          "@type": "ItemList",
          "itemListElement": cons.map(function(item, index) {
            return {
              "@type": "ListItem",
              "position": index + 1,
              "name": item ? item.replace(/<[^>]+>/g, '') : ''
            };
          })
        }
      };

      return createElement('div', blockProps,
        createElement('div', { className: 'geo-proscons-box', 'data-geo-proscons': 'true' },
          attributes.title && createElement(RichText.Content, { tagName: 'h4', className: 'geo-proscons-title', value: attributes.title }),
          createElement('div', { className: 'geo-proscons-columns' },
            createElement('div', { className: 'geo-proscons-column geo-proscons-pros' },
              createElement('div', { className: 'geo-proscons-header' },
                createElement('span', { className: 'geo-proscons-icon', 'aria-hidden': 'true' }, '✅'),
                createElement('span', { className: 'geo-proscons-label' }, attributes.prosLabel)
              ),
              createElement('ul', { className: 'geo-proscons-list' },
                pros.map(function(item, index) {
                  return item && createElement('li', { key: index },
                    createElement(RichText.Content, { tagName: 'span', value: item })
                  );
                })
              )
            ),
            createElement('div', { className: 'geo-proscons-column geo-proscons-cons' },
              createElement('div', { className: 'geo-proscons-header' },
                createElement('span', { className: 'geo-proscons-icon', 'aria-hidden': 'true' }, '❌'),
                createElement('span', { className: 'geo-proscons-label' }, attributes.consLabel)
              ),
              createElement('ul', { className: 'geo-proscons-list' },
                cons.map(function(item, index) {
                  return item && createElement('li', { key: index },
                    createElement(RichText.Content, { tagName: 'span', value: item })
                  );
                })
              )
            )
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });
})();
