(function(){
  if (typeof wp === 'undefined' || !wp.blocks) return;

  var registerBlockType = wp.blocks.registerBlockType;
  var __ = wp.i18n.__;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var RichText = wp.blockEditor.RichText;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var TextareaControl = wp.components.TextareaControl;
  var SelectControl = wp.components.SelectControl;
  var ToggleControl = wp.components.ToggleControl;
  var Button = wp.components.Button;
  var createElement = wp.element.createElement;

  var DIFFICULTIES = [
    { value: 'facile', label: 'Facile' },
    { value: 'moyen', label: 'Moyen' },
    { value: 'difficile', label: 'Difficile' }
  ];

  registerBlockType('geo-blocks/howto-geo', {
    title: 'How-To GEO',
    icon: 'list-view',
    category: 'text',
    attributes: {
      title: { type: 'string', default: '' },
      description: { type: 'string', default: '' },
      totalTime: { type: 'string', default: '' },
      difficulty: { type: 'string', default: 'facile' },
      steps: { type: 'array', default: [] },
      showNumbers: { type: 'boolean', default: true }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var steps = attributes.steps || [];
      var blockProps = useBlockProps({ className: 'geo-howto' });

      function addStep() {
        var newSteps = steps.concat([{ title: '', text: '' }]);
        setAttributes({ steps: newSteps });
      }

      function updateStep(index, field, value) {
        var newSteps = steps.map(function(step, i) {
          if (i === index) {
            var updated = Object.assign({}, step);
            updated[field] = value;
            return updated;
          }
          return step;
        });
        setAttributes({ steps: newSteps });
      }

      function removeStep(index) {
        var newSteps = steps.filter(function(_, i) { return i !== index; });
        setAttributes({ steps: newSteps });
      }

      function moveStep(index, direction) {
        var newIndex = index + direction;
        if (newIndex < 0 || newIndex >= steps.length) return;
        var newSteps = steps.slice();
        var temp = newSteps[index];
        newSteps[index] = newSteps[newIndex];
        newSteps[newIndex] = temp;
        setAttributes({ steps: newSteps });
      }

      return createElement('div', null,
        createElement(InspectorControls, null,
          createElement(PanelBody, { title: __('Options How-To', 'geo-blocks-suite') },
            createElement(TextControl, {
              label: __('Duree totale (ex: 30 minutes)', 'geo-blocks-suite'),
              value: attributes.totalTime,
              onChange: function(val) { setAttributes({ totalTime: val }); }
            }),
            createElement(SelectControl, {
              label: __('Difficulte', 'geo-blocks-suite'),
              value: attributes.difficulty,
              options: DIFFICULTIES,
              onChange: function(val) { setAttributes({ difficulty: val }); }
            }),
            createElement(ToggleControl, {
              label: __('Afficher les numeros', 'geo-blocks-suite'),
              checked: attributes.showNumbers,
              onChange: function(val) { setAttributes({ showNumbers: val }); }
            })
          )
        ),
        createElement('div', blockProps,
          createElement('div', { className: 'geo-howto-header' },
            createElement(RichText, {
              tagName: 'h3',
              className: 'geo-howto-title',
              value: attributes.title,
              onChange: function(val) { setAttributes({ title: val }); },
              placeholder: __('Comment faire...', 'geo-blocks-suite')
            }),
            createElement(RichText, {
              tagName: 'p',
              className: 'geo-howto-description',
              value: attributes.description,
              onChange: function(val) { setAttributes({ description: val }); },
              placeholder: __('Description du tutoriel...', 'geo-blocks-suite')
            }),
            (attributes.totalTime || attributes.difficulty) && createElement('div', { className: 'geo-howto-meta' },
              attributes.totalTime && createElement('span', { className: 'geo-howto-time' }, '⏱ ', attributes.totalTime),
              createElement('span', { className: 'geo-howto-difficulty geo-howto-difficulty-' + attributes.difficulty },
                attributes.difficulty === 'facile' ? '🟢' : attributes.difficulty === 'moyen' ? '🟡' : '🔴',
                ' ', attributes.difficulty.charAt(0).toUpperCase() + attributes.difficulty.slice(1)
              )
            )
          ),
          createElement('ol', { className: 'geo-howto-steps' },
            steps.map(function(step, index) {
              return createElement('li', { key: index, className: 'geo-howto-step' },
                createElement('div', { className: 'geo-howto-step-header' },
                  attributes.showNumbers && createElement('span', { className: 'geo-howto-step-number' }, index + 1),
                  createElement('div', { className: 'geo-howto-step-actions' },
                    createElement(Button, {
                      icon: 'arrow-up-alt2',
                      label: __('Monter', 'geo-blocks-suite'),
                      onClick: function() { moveStep(index, -1); },
                      disabled: index === 0
                    }),
                    createElement(Button, {
                      icon: 'arrow-down-alt2',
                      label: __('Descendre', 'geo-blocks-suite'),
                      onClick: function() { moveStep(index, 1); },
                      disabled: index === steps.length - 1
                    }),
                    createElement(Button, {
                      icon: 'trash',
                      label: __('Supprimer', 'geo-blocks-suite'),
                      onClick: function() { removeStep(index); },
                      isDestructive: true
                    })
                  )
                ),
                createElement(RichText, {
                  tagName: 'strong',
                  className: 'geo-howto-step-title',
                  value: step.title,
                  onChange: function(val) { updateStep(index, 'title', val); },
                  placeholder: __('Titre de l\'etape...', 'geo-blocks-suite')
                }),
                createElement(RichText, {
                  tagName: 'p',
                  className: 'geo-howto-step-text',
                  value: step.text,
                  onChange: function(val) { updateStep(index, 'text', val); },
                  placeholder: __('Instructions detaillees...', 'geo-blocks-suite')
                })
              );
            })
          ),
          createElement(Button, {
            className: 'geo-howto-add-step',
            variant: 'secondary',
            onClick: addStep
          }, '+ ', __('Ajouter une etape', 'geo-blocks-suite'))
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var steps = attributes.steps || [];
      var blockProps = useBlockProps.save({ className: 'geo-howto' });

      var schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": attributes.title ? attributes.title.replace(/<[^>]+>/g, '') : '',
        "description": attributes.description ? attributes.description.replace(/<[^>]+>/g, '') : '',
        "step": steps.map(function(step, index) {
          return {
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title ? step.title.replace(/<[^>]+>/g, '') : '',
            "text": step.text ? step.text.replace(/<[^>]+>/g, '') : ''
          };
        })
      };

      if (attributes.totalTime) {
        schema.totalTime = attributes.totalTime;
      }

      return createElement('div', blockProps,
        createElement('div', { className: 'geo-howto-box', 'data-geo-howto': 'true' },
          createElement('div', { className: 'geo-howto-header' },
            attributes.title && createElement(RichText.Content, { tagName: 'h3', className: 'geo-howto-title', value: attributes.title }),
            attributes.description && createElement(RichText.Content, { tagName: 'p', className: 'geo-howto-description', value: attributes.description }),
            (attributes.totalTime || attributes.difficulty) && createElement('div', { className: 'geo-howto-meta' },
              attributes.totalTime && createElement('span', { className: 'geo-howto-time' }, '⏱ ', attributes.totalTime),
              createElement('span', { className: 'geo-howto-difficulty geo-howto-difficulty-' + attributes.difficulty },
                attributes.difficulty === 'facile' ? '🟢' : attributes.difficulty === 'moyen' ? '🟡' : '🔴',
                ' ', attributes.difficulty.charAt(0).toUpperCase() + attributes.difficulty.slice(1)
              )
            )
          ),
          createElement('ol', { className: 'geo-howto-steps' },
            steps.map(function(step, index) {
              return createElement('li', { key: index, className: 'geo-howto-step' },
                attributes.showNumbers && createElement('span', { className: 'geo-howto-step-number' }, index + 1),
                createElement('div', { className: 'geo-howto-step-content' },
                  step.title && createElement(RichText.Content, { tagName: 'strong', className: 'geo-howto-step-title', value: step.title }),
                  step.text && createElement(RichText.Content, { tagName: 'p', className: 'geo-howto-step-text', value: step.text })
                )
              );
            })
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });
})();
