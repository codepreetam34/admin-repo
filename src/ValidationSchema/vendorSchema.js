import * as Yup from "yup";

export const vendorSchema = Yup.object().shape({
  shopName: Yup.string().required("Shop Name is required"),
});
