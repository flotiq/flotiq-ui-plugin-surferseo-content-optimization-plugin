import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  resources: {
    en: {
      translation: {
        Source: 'Column field name',
        SourceHelpText:
          'select the field from which the analysis is to be performed',
        ContentType: 'Content Type',
        ContentTypeHelpText: '',
        FieldRequired: 'Field is required',
        WrongFieldType: 'This field type is not supported',
        NonRequiredFieldsInCTD:
          'Make sure the selected content type contains fields that can be used in the plugin. Allowed types: {{types}}',
      },
    },
    pl: {
      translation: {
        Source: 'Pole kolumny',
        SourceHelpText: 'Wybierz pole z którego ma być przeprowadzona analiza',
        ContentType: 'Typ zawartości',
        ContentTypeHelpText: '',
        FieldRequired: 'Pole jest wymagane',
        WrongFieldType: 'Ten typ pola nie jest wspierany',
        NonRequiredFieldsInCTD:
          'Upewnij się, że wybrany typ definicji zawiera pola, które mogą być wykorzystane we wtyczce. Dozwolone typy: {{types}}',
      },
    },
  },
});

export default i18n;
