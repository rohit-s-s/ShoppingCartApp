import { useEffect } from "react";
import { Product } from "../types/util";
import { Button } from "./Button";

type CardType = {
  product: Product;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  carts: Product[];
  setCarts: React.Dispatch<React.SetStateAction<Product[]>>;
};
export const Cards = ({ product, setCount, carts, setCarts }: CardType) => {
  const addCart = (item: Product) => {
    const isItemInCart = carts.some((cart) => cart.id === item.id);
    setCarts((prev) => {
      const updatedCart = isItemInCart
        ? prev.map((cart) =>
            cart.id === item.id
              ? { ...cart, quantity: cart.quantity + 1 }
              : cart
          )
        : [...prev, { ...item, quantity: 1 }];
      return updatedCart;
    });
  };

  useEffect(() => {
    setCount(carts.reduce((total, cart) => total + cart.quantity, 0));
  }, [carts, setCount]);

  return (
    <div className="mt-10">
      <div className="p-5 h-full">
        <div className="flex flex-col justify-between max-w-lg h-full rounded overflow-hidden shadow-lg">
          <div>
            <img
              className="w-full h-52 object-cover"
              src={product.image}
              alt={product.title}
            />
            <div className="px-6 py-4  text-start">
              <div className="font-bold text-base mb-2">{product.title}</div>
              <p className="text-gray-700 text-xs">{product.description}</p>
              <p className="font-bold">${product.price}</p>
            </div>
          </div>
          <Button
            className="font-bold uppercase"
            handleClick={() => {
              addCart(product);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
