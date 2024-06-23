import { Button, Input, Table } from "antd";
import React, { useEffect, useRef } from "react";
import ItemsForm from "./ItemsForm";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { DeleteItem, GetAllItems } from "../../apicalls/inventory";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Items() {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [Items, setItems] = React.useState([]);
  const [showItemsForm, setShowItemsForm] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [itemQuantities, setItemQuantities] = React.useState({});
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Item's Report",
  });

  const getData = async (query) => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllItems({
        seller: user._id,
        query: query
      });
      dispatch(SetLoader(false));

      if (response.success) {
        setItems(response.data);

        const quantities = {};
        response.data.forEach(item => {
          if (quantities[item._id]) {
            quantities[item._id] += item.Quantity;
          } else {
            quantities[item._id] = item.Quantity;
          }
        });
        setItemQuantities(quantities);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const filterItems = (query) => {
    let filteredItems = Items;
    if (query) {
      filteredItems = filteredItems.filter(item =>
        item.ItemName.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (categoryFilter) {
      filteredItems = filteredItems.filter(item =>
        item.Category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    return filteredItems;
  };

  const renderTotalQuantity = (record) => {
    return itemQuantities[record._id] || 0;
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: "ItemName",
    },
    {
      title: "Category",
      dataIndex: "Category",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
    },
    {
      title: "Donor Name",
      dataIndex: "DonorName",
    },
    {
      title: "Donor Contact",
      dataIndex: "DonorContact",
    },
    {
      title: "Received Date",
      dataIndex: "ReceivedDate",
      render: (text, record) =>
        moment(record.ReceivedDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Description",
      dataIndex: "Description",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 item-center">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteItem(record._id);
              }}
            ></i>
            <i
              className="ri-edit-line"
              onClick={() => {
                setSelectedItem(record);
                setShowItemsForm(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  const deleteItem = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteItem(id);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        getData(searchQuery);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(searchQuery);
  }, [searchQuery, categoryFilter]);

  return (
    <div>
      <div className="flex gap-5 items-center p-5">
        <Input
          type="text"
          placeholder="Search Item name here ..."
          className="border border-gray-300 rounded border-solid p-2 h-14"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded border-solid p-2 h-14"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Select</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="toys">Toys & Games</option>
          <option value="foods">Foods & Beverages</option>
          <option value="medical">Medical Supplies</option>
          <option value="personalCare">Personal Care Products</option>
          <option value="sports">Sports</option>
          <option value="books">Books</option>
          <option value="baby">Baby Items</option>
          <option value="specialNeeds">Special Needs Items</option>
          <option value="tools">Tools & Building Materials</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <div className="flex justify-end mb-5 gap-2">
          <Button type="default" onClick={() => navigate("/ViewAll")}>
            View Donated Items
          </Button>
          <Button
            type="default"
            onClick={() => {
              setSelectedItem(null);
              setShowItemsForm(true);
            }}
          >
            Add Item
          </Button>
        </div>
        <div ref={componentsRef}>
          <Table columns={columns} dataSource={filterItems(searchQuery)} />
          {showItemsForm && (
            <ItemsForm
              showItemsForm={showItemsForm}
              setShowItemsForm={setShowItemsForm}
              selectedItem={selectedItem}
              getData={getData}
            />
          )}
        </div>
      </div>

      <center>
        <Button
          className="flex justify-center items-center p-3 bg-primary"
          onClick={() => {
            handlePrint();
          }}
        >
          Download Inventory Report
        </Button>
      </center>
    </div>
  );
}

export default Items;