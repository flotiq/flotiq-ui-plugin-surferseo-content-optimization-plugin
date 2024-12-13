import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  resources: {
    en: {
      translation: {
        AdditionalFields: 'Additional fields',
        AdditionalFieldsHelpText:
          'If your content is sourced from multiple fields, configure additional fields for analysis.',
        AllowedFaq:
          'list, that must contains two fields: question and answer, which are text or textarea',
        Content: 'Content field name',
        ContentHelpText:
          'Select the field that contains the main body of your content.',
        Title: 'Title field name',
        TitleHelpText: 'Select the field that contains the main heading (H1).',
        Lead: 'Lead field name',
        LeadHelpText:
          'Select the field that contains the lead paragraph or introductory text.',
        Faq: 'FAQ',
        FaqHelpText: 'Select the field that contains the FAQ section.',
        ContentType: 'Content Type',
        FieldRequired: 'Field is required',
        WrongFieldType: 'This field type is not supported',
        NonRequiredFieldsInCTD:
          'Make sure the selected content type contains fields that can be used in the plugin. ' +
          'Allowed types: {{types}}',
        ThirdPartyCookies:
          'You might need to enable third-party cookies in your browser for this integration to function properly',
      },
    },
    pl: {
      translation: {
        AdditionalFields: 'Dodatkowe pola',
        AdditionalFieldsHelpText:
          'Jeśli treść pochodzi z wielu pól, skonfiguruj dodatkowe pola do analizy',
        AllowedFaq:
          'lista, musi ona zawierać dwa pola: question i answer, które są tekstem lub długim polem tekstowym',
        Content: 'Pole źródła',
        ContentHelpText: 'Wybierz pole zawierające główną treść treści.',
        Title: 'Pole tytułu',
        TitleHelpText: 'Wybierz pole zawierające nagłówek główny (H1).',
        Lead: 'Pole wprowadzenia',
        LeadHelpText:
          'Wybierz pole zawierające akapit wiodący lub tekst wprowadzający',
        Faq: 'FAQ',
        FaqHelpText: 'Wybierz pole zawierające sekcję FAQ.',
        ContentType: 'Typ zawartości',
        FieldRequired: 'Pole jest wymagane',
        WrongFieldType: 'Ten typ pola nie jest wspierany',
        NonRequiredFieldsInCTD:
          'Upewnij się, że wybrany typ definicji zawiera pola, które mogą być wykorzystane we wtyczce. ' +
          'Dozwolone typy: {{types}}',
        ThirdPartyCookies:
          'Aby ta integracja działała poprawnie, konieczne może być włączenie w przeglądarce obsługi ' +
          'plików cookie innych firm',
      },
    },
  },
});

export default i18n;
