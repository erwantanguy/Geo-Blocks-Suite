(function(){
  if ( typeof wp === 'undefined' || !wp.blocks ) { return; }

  var registerBlockType = wp.blocks.registerBlockType;
  var __ = wp.i18n.__;
  var createElement = wp.element.createElement;
  var Fragment = wp.element.Fragment;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var Button = wp.components.Button;

  registerBlockType('geo-blocks/faq-geo', {
    title: 'FAQ GEO',
    icon: 'editor-help',
    category: 'text',
    attributes: {
      questions: { type: 'array', default: [] }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var questions = attributes.questions || [];
      var blockProps = useBlockProps();

      function updateQuestion(index, field, value) {
        var copy = questions.slice();
        copy[index] = copy[index] || { question: '', answer: '' };
        copy[index][field] = value;
        setAttributes({ questions: copy });
      }

      function addQuestion() {
        var copy = questions.slice();
        copy.push({ question: 'Nouvelle question', answer: 'Reponse...' });
        setAttributes({ questions: copy });
      }

      function removeQuestion(index) {
        var copy = questions.slice();
        copy.splice(index, 1);
        setAttributes({ questions: copy });
      }

      return createElement(Fragment, null,
        createElement('div', blockProps,
          createElement('div', { className: 'faq-geo-editor' },
            createElement('div', { style: { marginBottom: '10px' } },
              createElement(Button, { isPrimary: true, onClick: addQuestion }, __('Ajouter une question', 'geo-blocks-suite'))
            ),
            questions.length === 0 && createElement('p', null, __('Aucune question pour le moment. Cliquez sur "Ajouter une question".', 'geo-blocks-suite')),
            questions.map(function(item, idx){
              return createElement('div', { key: idx, style: { border: '1px solid #eee', padding: '10px', marginBottom: '8px', borderRadius: '4px' } },
                createElement(RichText, {
                  tagName: 'h3',
                  value: item.question,
                  onChange: function(val){ updateQuestion(idx, 'question', val); },
                  placeholder: __('Saisir la question...', 'geo-blocks-suite')
                }),
                createElement(RichText, {
                  tagName: 'p',
                  value: item.answer,
                  onChange: function(val){ updateQuestion(idx, 'answer', val); },
                  placeholder: __('Saisir la reponse...', 'geo-blocks-suite')
                }),
                createElement('div', { style: { marginTop: '6px' } },
                  createElement(Button, { isSecondary: true, onClick: function(){ removeQuestion(idx); } }, __('Supprimer', 'geo-blocks-suite'))
                )
              );
            })
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var questions = attributes.questions || [];
      var blockProps = useBlockProps.save();

      var mainEntity = questions.map(function(q){
        return {
          "@type": "Question",
          "name": (q.question || '').replace(/<\/?[^>]+(>|$)/g, ""),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": (q.answer || '').replace(/<\/?[^>]+(>|$)/g, "")
          }
        };
      });

      var schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": mainEntity
      };

      var children = [];
      questions.forEach(function(q, idx){
        var qText = q.question || '';
        var aText = q.answer || '';
        var details = createElement('details', { key: idx },
          createElement('summary', null, createElement('span', { dangerouslySetInnerHTML: { __html: qText } })),
          createElement('div', null,
            createElement('p', { dangerouslySetInnerHTML: { __html: aText } })
          )
        );
        children.push(details);
      });

      return createElement('section', Object.assign({ className: 'faq-geo' }, blockProps),
        children.concat([createElement('script', { type: 'application/ld+json', key: 'schema' }, JSON.stringify(schema, null, 2))])
      );
    }
  });
})();
