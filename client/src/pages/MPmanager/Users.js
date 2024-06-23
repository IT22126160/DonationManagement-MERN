import { Table } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { message ,Button} from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";
import { useReactToPrint } from "react-to-print";

import moment from "moment";

function Users() {
  const [users, setUsers] = React.useState([]);

  const dispatch = useDispatch();

  // report
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "User's Report",
  });

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers(null);
      dispatch(SetLoader(false));

      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
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
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className=" flex gap-3">
            {status === "active" && (
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
                onClick={() => onStatusUpdate(_id, "active")}
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
      <Table columns={columns} dataSource={users} />
      </div>
      <center>
        <Button
          className="flex justify-center items-center p-3 bg-primary"
          onClick={() => {
            handlePrint();
          }}
        >
          Download User Details Report
        </Button>
      </center>
    </div>
  );
}

export default Users;
