import { Search } from "lucide-react";
import FormItems from "../formItems";
import "./style.css";
import Button from "../button";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-menu">
        <nav>
          <FormItems
            placeholder={"Search results.."}
            onChange={""}
            name={""}
          ></FormItems>
          <i class="fa-solid fa-magnifying-glass"></i>
        </nav>
        <Button child={"Logout"}></Button>
      </div>
    </div>
  );
};

export default Navbar;
