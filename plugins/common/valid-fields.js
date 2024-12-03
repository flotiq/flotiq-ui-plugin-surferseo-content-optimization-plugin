import pluginInfo from '../plugin-manifest.json';

export const validSourceFields = ['select', 'radio'];

export const validCardTitleFields = ['text'];

export const validCardImageFields = ['datasource'];

export const validCardAdditionalFields = [
  'text',
  'number',
  'select',
  'dateTime',
  'checkbox',
  'radio',
  'richtext',
  'textarea',
];

export const getValidFields = (contentTypes) => {
  const sourceFields = {};
  const sourceFieldsKeys = {};

  const cardTitleFields = {};
  const cardTitleFieldsKeys = {};

  const cardImageFields = {};
  const cardImageFieldsKeys = {};

  const cardAdditionalFields = {};
  const cardAdditionalFieldsKeys = {};

  contentTypes
    ?.filter(({ internal }) => !internal)
    ?.map(({ name, label }) => ({ value: name, label }));

  (contentTypes || []).forEach(({ name, metaDefinition }) => {
    sourceFields[name] = [];
    sourceFieldsKeys[name] = [];

    cardTitleFields[name] = [];
    cardTitleFieldsKeys[name] = [];

    cardImageFields[name] = [];
    cardImageFieldsKeys[name] = [];

    cardAdditionalFields[name] = [];
    cardAdditionalFieldsKeys[name] = [];

    Object.entries(metaDefinition?.propertiesConfig || {}).forEach(
      ([key, fieldConfig]) => {
        const inputType = fieldConfig?.inputType;

        if (validSourceFields?.includes(inputType)) {
          sourceFields[name].push({ value: key, label: fieldConfig.label });
          sourceFieldsKeys[name].push(key);
        }

        if (validCardTitleFields?.includes(inputType)) {
          cardTitleFields[name].push({
            value: key,
            label: fieldConfig.label,
          });
          cardTitleFieldsKeys[name].push(key);
        }

        if (
          validCardImageFields?.includes(inputType) &&
          fieldConfig?.validation?.relationContenttype === '_media'
        ) {
          cardImageFields[name].push({
            value: key,
            label: fieldConfig.label,
          });
          cardImageFieldsKeys[name].push(key);
        }

        if (validCardAdditionalFields?.includes(inputType)) {
          cardAdditionalFields[name].push({
            value: key,
            label: fieldConfig.label,
          });
          cardAdditionalFieldsKeys[name].push(key);
        }
      },
    );
  });

  return {
    sourceFields,
    sourceFieldsKeys,
    cardTitleFields,
    cardTitleFieldsKeys,
    cardImageFields,
    cardImageFieldsKeys,
    cardAdditionalFields,
    cardAdditionalFieldsKeys,
  };
};

export const validFieldsCacheKey = `${pluginInfo.id}-form-valid-fields`;
