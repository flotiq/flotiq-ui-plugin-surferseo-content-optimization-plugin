import {
  addElementToCache,
  getCachedElement,
} from '../common/plugin-helpers.js';
import pluginInfo from '../../plugin-manifest.json';

export const createSidebar = () => {
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

  return contentAnalyzerContainer;
};
