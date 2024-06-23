import React, { useEffect } from "react";
import { Modal, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";
import Devider from "../../../components/Devider";

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bid placed on ",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM- YYYY hh:mm A");
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <div>
            <p>{record.buyer.name}</p>
          </div>
        );
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },

    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p> Phone : {record.mobile} </p>
            <p>Email : {record.buyer.email} </p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1300}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
        <h1 className=" text-xl text-primary text-center">Bids</h1>

        <Devider />

        <h1 className=" text-xl text-gray-500">
          Product Name : {selectedProduct.name} - Bids
        </h1>

        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
}

export default Bids;
