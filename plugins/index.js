import { registerFn } from '../common/plugin-element-cache';
import pluginInfo from '../plugin-manifest.json';
import cssString from 'inline:./styles/style.css';
import { handleManagePlugin } from './manage/index.js';
import { handlePluginFormConfig } from './field-config/plugin-form/index.js';
import { createSidebar } from './sidebar/index.js';

const setupSurferSeo = () => {
  (() => {
    if (void 0 !== window.surferGuidelines) return;
    window.surferGuidelines = {
      init(...i) {
        window.__sg_in = i;
      },
      setHtml(...i) {
        window.__sg_sh = i;
      },
      initWithOptions(...i) {
        window.__sh_gi = i;
      },
    };
    const i = document.createElement('script');
    (i.async = !0),
      (i.src = 'https://app.surferseo.com/static/surfer_guidelines_1_x_x.js'),
      document.body.appendChild(i);
  })();
};

/**
 * Add plugin styles to the head of the document
 */
const appendStyles = () => {
  if (!document.getElementById(`${pluginInfo.id}-styles`)) {
    const style = document.createElement('style');
    style.id = `${pluginInfo.id}-styles`;
    style.textContent = cssString;

    document.head.appendChild(style);
  }
};

registerFn(pluginInfo, (handler) => {
  setupSurferSeo();
  appendStyles();

  handler.on('flotiq.plugins.manage::form-schema', (data) =>
    handleManagePlugin(data),
  );

  handler.on('flotiq.form.field::config', (data) => {
    if (
      data.contentType?.id === pluginInfo.id &&
      data.contentType?.nonCtdSchema &&
      data.name
    ) {
      return handlePluginFormConfig(data);
    }
  });

  handler.on('flotiq.form.sidebar-panel::add', () => {
    return createSidebar();
  });
});
