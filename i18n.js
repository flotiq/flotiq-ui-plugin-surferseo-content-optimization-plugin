import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  resources: {
    en: {
      translation: {
        Source: 'Column field name',
        SourceHelpText:
          'Pick the field which will be used to organize cards in columns, each possible value -> new column. Allowed types: {{types}}',
        ContentType: 'Content Type',
        ContentTypeHelpText: '',
        Title: 'Title',
        TitleHelpText:
          'Pick the field which will be used to display title in card preview. Allowed types: {{types}}',
        Image: 'Image',
        ImageHelpText:
          'Pick the field which will be used to display image in card preview (optional). Allowed types: {{types}}',
        AdditionalFields: 'Additional Fields',
        AdditionalFieldsHelpText:
          'Pick the fields which will be used to display additional fields in card preview (optional). Allowed types: {{types}}',
        FieldRequired: 'Field is required',
        WrongFieldType: 'This field type is not supported',
        CardDelete: 'Content objects deleted (1)',
        FetchError:
          'Error occurred while connecting to the server, please try again later.',
        NonRequiredFieldsInCTD:
          'Make sure the selected content type contains fields that can be used in the plugin. Allowed types: {{types}}',
        StateUpdateError: 'Failed to update card status',
      },
    },
    pl: {
      translation: {
        Source: 'Pole kolumny',
        SourceHelpText:
          'Wybierz pole, które będzie użyte do organizowania kart w kolumnach, każda możliwa wartość -> nowa kolumna. Dozwolone typy: {{types}}',
        ContentType: 'Typ zawartości',
        ContentTypeHelpText: '',
        Title: 'Tytuł',
        TitleHelpText:
          'Wybierz pole, które będzie użyte do wyświetlania tytułu w podglądzie karty. Dozwolone typy: {{types}}',
        Image: 'Obraz',
        ImageHelpText:
          'Wybierz pole, które będzie użyte do wyświetlania obrazu w podglądzie karty (opcjonalne). Dozwolone typy: {{types}}',
        AdditionalFields: 'Dodatkowe Pole 1',
        AdditionalFieldsHelpText:
          'Wybierz pola, które będą użyte do wyświetlania dodatkowych pól w podglądzie karty (opcjonalne). Dozwolone typy: {{types}}',
        FieldRequired: 'Pole jest wymagane',
        WrongFieldType: 'Ten typ pola nie jest wspierany',
        CardDelete: 'Usunięto obiekty  (1)',
        FetchError:
          'Wystąpił błąd połączenia z serwerem, spróbuj ponownie później.',
        NonRequiredFieldsInCTD:
          'pewnij się, że wybrany typ definicji zawiera pola, które mogą być wykorzystane we wtyczce. Dozwolone typy: {{types}}',
        StateUpdateError: 'Nie udało się zaktualizować karty',
      },
    },
  },
});

export default i18n;
