import * as Yup from "yup";

export const editProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  actualPrice: Yup.number()
    .typeError("Actual Price must be a number")
    .required("Actual Price is required"),
  categoryId: Yup.string().required("Category is required"),
  deliveryDay: Yup.string().required("Delivery Day is required"),
  description: Yup.string().required("Description is required"),
  specifications: Yup.string().required("Specifications are required"),
  tags: Yup.string().required("Tags are required"),
  pincode: Yup.string().required("Pincode is required"),
  discountPrice: Yup.number()
    .typeError("Discount Price must be a number")
    .required("Discount Price is required"),
  halfkgprice: Yup.number()
    .typeError("Half KG Price must be a number")
    .required("Half KG Price is required"),
  onekgprice: Yup.number()
    .typeError("One KG Price must be a number")
    .required("One KG Price is required"),
  twokgprice: Yup.number()
    .typeError("Two KG Price must be a number")
    .required("Two KG Price is required"),
});
