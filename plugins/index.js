import { registerFn } from '../common/plugin-element-cache';
import pluginInfo from '../plugin-manifest.json';
import cssString from 'inline:./styles/style.css';
import { handleManagePlugin } from './manage/index.js';
import { handlePluginFormConfig } from './field-config/plugin-form/index.js';

registerFn(pluginInfo, (handler) => {
  /**
   * Add plugin styles to the head of the document
   */
  if (!document.getElementById(`${pluginInfo.id}-styles`)) {
    const style = document.createElement('style');
    style.id = `${pluginInfo.id}-styles`;
    style.textContent = cssString;
    document.head.appendChild(style);
  }

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
});
