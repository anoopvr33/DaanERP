import { useEffect, useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
import AccountsVendor from "../../accoutsTable/vendor";
import Button from "../../Elements/button";
import { get_vendor_thunk } from "../../../redux/vendorSlice";
import { useDispatch, useSelector } from "react-redux";

const AccVendor = ({ dateset, trigger, prevMonth, hotels }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(
      get_vendor_thunk({
        from_date: prevMonth,
        to_date: dateset,
        hotel: hotels,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  return (
    <div>
      <div className="flex-1">
        <p>
          <br />
          <b>Date : </b> {dateset}
        </p>
        <Button
          onClick={() => setOpen(!open)}
          className={"add-dailylog"}
          child={"New Vendor +"}
        ></Button>
      </div>
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <br />
      <AccountsVendor vendor={items}></AccountsVendor>
    </div>
  );
};

export default AccVendor;
