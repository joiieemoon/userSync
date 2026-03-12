const Eyebtn = ({
  onClick,
  icon,
  className = "",
  ...rest
}: {
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    {...rest}
    className={`border mt-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none ${className}`}
  >
    {icon}
  </button>
);

export default Eyebtn;
