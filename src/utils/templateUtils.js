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

// add default template width if missing. Add default view widths if missing.
// If the width is missing, assume that it has 16:9 aspect ratio
export const addDefaultWidth = (formData) => {
  return {
    ...formData,
    width: formData.width || get720pWidth(formData.height),
    lockAspectRatio: !formData.width,
    views: formData.views.map((view) => {
      return {
        ...view,
        width: view.width || get720pWidth(view.height),
        lockAspectRatio: !view.width,
      };
    }),
  };
};

// All views should fit within the dimensions of the template
// Returns error message, or `null` if valid.
export const viewSizeErrors = ({
  views,
  maxHeight,
  maxWidth,
}) => {
  const errorMessage = `All views should fit within the dimensions of the template. Please check view dimensions.`;
  console.log(views, maxHeight, maxWidth);
  const invalidTemplates = views.reduce((string, {height, width, x, y}, index) => {
    const validateX = width + x > maxWidth ? `Width and X value exceeds ${maxWidth}. ` : '';
    const validateY = height + y > maxHeight ? `Height and Y value exceeds ${maxHeight}. ` : '';
    console.log(string, validateX, validateY);

    if (validateX || validateY) {
      return string + ` View ${index + 1} - ${validateX}${validateY}`;
    }

    return string;
  }, '');

  return invalidTemplates ? (errorMessage + invalidTemplates) : null;
};

// Check if view height/width exceeds the template dimensions.
// If so, change the height/width to the template's dimensions.
export const getConfinedViewOptions = (fieldOptions, {width: templateWidth, height: templateHeight}) => {
  // Do not need to modify drag event
  if (!fieldOptions.width || !fieldOptions.height) {
    return fieldOptions;
  }

  // modify resize event
  return {
    ...fieldOptions,
    width: fieldOptions.width < templateWidth ? fieldOptions.width : templateWidth,
    height: fieldOptions.height < templateHeight ? fieldOptions.height : templateHeight,
  };
};

export const formatTemplateFormRequestObject = (formData) => {
  const roundedViewOptions = formData.views.map((view) => {
    return {
      x: Math.ceil(view.x),
      y: Math.ceil(view.y),
      height: Math.ceil(view.height),
      // don't send the width to the backend if using default 16:9
      ...(view.lockAspectRatio ? {} : {width: Math.ceil(view.width)}),
    };
  });

  const templateReq = {
    ...formData,
    height: Math.ceil(formData.height),
    width: Math.ceil(formData.width),
    views: roundedViewOptions,
  };

  // don't send the width to the backend if using default 16:9
  if (templateReq.lockAspectRatio) {
    delete templateReq.width;
  }

  return templateReq;
};

// constants
export const DEFAULT_VIEW_OBJECT = {
  height: 250,
  width: get720pWidth(250),
  x: 0,
  y: 0,
  lockAspectRatio: true,
};

export const DEFAULT_TEMPLATE_OBJECT = {
  name: '',
  height: 720,
  width: get720pWidth(720),
  lockAspectRatio: true,
  views: [DEFAULT_VIEW_OBJECT, DEFAULT_VIEW_OBJECT],
};
