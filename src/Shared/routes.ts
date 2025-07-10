const STRING: string = "Test";
export { STRING };

const ROUTES = {
  HOMEPAGE: "/",
  CARD_WRAPPER: "/card-wrapper",
  REGISTER: "/register",
  ABOUT: "/about-us",
  SIGNUP: "/signup",
  CUSTOMIZE: "/customize",
  CUSTOMIZE_IMAGE: "/customize_image",
  KONVA_WRAPPER: "/konva",
  TEMPLATE_SIZE: "/chosen-template",
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.HOMEPAGE,
  PRIVATE: ROUTES.KONVA_WRAPPER,
};

const ROUTES_CONFIG = {
  TEMPLATE: {
    path: ROUTES.TEMPLATE_SIZE,
    title: "Template",
  },
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: "Master Plan",
  },
  KONVA: {
    path: ROUTES.KONVA_WRAPPER,
    title: "Konva Card",
  },
  CUSTOMIZE: {
    path: ROUTES.CUSTOMIZE,
    title: "Customize",
  },
  CUSTOMIZE_IMAGE: {
    path: ROUTES.CUSTOMIZE_IMAGE,
    title: "Customize_IMAGE",
  },
  CARD_WRAPPER: {
    path: ROUTES.CARD_WRAPPER,
    title: "CARD_WRAPPER",
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: "Register",
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: "About us",
  },
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: "Sign Up",
  },
};
const MESSAGES = {
  NOTIFICATION: {
    CARD_TITLE: "✨ Welcome! Let’s Customize Your Setup",
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG, MESSAGES };
