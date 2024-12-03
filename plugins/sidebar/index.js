import pluginInfo from '../../plugin-manifest.json';
import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';

export const createSidebar = (formik, pluginConfig) => {
  const containerCacheKey = `${pluginInfo.id}-surferseo-content-analyzer-container`;
  let contentAnalyzerContainer = getCachedElement(containerCacheKey)?.element;

  if (!contentAnalyzerContainer) {
    contentAnalyzerContainer = document.createElement('div');
    contentAnalyzerContainer.innerHTML = `<div id="surfer-guidelines-placeholder"> </div>`;

    window.surferGuidelines.init(
      contentAnalyzerContainer.querySelector('#surfer-guidelines-placeholder'),
      'sharing-token',
    );

    addElementToCache(contentAnalyzerContainer, containerCacheKey);
  }

  console.log(formik, pluginConfig);

  return contentAnalyzerContainer;
};
