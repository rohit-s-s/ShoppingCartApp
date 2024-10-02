import { useState } from "react";
import { Header } from "./Header";
import { OrderCard } from "./OrderCard";
import { Product } from "../types/util";

type Sidebar = {
  count: number;
  carts: Product[];
  setCarts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Sidebar = ({ count, carts, setCarts }: Sidebar) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="text-center">
      {/* Header */}
      <Header toggleDrawer={toggleDrawer} count={count} />

      {/* Drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 md:w-[400px] sm:w-full h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-neutral-700`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-white"
        >
          Your Shopping Cart
        </h5>
        <button
          type="button"
          onClick={closeDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <OrderCard carts={carts} setTotal={setTotal} setCarts={setCarts} />
          <p className="text-left text-white text-base font-bold">
            Total Amount ${total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
