import { Search } from "lucide-react";
import FormItems from "../formItems";
import "./style.css";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { searchInput } from "../../../redux/SearchSlice";

const Navbar = ({ placeholder }) => {
  const dispatch = useDispatch();

  const { inputValue } = useSelector((state) => state.search);

  const onChange = (e) => {
    dispatch(searchInput(e.target.value));
  };

  return (
    <div className="navbar">
      <img src="/logo.png " alt="" />{" "}
      <div className="nav-menu">
        <nav>
          <FormItems
            placeholder={placeholder || "Search here..."}
            onChange={onChange}
            name={""}
            value={inputValue}
          ></FormItems>
          <i class="fa-solid fa-magnifying-glass"></i>
        </nav>
        {/* <Button child={"Logout"}></Button> */}
      </div>
    </div>
  );
};

export default Navbar;
