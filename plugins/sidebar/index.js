import pluginInfo from '../../plugin-manifest.json';
import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';
import i18n from '../../i18n';

export const createSidebar = (getSpaceId, objectId) => {
  const containerCacheKey = `${pluginInfo.id}-${objectId || 'new'}-surferseo-content-analyzer-container`;
  let contentAnalyzerContainer = getCachedElement(containerCacheKey)?.element;

  if (!contentAnalyzerContainer) {
    contentAnalyzerContainer = document.createElement('div');
    contentAnalyzerContainer.classList.add(
      'flotiq-ui-plugin-surfer-seo-content-analyzer-container',
    );

    contentAnalyzerContainer.innerHTML = `
        <div class="flotiq-ui-plugin-surfer-seo-content-analyzer-label">
            <img class="flotiq-ui-plugin-surfer-seo-content-analyzer-warning"/>
            ${i18n.t('ThirdPartyCookies')}
        </div>
        <div class="flotiq-ui-plugin-surfer-seo-sidebar-element"></div>
    `;

    const onNavigationCallback = (RpcView) => {
      if (['draft_loading', 'draft_creation', 'guidelines'].includes(RpcView)) {
        contentAnalyzerContainer
          .querySelector('.flotiq-ui-plugin-surfer-seo-content-analyzer-label')
          .classList.add(
            'flotiq-ui-plugin-surfer-seo-content-analyzer-label--hidden',
          );
      } else {
        contentAnalyzerContainer
          .querySelector('.flotiq-ui-plugin-surfer-seo-content-analyzer-label')
          .classList.remove(
            'flotiq-ui-plugin-surfer-seo-content-analyzer-label--hidden',
          );
      }
    };

    const { $iframe, setPermalink, setHtml } =
      window.surferGuidelines.initWithOptions({
        onNavigation: onNavigationCallback,
      });

    window.surferGuidelines.setHtml = setHtml;

    const spaceId = getSpaceId();

    const url = new URL(window.location.href);
    url.hash = `#surferSpace=${spaceId}`;

    setPermalink(url.toString());

    const noHashURL = window.location.href.replace(/#surferSpace=.*$/, '');
    window.history.replaceState('', document.title, noHashURL);

    $iframe.className = 'flotiq-ui-plugin-surfer-seo-sidebar-element-iframe';

    contentAnalyzerContainer
      .querySelector(`.flotiq-ui-plugin-surfer-seo-sidebar-element`)
      .appendChild($iframe);

    addElementToCache(contentAnalyzerContainer, containerCacheKey);
  }

  return contentAnalyzerContainer;
};
