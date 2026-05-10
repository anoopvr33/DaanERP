import { Search } from "lucide-react";
import FormItems from "../formItems";
import "./style.css";
import Button from "../button";
import { useDispatch } from "react-redux";
import { searchInput } from "../../../redux/SearchSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(searchInput(e.target.value));
  };

  return (
    <div className="navbar">
      <div className="nav-menu">
        <nav>
          <FormItems
            placeholder={"Search results.."}
            onChange={onChange}
            name={""}
          ></FormItems>
          <i class="fa-solid fa-magnifying-glass"></i>
        </nav>
        {/* <Button child={"Logout"}></Button> */}
      </div>
    </div>
  );
};

export default Navbar;
