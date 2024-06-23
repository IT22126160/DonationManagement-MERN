import React from "react";
import { Modal, message } from "antd";
import Devider from "./Devider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteNotification } from "../apicalls/notifications";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));

      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={800}
    >
      <div className="flex flex-col gap-3">
        {notifications.map((notification) => (
          <div
            className="flex flex-col gap-2 border border-solid p-2 border-gray-300 rounded cursor-pointer"
            key={notification._id}
          >
            <div className=" flex justify-between items-center">
              <div
                onClick={() => {
                  navigate("/profile");
                  setShowNotifications(false);
                }}
              >
                <h1 className="text-gray-700">{notification.title}</h1>
                <Devider />
                <span className="tetxt-gray-600">{notification.message}</span>

                <p className="tetxt-gray-500 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </p>
              </div>

              <div>
                <i className="ri-delete-bin-line" onClick={() => {

                  deleteNotification(notification._id);
                }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
