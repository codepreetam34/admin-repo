import { Toast } from "bootstrap";
import { ToastContainer } from "react-bootstrap";

export const Notify = ({ setShowToast, showToast }) => {
  <div className="custom_toaster">
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        className="bottom-end"
        delay={3000}
      >
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
            loading="lazy"
          />
          <strong className="me-auto">
            <i class="fa-solid fa-circle-check"></i> Success
          </strong>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  </div>;
};
// export const getImagePreview = ({ selectedImage, setPreviewImage }) => {
//   const imageReader = new FileReader();

//   imageReader.onload = (e) => {
//     const image = new Image();
//     image.src = e.target.result;

//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = 400;
//       canvas.height = 200;

//       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//       const resizedImage = canvas.toDataURL();
//       setPreviewImage(resizedImage);
//     };
//   };

//   imageReader.readAsDataURL(selectedImage);
// };
