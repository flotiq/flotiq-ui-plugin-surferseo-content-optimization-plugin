export const parsePluginSettings = (settings) => {
  const parsedSettings = JSON.parse(settings || '{}');

  return (parsedSettings?.surferSeoAnalyzer || []).reduce(
    (settings, element) => {
      settings[element.content_type] = element;
      return settings;
    },
    {},
  );
};
