import { useEffect } from "react";
import { Product } from "../types/util";
import { Button } from "./Button";

type OrderCard = {
  carts: Product[];
  setCarts: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export const OrderCard = ({ setTotal, setCarts, carts }: OrderCard) => {
  const Decrement = (id: number, quantity: number): void => {
    if (quantity === 1) {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
    } else {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === id
            ? { ...cart, quantity: Math.max(0, cart.quantity - 1) }
            : cart
        )
      );
    }

    setTotal(
      carts.reduce(
        (acc, cart) => Math.round(acc + cart.quantity * cart.price),
        0
      )
    );
  };
  const Increment = (id: number): void => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
      )
    );

    setTotal(
      carts.reduce(
        (acc, cart) => Math.round(acc + cart.quantity * cart.price),
        0
      )
    );
  };

  useEffect(() => {
    setTotal(
      carts.reduce(
        (acc, cart) => Math.round(acc + cart.quantity * cart.price),
        0
      )
    );
  }, [carts, setTotal]);

  return (
    <>
      {carts.map((cart) => (
        <div key={cart.id} className="px-10 pb-10">
          <div className=" w-full lg:max-w-full lg:flex">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: `url(${cart.image})` }}
              title="Mountain"
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div>
                <div className="text-gray-900 font-bold text-base text-left mb-2">
                  {cart.title}
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700 text-xs text-left">
                    Price : ${Math.round(cart.price)}
                  </p>
                  <p className="text-gray-700 text-xs text-left">
                    Total : ${Math.round(cart.price * cart.quantity)}
                  </p>
                </div>
                <div className="flex justify-between pt-2">
                  <Button
                    handleClick={() => Decrement(cart.id, cart.quantity)}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow"
                  >
                    -
                  </Button>
                  <p>{cart.quantity}</p>
                  <Button
                    handleClick={() => Increment(cart.id)}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
