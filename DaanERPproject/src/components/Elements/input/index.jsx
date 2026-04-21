import "./style.css";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className,
  defualt,
}) => {
  return (
    <input
      // type=''
      type={type}
      defaultValue={defualt}
      onChange={onChange}
      value={value}
      // onClick={onClick}
      className={`custom-inp ${className}`}
      placeholder={placeholder}
      name={name}
      id=""
    />
  );
};

export default Input;
