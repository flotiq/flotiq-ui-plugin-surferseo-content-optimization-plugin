import pluginInfo from '../../plugin-manifest.json';

export const validSourceFields = ['richtext'];

export const getValidFields = (contentTypes) => {
  const sourceFields = {};
  const sourceFieldsKeys = {};

  contentTypes
    ?.filter(({ internal }) => !internal)
    ?.map(({ name, label }) => ({ value: name, label }));

  (contentTypes || []).forEach(({ name, metaDefinition }) => {
    sourceFields[name] = [];
    sourceFieldsKeys[name] = [];

    Object.entries(metaDefinition?.propertiesConfig || {}).forEach(
      ([key, fieldConfig]) => {
        const inputType = fieldConfig?.inputType;

        if (validSourceFields?.includes(inputType)) {
          sourceFields[name].push({ value: key, label: fieldConfig.label });
          sourceFieldsKeys[name].push(key);
        }
      },
    );
  });

  return {
    sourceFields,
    sourceFieldsKeys,
  };
};

export const validFieldsCacheKey = `${pluginInfo.id}-form-valid-fields`;
