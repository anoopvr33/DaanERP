import "./style.css";

const Button = ({ child, onClick, className, type }) => {
  return (
    <button type={type} className={`custom-btn ${className}`} onClick={onClick}>
      {child}
    </button>
  );
};

// Button.propTypes = { child: string, onClick: object };

export default Button;
