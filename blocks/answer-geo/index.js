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

  registerBlockType('geo-blocks/answer-geo', {
    title: 'Reponse directe GEO',
    icon: 'editor-ol',
    category: 'text',
    attributes: {
      question: { type: 'string', default: '' },
      answer: { type: 'string', default: '' },
      style: { type: 'string', default: 'default' },
      showIcon: { type: 'boolean', default: true }
    },

    edit: function(props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var question = attributes.question;
      var answer = attributes.answer;
      var style = attributes.style;
      var showIcon = attributes.showIcon;
      var blockProps = useBlockProps({ className: 'geo-answer geo-answer-style-' + style });

      var charCount = answer ? answer.replace(/<[^>]+>/g, '').length : 0;
      var charClass = charCount > 350 ? 'geo-answer-char-warning' : 'geo-answer-char-ok';

      return createElement(
        'div',
        null,
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Options reponse directe', 'geo-blocks-suite') },
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
            { title: __('Conseils AI Overviews', 'geo-blocks-suite'), initialOpen: false },
            createElement('p', null, __('Une bonne reponse directe :', 'geo-blocks-suite')),
            createElement('ul', null,
              createElement('li', null, __('Repond franchement a la question', 'geo-blocks-suite')),
              createElement('li', null, __('2-4 phrases maximum (moins de 350 caracteres)', 'geo-blocks-suite')),
              createElement('li', null, __('Inclut un chiffre ou un fait concret', 'geo-blocks-suite')),
              createElement('li', null, __('Formule la question comme un internaute', 'geo-blocks-suite'))
            )
          )
        ),
        createElement(
          'div',
          blockProps,
          createElement(
            'div',
            { className: 'geo-answer-box' },
            createElement(
              'div',
              { className: 'geo-answer-question-row' },
              showIcon && createElement('span', { className: 'geo-answer-icon', 'aria-hidden': 'true' }, '❓'),
              RichText && createElement(RichText, {
                tagName: 'h3',
                className: 'geo-answer-question',
                value: question,
                onChange: function(val) { setAttributes({ question: val }); },
                placeholder: __('Posez la question comme un internaute...', 'geo-blocks-suite'),
                allowedFormats: []
              })
            ),
            createElement(RichText, {
              tagName: 'p',
              className: 'geo-answer-text',
              value: answer,
              onChange: function(val) { setAttributes({ answer: val }); },
              placeholder: __('Ecrivez la reponse directe et factuelle...', 'geo-blocks-suite')
            }),
            createElement(
              'div',
              { className: 'geo-answer-footer ' + charClass },
              createElement('span', null, charCount + '/350 caracteres'),
              charCount > 350 && createElement('span', { className: 'geo-answer-warning' }, ' (trop long)')
            )
          )
        )
      );
    },

    save: function(props) {
      var attributes = props.attributes;
      var question = attributes.question;
      var answer = attributes.answer;
      var style = attributes.style;
      var showIcon = attributes.showIcon;

      var plainQuestion = question ? question.replace(/<[^>]+>/g, '') : '';
      var plainAnswer = answer ? answer.replace(/<[^>]+>/g, '') : '';

      var jsonLd = createElement('script', { type: 'application/ld+json' }, JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Question",
        "name": plainQuestion,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": plainAnswer
        }
      }, null, 2));

      var blockProps = useBlockProps.save({ className: 'geo-answer geo-answer-style-' + style });

      return createElement(
        'div',
        blockProps,
        createElement(
          'div',
          { className: 'geo-answer-box', 'data-geo-answer': 'true' },
          createElement(
            'div',
            { className: 'geo-answer-question-row' },
            showIcon && createElement('span', { className: 'geo-answer-icon', 'aria-hidden': 'true' }, '❓'),
            createElement(RichText.Content, { tagName: 'h3', className: 'geo-answer-question', value: question })
          ),
          createElement(RichText.Content, { tagName: 'p', className: 'geo-answer-text', value: answer })
        ),
        jsonLd
      );
    }
  });

})();
