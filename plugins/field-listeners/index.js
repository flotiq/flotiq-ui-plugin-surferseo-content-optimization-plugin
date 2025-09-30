import pluginInfo from '../../plugin-manifest.json';
import { buildTemplate } from '../template/template';

export const handleFormFieldListenersAdd = (
  { contentType, form, name },
  ctdConfig,
) => {
  if (name && contentType?.id === pluginInfo.id && contentType?.nonCtdSchema) {
    const { index, type } =
      name.match(/surferSeoAnalyzer\[(?<index>\d+)\].(?<type>\w+)/)?.groups ||
      {};

    if (index != null && type === 'content_type') {
      return {
        onChange: () => {
          ['title', 'lead', 'source', 'faq'].forEach((key) => {
            form.setFieldValue(`surferSeoAnalyzer[${index}].${key}`, '');
          });
        },
      };
    }
  }

  if (!ctdConfig) return;
  if (
    [ctdConfig.title, ctdConfig.lead, ctdConfig.source, ctdConfig.faq].includes(
      name,
    )
  ) {
    return {
      onChange: ({ fieldApi }) => {
        const form = fieldApi.form;
        const source = buildTemplate(
          form.getFieldValue(ctdConfig.title),
          form.getFieldValue(ctdConfig.lead),
          form.getFieldValue(ctdConfig.source),
          form.getFieldValue(ctdConfig.faq),
        );
        window.surferGuidelines.setHtml(source);
      },
    };
  }
};
