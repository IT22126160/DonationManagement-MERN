import React from "react";
import { message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import Devider from "../../components/Devider";
import {
  GetAllBids,
  GetProductById,
  GetProducts,
} from "../../apicalls/products";
import moment from "moment";
import BidModal from "./BidModal";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);

  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [SelectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));

      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/*images*/}

          <div className="flex flex-col gap-5">
            <img
              src={product.images[SelectedImageIndex]}
              className="w-full h-99 object-cover rounded-md"
              alt=""
            />

            <div className="felx gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer p-2" +
                      (SelectedImageIndex === index
                        ? "border-2 border-orange-700 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                  />
                );
              })}
            </div>

            <div>
              <h1 className="text-gray-600 ">Added On</h1>
            </div>
            <span className="text-gray-600">
              {moment(product.createdAt).format("MMM D YYYY hh:mm A")}
            </span>
          </div>

          {/* details */}

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900 ">
                {product.name}
              </h1>
              <br />
              <span> {product.description}</span>
            </div>

            <Devider />

            <div flex flex-col>
              <h1 className="text-2xl font-semibold text-orange-900">
                {" "}
                Product Details{" "}
              </h1>

              <div className="flex justify-between mt-3">
                <span>Price</span>
                <span>Rs. {product.price}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Bill Available</span>
                <span>{product.BillAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Warranty Available</span>
                <span>{product.WarrantyAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Box Available</span>
                <span>{product.BoxAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Accessories Available</span>
                <span>{product.AccessoriesAvailable ? "Yes" : "No"}</span>
              </div>
            </div>

            <Devider />

            <div className=" flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900 ">
                Seller Details
              </h1>
              <div className="flex justify-between mt-3">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>

            <Devider />

            <div className="flex flex-col">
              <div className="flex justify-between mb-5">
                <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>

              {product.ShowBidsOnProductPage &&
                product?.bids?.map((bid) => {
                  return (
                    <div className="border border-gray-300 border-solid p-3 rounded  mt-5">
                      <div className="flex justify-between  text-gray-700">
                        <span>Name</span>
                        <span>{bid.buyer.name}</span>
                      </div>

                      <div className="flex justify-between  text-gray-600">
                        <span>Bid Amount</span>
                        <span> Rs.{bid.bidAmount}</span>
                      </div>

                      <div className="flex justify-between  text-gray-600">
                        <span>Bid Placed On</span>
                        <span>
                          {moment(bid.createdAt).format("DD-MM-YYYY hh:mm A")}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
