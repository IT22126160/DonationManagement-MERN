import React, { useEffect } from "react";
import { Input, Table, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Items from "./Items";

function InventoryManager() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "InventoryManager") {
      navigate("/");
    }
  }, []);

  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div>
        <Tabs>
          <Tabs.TabPane tab="Items" key="1">
            <Items />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default InventoryManager;
