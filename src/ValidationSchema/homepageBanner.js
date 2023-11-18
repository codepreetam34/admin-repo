import * as Yup from "yup";
export const homepageBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Image Alt Text is required"),
});