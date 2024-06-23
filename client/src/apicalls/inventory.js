import { axiosInstance } from "./axiosInstance";

// add item
export const AddItem = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/inventoryitems/add-items",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all items
export const GetAllItems = async () =>{
  try {
    const response = await axiosInstance.get("/api/inventoryitems/get-items");
    return response.data;
    
  } catch (error) {
    return error.message;
  }
};

//edit item
export const EditItem = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/inventoryitems/edit-item/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};


//delete item
export const DeleteItem = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/inventoryitems/delete-item/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};