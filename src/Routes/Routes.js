//Public routes
export const ROOT = "/";
export const LOGIN = "/login";
export const SIGNUP = "/signup";
export const EMAIL_VERIFY = "/email-verify";
export const EMAIL_VERIFY_OTP = "/verifyemail";
export const FORGOT_PASSWORD = "/forgot-password";
export const SETUP_NEW_PASSWORD = "/passwordReset";

// private routes
export const HOME = "/";
export const DISPLAY_PAGES = "/display-pages";
export const HOMEPAGE_DISPLAY = "/display-pages/homepage-display";
export const HOMEPAGE_BANNER_LIST =
  "/display-pages/homepage-display/homepage-banner-list";
export const HOMEPAGE_TWO_ADS_BANNER =
  "/display-pages/homepage-display/homepage-two-ads-banner";
export const HOMEPAGE_SHOP_BY_OCCASION =
  "/display-pages/homepage-display/homepage-shop-by-occasion";

export const HOMEPAGE_PAMPER_ZONE =
  "/display-pages/homepage-display/homepage-pamper-zone";

export const CATEGORY = "/category";
export const CATEGORY_CHILDREN = "/category/category-child/:id";
export const CATEGORY_CHILD_PRODUCTS = "/category/category-child/:id/products";
export const PRODUCTS = "/products";
export const ADD_PRODUCTS = "/products/add-product";

export const TAGS = "/tags";
export const ORDER_PAGE = "/orders";
export const USER_PAGE = "/users";
export const REGISTER_VENDOR = "/register-vendor";
