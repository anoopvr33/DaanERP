import "./style.css";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  readOnly,
  className,
  defualt,
  labelData,
  max,
  min,
  // disabled,
}) => {
  return (
    <label className="custom-label" htmlFor="">
      <p className="sort-label">{labelData}</p>
      <input
        // type=''
        type={type}
        // disabled
        defaultValue={defualt}
        onChange={onChange}
        value={value}
        max={max}
        min={min}
        readOnly={readOnly}
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
