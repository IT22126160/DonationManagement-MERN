import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { message, Input } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import Devider from "../../components/Devider";
import Filters from "./filters";

function MPHome() {
  const [showFilters, setShowFilters] = React.useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });

  const [searchInput, setSearchInput] = React.useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchInput.toLowerCase())
);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}

          <Input
            type="text"
            placeholder="Search Product here ..."
            className="border border-gray-300 rounded border-solid p-2 h-14"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>

        <div
          className={`
      grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
      `}
        >
          {filteredProducts?.map((product) => {
            return (
              <div
                className=" border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  className="w-full h-52  p-2 rounded-md"
                  alt=""
                />

                <Devider />

                <div className="px-2 flex-col ">
                  <h1 className="text-lg font-semibold">{product.name} </h1>
                  <p className="text-sm ">
                    {product.age === 0
                      ? " New "
                      : product.age === 1
                      ? `${product.age}  Year old`
                      : `${product.age}  Years old`}
                  </p>

                  <span className="text-xl font-semibold text-orange-500">
                    Rs . {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MPHome;
