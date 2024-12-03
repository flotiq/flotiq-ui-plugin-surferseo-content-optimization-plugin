import i18n from '../i18n';
import pluginInfo from '../plugin-manifest.json';
import {
  validCardAdditionalFields,
  validCardTitleFields,
  validSourceFields,
} from '../common/valid-fields';

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
          kanbanBoard: {
            type: 'array',
            items: {
              type: 'object',
              required: ['content_type', 'source', 'title'],
              properties: {
                source: {
                  type: 'string',
                  minLength: 1,
                },
                content_type: {
                  type: 'string',
                  minLength: 1,
                },
                title: {
                  type: 'string',
                  minLength: 1,
                },
                image: {
                  type: 'string',
                  minLength: 1,
                },
                additional_fields: {
                  type: 'array',
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
    order: ['kanbanBoard'],
    propertiesConfig: {
      kanbanBoard: {
        items: {
          order: [
            'content_type',
            'source',
            'title',
            'image',
            'additional_fields',
          ],
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
            title: {
              label: i18n.t('Title'),
              unique: false,
              helpText: i18n.t('TitleHelpText', {
                types: validCardTitleFields.join(', '),
              }),
              inputType: 'select',
              options: [],
            },
            image: {
              label: i18n.t('Image'),
              unique: false,
              helpText: i18n.t('ImageHelpText', {
                types: ['Relation to media, media'],
              }),
              inputType: 'select',
              options: [],
            },
            additional_fields: {
              label: i18n.t('AdditionalFields'),
              unique: false,
              helpText: i18n.t('AdditionalFieldsHelpText', {
                types: validCardAdditionalFields.join(', '),
              }),
              isMultiple: true,
              useOptionsWithLabels: true,
              inputType: 'select',
              options: [],
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
  if (!errors.kanbanBoard) errors.kanbanBoard = [];
  if (!errors.kanbanBoard[index]) errors.kanbanBoard[index] = {};
  errors.kanbanBoard[index][field] = error;
};

export const getValidator = (
  sourceFieldKeys,
  cardTitleFieldsKeys,
  cardImageFieldsKeys,
  cardAdditionalFieldsKeys,
) => {
  return (values) => {
    const errors = {};
    values.kanbanBoard?.forEach((settings, index) => {
      const { content_type } = settings;

      const requiredFields = ['content_type', 'source', 'title'];

      requiredFields.forEach((requiredField) => {
        if (!settings[requiredField]) {
          addToErrors(errors, index, requiredField, i18n.t('FieldRequired'));
        }
      });

      const validTypes = [
        { key: 'source', validFieldsKeys: sourceFieldKeys[content_type] },
        { key: 'title', validFieldsKeys: cardTitleFieldsKeys[content_type] },
        { key: 'image', validFieldsKeys: cardImageFieldsKeys[content_type] },
        {
          key: 'additional_fields',
          validFieldsKeys: cardAdditionalFieldsKeys[content_type],
        },
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
