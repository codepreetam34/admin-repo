import * as Yup from "yup";
export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Category Name is required"),
  imageAltText: Yup.string().required("image Alt Text is required"),
});