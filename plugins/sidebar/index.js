import pluginInfo from '../../plugin-manifest.json';
import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';

export const createSidebar = (id) => {
  const containerCacheKey = `${pluginInfo.id}-${id || ''}-surferseo-content-analyzer-container`;
  let contentAnalyzerContainer = getCachedElement(containerCacheKey)?.element;
  if (!contentAnalyzerContainer) {
    contentAnalyzerContainer = document.createElement('div');
    contentAnalyzerContainer.innerHTML = `<div id="flotiq-ui-plugin-surfer-seo-sidebar-element"> </div>`;

    window.surferGuidelines.init(
      contentAnalyzerContainer.querySelector(
        `#flotiq-ui-plugin-surfer-seo-sidebar-element`,
      ),
      null,
      { permalink: id },
    );

    addElementToCache(contentAnalyzerContainer, containerCacheKey);
  }

  return contentAnalyzerContainer;
};
