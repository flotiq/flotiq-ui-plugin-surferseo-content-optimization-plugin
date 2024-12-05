import {
  validFieldsCacheKey,
  validSourceFields,
} from '../../../common/valid-fields.js';
import { getCachedElement } from '../../../common/plugin-element-cache.js';
import i18n from 'i18next';

const insertSelectOptions = (config, options = [], emptyOptionMessage) => {
  config.additionalHelpTextClasses = 'break-normal';

  if (options.length === 0) {
    config.options = [
      { value: 'empty', label: emptyOptionMessage, disabled: true },
    ];
    return;
  }
  config.options = options;
};

export const handlePluginFormConfig = ({ name, config, formik }) => {
  const { index, type } =
    name.match(/surferSeoAnalyzer\[(?<index>\d+)\].(?<type>\w+)/)?.groups || {};

  if (index == null || !type) return;
  const ctd = formik.values.surferSeoAnalyzer[index].content_type;
  const { sourceFields } = getCachedElement(validFieldsCacheKey);

  const keysToClearOnCtdChange = ['source'];

  switch (type) {
    case 'content_type':
      config.onChange = (_, value) => {
        if (value == null) formik.setFieldValue(name, '');
        else formik.setFieldValue(name, value);

        keysToClearOnCtdChange.forEach((key) => {
          formik.setFieldValue(`surferSeoAnalyzer[${index}].${key}`, '');
        });
      };
      break;
    case 'source':
      insertSelectOptions(
        config,
        sourceFields?.[ctd],
        i18n.t('NonRequiredFieldsInCTD', {
          types: validSourceFields.join(', '),
        }),
      );
      break;
    default:
      break;
  }
};
