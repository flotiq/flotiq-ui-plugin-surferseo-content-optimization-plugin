import { getCachedElement } from '../../common/plugin-element-cache.js';
import { getValidFields, validFieldsCacheKey } from '../common/valid-fields';
import pluginInfo from '../../plugin-manifest.json';
import { addObjectToCache, removeRoot } from '../common/plugin-helpers.js';
import { getSchema, getValidator } from './settings-schema.js';

export const handleManagePlugin = ({ contentTypes, modalInstance }) => {
  const formSchemaCacheKey = `${pluginInfo.id}-form-schema`;
  let formSchema = getCachedElement(formSchemaCacheKey);

  if (!formSchema) {
    const validFields = getValidFields(contentTypes);
    addObjectToCache(validFieldsCacheKey, validFields);

    const ctds = contentTypes
      ?.filter(({ internal }) => !internal)
      ?.map(({ name, label }) => ({ value: name, label }));

    const { sourceFieldsKeys } = validFields;

    formSchema = {
      options: {
        disbaledBuildInValidation: true,
        onValidate: getValidator(sourceFieldsKeys),
      },
      schema: getSchema(ctds),
    };
  }

  modalInstance.promise.then(() => removeRoot(formSchemaCacheKey));

  return formSchema;
};
