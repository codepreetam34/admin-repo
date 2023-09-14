// import React, { useState } from "react";
// import { Row, Col, Form,  Button } from "react-bootstrap";

// const AddDataModal = ({ show, onClose }) => {

//   return (
//     <Form className="user_form">
//     <Row>
//       <Col md={6}>
//         <Form.Group className="mb-4" controlId="formBasicEmail">
//           <Form.Label>First Name</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col md={6}>
//         <Form.Group className="mb-4" controlId="formBasicPassword">
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col md={12}>
//         <Form.Group className="mb-4" controlId="formBasicPassword">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" />
//         </Form.Group>
//       </Col>
//       <Col md={12}>
//         <Form.Group className="mb-4" controlId="formBasicPassword">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col md={12}>
//         <Form.Group className="mb-4" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" />
//         </Form.Group>
//       </Col>
//       <Col md={12}>
//         <Form.Group className="mb-4" controlId="formBasicPassword">
//           <Form.Label>Select Role</Form.Label>
//           <Form.Select aria-label="Default select example">
//             <option value="Admin">Admin</option>
//             <option value="Investor">Investor</option>
//           </Form.Select>
//         </Form.Group>
//       </Col>
//       <Col md={12}>
//         <Button variant="" type="submit">
//           Submit
//         </Button>
//       </Col>
//     </Row>
//   </Form>
//   );
// };
// export default AddDataModal;

// import React, { useState } from "react";
// import { Row, Col, Form, Button } from "react-bootstrap";
// import { useForm } from "react-hook-form"; // Import useForm for validation
// import { useDispatch } from "react-redux";
// import { getCategory } from "Redux/Slices/Category/CategorySlice";

// const AddDataModal = ({ show, onClose }) => {
//   const dispatch = useDispatch();
//   const { handleSubmit, register, errors } = useForm(); // Initialize useForm for validation

//   // Handle form submission
//   const onSubmit = (data) => {
//     // Prepare the data for your API call here
//     const formData = new FormData();
//     formData.append("name", data.firstName);
//     formData.append("imageAltText", data.imageAltText);
//     formData.append("categoryImage", data.categoryImage);
//     formData.append("parentId", data.selectCategory);

//     // Dispatch the API call
//     dispatch(getCategory(formData))
//       .then(() => {
//         // Handle success and notify the user
//         // notify({ type: "success", message: "Data Added Successfully" });
//         onClose(); // Close the modal or perform any other necessary action
//       })
//       .catch((error) => {
//         // Handle error and notify the user if needed
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <Form className="user_form" onSubmit={handleSubmit(onSubmit)}>
//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-4" controlId="name">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control type="text" name="name" {...register("name")}/>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-4" controlId="imageAltText">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control type="text" name="imageAltText" {...register("imageAltText")} />
//           </Form.Group>
//         </Col>
//         {/* Add other input fields as needed, using the same pattern */}
//         <Col md={12}>
//           <Form.Group className="mb-4" controlId="selectCategory">
//             <Form.Label>Select Category</Form.Label>
//             <Form.Select name="selectCategory" {...register("parentId")}>
//               <option value="Admin">Admin</option>
//               <option value="Investor">Investor</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>
//         <Col md={12}>
//           <Button variant="" type="submit">
//             Submit
//           </Button>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default AddDataModal;

// export default AddDataModal;

import React, { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { getCategory } from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";

const AddDataModal = ({ show, onClose, onSubmitCallback, onDataCallback }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "onChange",
  });

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue("categoryImage", file);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const onSubmit = (data) => {
    // Handle form submission logic here
    // 'data' will contain the form input values
    onSubmitCallback(data); // Call the onSubmitCallback function with the data
    onDataCallback(data); // Call the onDataCallback function with the data
  };

  return (
    <>
      <Form className="user_form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" name="name" {...register("name")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="selectCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Select name="selectCategory" {...register("parentId")}>
                <option value="Admin">Admin</option>
                <option value="Investor">Investor</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="categoryImage">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                name="categoryImage"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>{" "}
          <Col md={6}>
            <Form.Group className="mb-4" controlId="imageAltText">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control
                type="text"
                name="imageAltText"
                {...register("imageAltText")}
              />
            </Form.Group>
          </Col>{" "}
          <Col>
            {imagePreview && (
              <div className="mt-4">
                <div>{`Image Preview`} </div>
                <img
                  src={imagePreview}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "4px",
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default AddDataModal;
