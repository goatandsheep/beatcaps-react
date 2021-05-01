// Return the width (in px) that the entire drag and drop area should be, based on the window width.
export const getUiWidthFromScreenWidth = (windowWidth) => {
  if (windowWidth > 1408) {
    return 1248;
  } else if (windowWidth > 1216) {
    return 1104;
  } else if (windowWidth > 1024) {
    return 912;
  } else {
    return windowWidth - (2 * 24);
  }
};

export const getUiPxFromViewPx = (viewPx, scale) => {
  return viewPx * scale;
};

export const getViewPxFromUiPx = (uiPx, scale) => {
  return uiPx / scale;
};

export const get720pWidth = (height) => {
  return height * 16 / 9;
};

// All views should fit within the dimensions of the template
// Returns error message, or `null` if valid.
export const viewSizeErrors = ({
  views,
  maxHeight,
  maxWidth,
}) => {
  const errorMessage = `All views should fit within the dimensions of the template. Please check:`;
  const invalidTemplates = views.reduce((string, {height, width, x, y}, index) => {
    if ((height + y <= maxHeight) && (width + x <= maxWidth)) {
      return string;
    } else {
      return string + ` View ${index + 1}.`;
    }
  }, '');

  return invalidTemplates ? (errorMessage + invalidTemplates) : null;
};

// constants
export const DEFAULT_VIEW_OBJECT = {
  height: 250,
  width: get720pWidth(250),
  x: 0,
  y: 0,
};

export const DEFAULT_TEMPLATE_OBJECT = {
  name: '',
  height: 720,
  width: get720pWidth(720),
};
