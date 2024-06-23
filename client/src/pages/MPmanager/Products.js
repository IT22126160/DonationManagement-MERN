import { Button, Table } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

function Products() {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  //report
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Product's Report",
  });

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-20 h-20 rounded-md object-cover"
          />
        );
      },
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-yyyy hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className=" flex gap-3">
            {status === "pending" && (
              <span
                className="underline cursor-pointer "
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </span>
            )}

            {status === "pending" && (
              <span
                className="underline cursor-pointer "
                onClick={() => onStatusUpdate(_id, "rejected")}
              >
                Reject
              </span>
            )}

            {status === "approved" && (
              <span
                className="underline cursor-pointer "
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}

            {status === "blocked" && (
              <span
                className="underline cursor-pointer "
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div ref={componentsRef}>
        <Table columns={columns} dataSource={products} />
      </div>
      <center>
        <Button
          className="flex justify-center items-center p-3 bg-primary"
          onClick={() => {
            handlePrint();
          }}
        >
          Download Products Details Report
        </Button>
      </center>
    </div>
  );
}

export default Products;
