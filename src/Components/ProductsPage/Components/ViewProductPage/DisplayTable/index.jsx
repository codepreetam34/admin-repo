import React from "react";
import { Table } from "react-bootstrap";

const DisplayTable = ({ reviews }) => {
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="detailstable product-detail-design">
      <h4>Reviews ({reviews && reviews?.length})</h4>
      <div className="detailtablearea">
        <Table responsive className="m-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews?.length > 0 ? (
              reviews?.map((review, index) => (
                <tr key={review?._id}>
                  <td>{review?.name}</td>
                  <td>{review?.rating}</td>
                  <td>{review?.comment}</td>
                  <td>{formatDate(review?.updatedAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <div className="d-flex justify-content-center pt-4">
                    <p className="text-red">No Reviews !!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DisplayTable;
