import pluginInfo from '../../plugin-manifest.json';

export const handleFormFieldListenersAdd = ({ contentType, formik, name }) => {
  if (name && contentType?.id === pluginInfo.id && contentType?.nonCtdSchema) {
    const { index, type } =
      name.match(/surferSeoAnalyzer\[(?<index>\d+)\].(?<type>\w+)/)?.groups ||
      {};

    if (index != null && type === 'content_type') {
      return {
        onChange: () => {
          ['title', 'lead', 'source', 'faq'].forEach((key) => {
            formik.setFieldValue(`surferSeoAnalyzer[${index}].${key}`, '');
          });
        },
      };
    }
  }
};
