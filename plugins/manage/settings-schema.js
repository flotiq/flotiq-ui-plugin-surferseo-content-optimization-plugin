import i18n from '../../i18n';
import pluginInfo from '../../plugin-manifest.json';
import { validSourceFields } from '../common/valid-fields';

export const getSchema = (contentTypes) => ({
  id: pluginInfo.id,
  name: pluginInfo.id,
  label: pluginInfo.name,
  internal: false,
  schemaDefinition: {
    type: 'object',
    allOf: [
      {
        $ref: '#/components/schemas/AbstractContentTypeSchemaDefinition',
      },
      {
        type: 'object',
        properties: {
          surferSeoAnalyzer: {
            type: 'array',
            items: {
              type: 'object',
              required: ['content_type', 'source'],
              properties: {
                source: {
                  type: 'string',
                  minLength: 1,
                },
                content_type: {
                  type: 'string',
                  minLength: 1,
                },
              },
            },
          },
        },
      },
    ],
    required: [],
    additionalProperties: false,
  },
  metaDefinition: {
    order: ['surferSeoAnalyzer'],
    propertiesConfig: {
      surferSeoAnalyzer: {
        items: {
          order: ['content_type', 'source'],
          propertiesConfig: {
            source: {
              label: i18n.t('Source'),
              unique: false,
              helpText: i18n.t('SourceHelpText', {
                types: validSourceFields.join(', '),
              }),
              inputType: 'select',
              options: [],
            },
            content_type: {
              label: i18n.t('ContentType'),
              unique: false,
              helpText: i18n.t('ContentTypeHelpText'),
              inputType: 'select',
              optionsWithLabels: contentTypes,
              useOptionsWithLabels: true,
            },
          },
        },
        label: i18n.t('Configure'),
        unique: false,
        helpText: '',
        inputType: 'object',
      },
    },
  },
});

const addToErrors = (errors, index, field, error) => {
  if (!errors.surferSeoAnalyzer) errors.surferSeoAnalyzer = [];
  if (!errors.surferSeoAnalyzer[index]) errors.surferSeoAnalyzer[index] = {};
  errors.surferSeoAnalyzer[index][field] = error;
};

export const getValidator = (sourceFieldKeys) => {
  return (values) => {
    const errors = {};
    values.surferSeoAnalyzer?.forEach((settings, index) => {
      const { content_type } = settings;

      const requiredFields = ['content_type', 'source'];

      requiredFields.forEach((requiredField) => {
        if (!settings[requiredField]) {
          addToErrors(errors, index, requiredField, i18n.t('FieldRequired'));
        }
      });

      const validTypes = [
        { key: 'source', validFieldsKeys: sourceFieldKeys[content_type] },
      ];

      validTypes.forEach(({ key, validFieldsKeys }) => {
        const value = settings[key];

        if (Array.isArray(value)) {
          if (
            value &&
            value?.length > 0 &&
            !value.every((element) => validFieldsKeys.includes(element || []))
          ) {
            addToErrors(errors, index, key, i18n.t('WrongFieldType'));
          }
          return;
        }

        if (value && !(validFieldsKeys || []).includes(value)) {
          addToErrors(errors, index, key, i18n.t('WrongFieldType'));
        }
      });
    });

    return errors;
  };
};
