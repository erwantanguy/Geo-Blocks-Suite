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

  var RATING_OPTIONS = [
    { value: '', label: __('Sans note (Recommendation)', 'geo-blocks-suite') },
    { value: '1', label: '1 / 5' },
    { value: '2', label: '2 / 5' },
    { value: '3', label: '3 / 5' },
    { value: '4', label: '4 / 5' },
    { value: '5', label: '5 / 5' }
  ];

  var ITEM_TYPES = [
    { value: 'LocalBusiness', label: 'LocalBusiness' },
    { value: 'Organization', label: 'Organization' },
    { value: 'Product', label: 'Product' },
    { value: 'Service', label: 'Service' },
    { value: 'Place', label: 'Place' }
  ];

  registerBlockType('geo-blocks/testimonial-geo', {
    title: 'Temoignage GEO',
    icon: 'format-chat',
    category: 'text',
    attributes: {
      quote: { type: 'string', source: 'html', selector: '.geo-testimonial-quote' },
      author: { type: 'string', default: '' },
      role: { type: 'string', default: '' },
      company: { type: 'string', default: '' },
      rating: { type: 'string', default: '' },
      date: { type: 'string', default: '' },
      itemReviewedName: { type: 'string', default: '' },
      itemReviewedType: { type: 'string', default: 'LocalBusiness' },
      itemReviewedId: { type: 'string', default: '' }
    },

    edit: function(props) {
      var attrs = props.attributes;
      var set = props.setAttributes;
      var blockProps = useBlockProps({ className: 'geo-testimonial' });

      return createElement('div', null,
        createElement(InspectorControls, null,
          createElement(PanelBody, { title: __('Auteur du temoignage', 'geo-blocks-suite') },
            createElement(TextControl, {
              label: __('Nom', 'geo-blocks-suite'),
              value: attrs.author,
              onChange: function(v){ set({ author: v }); }
            }),
            createElement(TextControl, {
              label: __('Role / contexte', 'geo-blocks-suite'),
              value: attrs.role,
              onChange: function(v){ set({ role: v }); },
              placeholder: __('Client, Pilote amateur...', 'geo-blocks-suite')
            }),
            createElement(TextControl, {
              label: __('Entreprise', 'geo-blocks-suite'),
              value: attrs.company,
              onChange: function(v){ set({ company: v }); }
            })
          ),
          createElement(PanelBody, { title: __('Note et date', 'geo-blocks-suite'), initialOpen: false },
            createElement(SelectControl, {
              label: __('Note', 'geo-blocks-suite'),
              value: attrs.rating,
              options: RATING_OPTIONS,
              onChange: function(v){ set({ rating: v }); }
            }),
            createElement(TextControl, {
              label: __('Date de publication', 'geo-blocks-suite'),
              value: attrs.date,
              onChange: function(v){ set({ date: v }); },
              placeholder: 'AAAA-MM-JJ'
            })
          ),
          createElement(PanelBody, { title: __('Entite evaluee (itemReviewed)', 'geo-blocks-suite'), initialOpen: false },
            createElement(SelectControl, {
              label: __('Type', 'geo-blocks-suite'),
              value: attrs.itemReviewedType,
              options: ITEM_TYPES,
              onChange: function(v){ set({ itemReviewedType: v }); }
            }),
            createElement(TextControl, {
              label: __('Nom', 'geo-blocks-suite'),
              value: attrs.itemReviewedName,
              onChange: function(v){ set({ itemReviewedName: v }); }
            }),
            createElement(TextControl, {
              label: __('@id Schema.org (facultatif)', 'geo-blocks-suite'),
              value: attrs.itemReviewedId,
              onChange: function(v){ set({ itemReviewedId: v }); },
              placeholder: 'https://...'
            })
          )
        ),
        createElement('div', blockProps,
          createElement('div', { className: 'geo-testimonial-card' },
            createElement(RichText, {
              tagName: 'blockquote',
              className: 'geo-testimonial-quote',
              value: attrs.quote,
              onChange: function(v){ set({ quote: v }); },
              placeholder: __('Saisir le temoignage...', 'geo-blocks-suite')
            }),
            createElement('div', { className: 'geo-testimonial-meta' },
              createElement(TextControl, {
                label: __('Nom', 'geo-blocks-suite'),
                value: attrs.author,
                onChange: function(v){ set({ author: v }); },
                placeholder: __('Nom du temoin', 'geo-blocks-suite')
              }),
              createElement(TextControl, {
                label: __('Role', 'geo-blocks-suite'),
                value: attrs.role,
                onChange: function(v){ set({ role: v }); },
                placeholder: __('Role', 'geo-blocks-suite')
              })
            )
          )
        )
      );
    },

    save: function(props) {
      var attrs = props.attributes;
      var blockProps = useBlockProps.save({ className: 'geo-testimonial' });
      var quoteText = attrs.quote ? attrs.quote.replace(/<[^>]+>/g, '') : '';

      var schemaType = attrs.rating ? 'Review' : 'Recommendation';
      var schema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        reviewBody: quoteText,
        author: attrs.author ? {
          '@type': 'Person',
          name: attrs.author
        } : undefined
      };

      if (attrs.rating) {
        schema.reviewRating = {
          '@type': 'Rating',
          ratingValue: attrs.rating,
          bestRating: '5'
        };
      }

      if (attrs.date) {
        schema.datePublished = attrs.date;
      }

      if (attrs.itemReviewedName || attrs.itemReviewedId) {
        schema.itemReviewed = {
          '@type': attrs.itemReviewedType || 'LocalBusiness'
        };
        if (attrs.itemReviewedName) {
          schema.itemReviewed.name = attrs.itemReviewedName;
        }
        if (attrs.itemReviewedId) {
          schema.itemReviewed['@id'] = attrs.itemReviewedId;
        }
      }

      return createElement('div', blockProps,
        createElement('figure', { className: 'geo-testimonial-card', 'data-geo-testimonial': 'true' },
          createElement(RichText.Content, { tagName: 'blockquote', className: 'geo-testimonial-quote', value: attrs.quote }),
          createElement('figcaption', { className: 'geo-testimonial-author' },
            attrs.author && createElement('span', { className: 'geo-testimonial-name' }, attrs.author),
            attrs.role && createElement('span', { className: 'geo-testimonial-role' }, ', ', attrs.role),
            attrs.company && createElement('span', { className: 'geo-testimonial-company' }, ' - ', attrs.company),
            attrs.rating && createElement('span', { className: 'geo-testimonial-rating' }, ' ', '★'.repeat(parseInt(attrs.rating, 10)))
          )
        ),
        createElement('script', { type: 'application/ld+json' }, JSON.stringify(schema, null, 2))
      );
    }
  });
})();
