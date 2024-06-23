import React, { useEffect } from "react";
import { Modal, Tabs, Form, Input, Row, Col, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { SetLoader } from "../../redux/loadersSlice";
import { AddItem, EditItem } from "../../apicalls/inventory";

const rules = [
  {
    required: true,
    message: "required",
  },
];


function ItemsForm({ showItemsForm, setShowItemsForm, selectedItem, getData }) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedItem) {
        response = await EditItem(selectedItem._id, values);
      } else {
        values.seller = user._id;
        response = await AddItem(values);
      }

      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowItemsForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedItem) {
      formRef.current.setFieldsValue(selectedItem);
    }
  }, [selectedItem]);
  return (
    <Modal
      title=""
      open={showItemsForm}
      onCancel={() => setShowItemsForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedItem ? "Edit Item" : "Add Item"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key={1}>
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Item Name" name="ItemName" rules={rules}>
                <Input type="text" />
              </Form.Item>

              <Form.Item label="Donor Name" name="DonorName" rules={rules}>
                <Input type="text" />
              </Form.Item>

              <Form.Item
                label="Contact Number"
                name="DonorContact"
                rules={rules}
              >
                <Input type="number" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Category" name="Category" rules={rules}>
                    <Select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="toys">Toys & Games</option>
                      <option value="foods">Foods & Beverages</option>
                      <option value="medical">Medical Supplies</option>
                      <option value="personalCare">
                        Personal Care Products
                      </option>
                      <option value="sports">Sports</option>
                      <option value="books">Books</option>
                      <option value="baby">Baby Items</option>
                      <option value="specialNeeds">Special Needs Items</option>
                      <option value="tools">Tools & Building Meterials</option>
                      <option value="other">Other</option>

                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Quantity" name="Quantity" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Recieved Date"
                    name="RecievedDate"
                    rules={rules}
                  >
                    <Input type="date" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Description" name="Description" rules={rules}>
                <Input.TextArea type="text" />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ItemsForm;


