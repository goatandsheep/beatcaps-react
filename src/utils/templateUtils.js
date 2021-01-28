export const getUiWidthFromScreenWidth = (windowWidth) => {
  if (windowWidth > 1408) {
    return 1248;
  } else if (windowWidth > 1216) {
    return 1104;
  } else if (windowWidth > 1024) {
    return 912;
  } else {
    return windowWidth - (2 * 24)
  }
}

export const getUiPxFromViewPx = (viewPx, scale) => {
  return viewPx * scale
}

export const getViewPxFromUiPx = (uiPx, scale) => {
  return Math.round(uiPx / scale)
}

// constants
export const DEFAULT_VIEW_OBJECT = {
  height: 250,
  width: Math.round(250 * 16 / 9),
  x: 0,
  y: 0,
};

export const DEFAULT_TEMPLATE_OBJECT = {
  name: '',
  height: 720,
};
