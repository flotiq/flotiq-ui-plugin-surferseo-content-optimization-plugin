import pluginInfo from '../../plugin-manifest.json';
import {
  validFieldsCacheKey,
  validLeadFields,
  validSourceFields,
  validTitleFields,
} from '../../common/valid-fields.js';
import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';
import i18n from 'i18next';

const insertSelectOptions = (config, options = [], emptyOptionMessage) => {
  config.additionalHelpTextClasses = 'break-normal';

  if (options.length === 0) {
    config.emptyOptions = emptyOptionMessage;
    config.additionalDropdownClasses = 'flotiq-ui-plugin-manage-empty-options';
    return;
  }
  config.options = options;
};

const getAdditionalFieldsElement = (name) => {
  const elementCacheKey = `${pluginInfo.id}-${name}-additional-fields`;
  let element = getCachedElement(elementCacheKey)?.element;

  if (!element) {
    element = document.createElement('div');
    element.className = 'flotiq-ui-plugin-manage-additional-fields';

    element.innerHTML = /*html*/ `
    <h3 class="flotiq-ui-plugin-manage-additional-fields__heading"></h3>
    <p class="flotiq-ui-plugin-manage-additional-fields__description"></p>
    `;

    addElementToCache(element, elementCacheKey);
  }

  const heading = element.querySelector(
    '.flotiq-ui-plugin-manage-additional-fields__heading',
  );
  heading.textContent = i18n.t('AdditionalFields');

  const description = element.querySelector(
    '.flotiq-ui-plugin-manage-additional-fields__description',
  );
  description.textContent = i18n.t('AdditionalFieldsHelpText');

  return element;
};

export const handlePluginFormConfig = ({
  contentType,
  name,
  config,
  formik,
}) => {
  if (contentType?.id !== pluginInfo.id && !contentType?.nonCtdSchema) {
    return;
  }

  const { index, type } =
    name.match(/surferSeoAnalyzer\[(?<index>\d+)\].(?<type>\w+)/)?.groups || {};

  if (index == null || !type) return;
  const ctd = formik.values.surferSeoAnalyzer[index].content_type;

  const { titleFields, leadFields, sourceFields, faqFields } =
    getCachedElement(validFieldsCacheKey) || {};

  const keysToClearOnCtdChange = ['title', 'lead', 'source', 'faq'];

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
    case 'title':
      insertSelectOptions(
        config,
        titleFields?.[ctd],
        i18n.t('NonRequiredFieldsInCTD', {
          types: validTitleFields.join(', '),
        }),
      );
      break;
    case 'lead':
      insertSelectOptions(
        config,
        leadFields?.[ctd],
        i18n.t('NonRequiredFieldsInCTD', {
          types: validLeadFields.join(', '),
        }),
      );
      break;
    case 'source':
      insertSelectOptions(
        config,
        sourceFields?.[ctd],
        i18n.t('NonRequiredFieldsInCTD', {
          types: validSourceFields.join(', '),
        }),
      );
      config.additionalElements = [getAdditionalFieldsElement(name)];
      break;
    case 'faq':
      insertSelectOptions(
        config,
        faqFields?.[ctd],
        i18n.t('NonRequiredFieldsInCTD', {
          types: i18n.t('AllowedFaq'),
        }),
      );
      break;
    default:
      break;
  }
};
