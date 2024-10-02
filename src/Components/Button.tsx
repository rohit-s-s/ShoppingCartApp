type Button = {
  handleClick: () => void;
  children: string;
  className: string;
};

export const Button = ({ handleClick, children, className }: Button) => {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
