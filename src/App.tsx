import "./App.css";
import { useState, useEffect } from "react";
import api from "./Components/api";
import { Cards } from "./Components/Cards";
import { Product } from "./types/util";
import Sidebar from "./Components/Sidebar";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    api.getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Sidebar count={count} carts={carts} setCarts={setCarts} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Cards
            key={product.id}
            product={product}
            setCount={setCount}
            carts={carts}
            setCarts={setCarts}
          />
        ))}
      </div>
    </>
  );
};

export default App;
