import React, {useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const SuccessToaster = ({
  showToast,
  setShowToast,
  showToastMessage,
  customMessage,
}) => {
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
  }, [showToast, setShowToast]);

  return (
    <div className="custom_toaster">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          className="top-end"
          delay={3000}
          style={{ borderRadius: "10px" }}
        >
          <Toast.Header style={{ borderRadius: "10px" }}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              loading="lazy"
            />
            <strong className="me-auto">
              <i class="fa-solid fa-circle-check"></i>
              {showToastMessage ? showToastMessage : customMessage}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export const ErrorToaster = ({
  showErrorToast,
  setShowErrorToast,
  showErrorToastMessage,
  customErrorMessage,
}) => {
  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      }, 4000);
    }
  }, [showErrorToast, setShowErrorToast]);

  return (
    <div className="custom_toaster_error">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          className="top-end"
          delay={3000}
          bg="danger"
          style={{ borderRadius: "10px" }}
        >
          <Toast.Header style={{ borderRadius: "10px" }}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              loading="lazy"
            />
            <strong className="me-auto">
              <i className="fa-solid fa-circle-xmark"></i>{" "}
              {/* Changed the icon to a cross */}
              {showErrorToastMessage
                ? showErrorToastMessage
                : customErrorMessage}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
};

// import { Toast } from "bootstrap";
// import { ToastContainer } from "react-bootstrap";

// export const Notify = ({ setShowToast, showToast, showToastMessage }) => {
//   <div className="custom_toaster">
//     <ToastContainer position="top-end" className="p-3">
//       <Toast
//         onClose={() => setShowToast(false)}
//         show={showToast}
//         className="top-end"
//         delay={3000}
//         style={{ borderRadius: "10px" }}
//       >
//         <Toast.Header style={{ borderRadius: "10px" }}>
//           <img
//             src="holder.js/20x20?text=%20"
//             className="rounded me-2"
//             alt=""
//             loading="lazy"
//           />
//           <strong className="me-auto">
//             <i class="fa-solid fa-circle-check"></i> Success
//           </strong>
//         </Toast.Header>
//       </Toast>
//     </ToastContainer>
//   </div>;
// };
// export const NotifyError = ({
//   setShowErrorToast,
//   showErrorToast,
//   showErrorToastMessage,
// }) => {
//   <div className="custom_toaster_error">
//     <ToastContainer position="top-end" className="p-3">
//       <Toast
//         onClose={() => setShowErrorToast(false)}
//         show={showErrorToast}
//         className="top-end"
//         delay={3000}
//         bg="danger"
//         style={{ borderRadius: "10px" }}
//       >
//         <Toast.Header style={{ borderRadius: "10px" }}>
//           <img
//             src="holder.js/20x20?text=%20"
//             className="rounded me-2"
//             alt=""
//             loading="lazy"
//           />
//           <strong className="me-auto">
//             <i className="fa-solid fa-circle-xmark"></i>{" "}
//             {/* Changed the icon to a cross */}
//             {showErrorToastMessage
//               ? showErrorToastMessage
//               : "Incorrect login credentials. Please verify and retry."}
//           </strong>
//         </Toast.Header>
//       </Toast>
//     </ToastContainer>
//   </div>;
// };
// // export const getImagePreview = ({ selectedImage, setPreviewImage }) => {
// //   const imageReader = new FileReader();

// //   imageReader.onload = (e) => {
// //     const image = new Image();
// //     image.src = e.target.result;

// //     image.onload = () => {
// //       const canvas = document.createElement("canvas");
// //       const ctx = canvas.getContext("2d");
// //       canvas.width = 400;
// //       canvas.height = 200;

// //       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

// //       const resizedImage = canvas.toDataURL();
// //       setPreviewImage(resizedImage);
// //     };
// //   };

// //   imageReader.readAsDataURL(selectedImage);
// // };
