import "./style.css";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className,
  defualt,
  labelData,
}) => {
  return (
    <label className="custom-label" htmlFor="">
      <p>{labelData}</p>
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
    </label>
  );
};

export default Input;
