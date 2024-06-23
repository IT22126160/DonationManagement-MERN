import React, { useEffect, useState } from "react";
import { Modal, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetAllBids } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";

function Bids() {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        buyer: user._id,
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
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return record.product ? record.product.name : "";
      },
    },
    {
      title: "Bid placed on ",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM- YYYY hh:mm A");
      },
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller ? <p>{record.seller.name}</p> : "";
      },
    },
    {
      title: "Offered price",
      dataIndex: "offeredPrice",
      render: (text, record) => {
        return record.product ? record.product.price : "";
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
            <p> Phone : {record.mobile ? record.mobile : ''} </p>
            <p>Email : {record.buyer ? record.buyer.email : ''} </p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
}

export default Bids;
