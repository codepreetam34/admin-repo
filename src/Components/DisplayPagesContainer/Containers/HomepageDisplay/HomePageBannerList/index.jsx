import React, { useState } from "react";
import Wrapper from "../../../../Wrapper";
import { Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import allManageNft from "../../../../../JsonFile/ManageNftData";
import ViewDataModal from "../../../Containers/HomepageDisplay/HomePageBannerList/Modals/ViewDataModal";
import EditDataModal from "../../../Containers/HomepageDisplay/HomePageBannerList/Modals/EditDataModal";
import DeleteDataModal from "../../../Containers/HomepageDisplay/HomePageBannerList/Modals/DeleteDataModal";
import AddDataModal from "../../../Containers/HomepageDisplay/HomePageBannerList/Modals/AddDataModal";

const HomePageBannerList = () => {
  const [nftItems] = useState(allManageNft);
  const [selectedNft, setSelectedNft] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const DataTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Title</th>
          <th>Image</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
    );
  };

  const DataTableRow = ({ index, nft }) => {
    const handleView = () => {
      setSelectedNft(nft);
      setViewModalOpen(true);
    };

    const handleEdit = () => {
      setSelectedNft(nft);
      setEditModalOpen(true);
    };

    const handleDelete = () => {
      setSelectedNft(nft);
      setDeleteModalOpen(true);
    };

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{nft.id}</td>
        <td>
          <img src={nft.nftitemimg} alt="" /> {nft.nftitem}
        </td>
        <td>
          <div className="table_icons d-flex align-items-center justify-content-center">
            <div className="eye" onClick={handleView}>
              <a href="#">
                <i className="fa-solid fa-eye"></i>
              </a>
            </div>
            <div className="edit" onClick={handleEdit}>
              <a href="#">
                <i className="far fa-edit"></i>
              </a>
            </div>
            <div className="delete" onClick={handleDelete}>
              <a href="#">
                <i className="far fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const handleAdd = () => {
    setSelectedNft(true);
    setAddModalOpen(true);
  };

  return (
    <Wrapper>
      <div className="user_management_list">
        <Row>
          <Col md={6}>
            <div className="user_heading">
              <h3>HomePage Carousel Banners</h3>
              <p>Welcome to HomePage Banner page</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="add_filter_btn d-flex justify-content-end">
              <a href="#" className="bgbtnred" onClick={handleAdd}>
                Add New Banner
              </a>
            </div>
          </Col>
          <Col md={4} style={{ paddingTop: "1.875rem" }}>
            <div className="manage_searchbar">
              <InputGroup className="">
                <InputGroup.Text id="basic-addon1" className="">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search NFT's"
                  className=""
                  aria-label="Search NFT's"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
          </Col>

          <Col md={12}>
            <div className="user_table">
              <div className="nftstable">
                <div className="tablearea">
                  <Table responsive className="m-0">
                    <DataTableHeader />
                    <tbody>
                      {nftItems &&
                        nftItems?.map((nft, i) => (
                          <DataTableRow index={i} key={nft.id} nft={nft} />
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modals */}
      {selectedNft && (
        <>
          <ViewDataModal
            show={isViewModalOpen}
            onClose={() => setViewModalOpen(false)}
          />
          <EditDataModal
            show={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
          />
          <DeleteDataModal
            show={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          />
          <AddDataModal
            show={isAddModalOpen}
            onClose={() => setAddModalOpen(false)}
          />
        </>
      )}
    </Wrapper>
  );
};

export default HomePageBannerList;
