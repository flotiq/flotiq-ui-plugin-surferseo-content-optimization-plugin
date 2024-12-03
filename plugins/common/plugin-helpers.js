const appRoots = {};

export const addElementToCache = (element, root, key) => {
  appRoots[key] = {
    element,
    root,
  };

  let detachTimeoutId;

  element.addEventListener('flotiq.attached', () => {
    if (detachTimeoutId) {
      clearTimeout(detachTimeoutId);
      detachTimeoutId = null;
    }
  });

  element.addEventListener('flotiq.detached', () => {
    detachTimeoutId = setTimeout(() => {
      delete appRoots[key];
    }, 50);
  });
};

export const getCachedElement = (key) => {
  return appRoots[key];
};

export const registerFn = (pluginInfo, callback) => {
  if (window.FlotiqPlugins?.add) {
    window.FlotiqPlugins.add(pluginInfo, callback);
    return;
  }
  if (!window.initFlotiqPlugins) window.initFlotiqPlugins = [];
  window.initFlotiqPlugins.push({ pluginInfo, callback });
};

export const addObjectToCache = (key, data = {}) => {
  appRoots[key] = data;
};

export const removeRoot = (key) => {
  delete appRoots[key];
};
