import { useMemo } from "react";

export const SearchFilter = (items, inputValue, status) => {
  const FilterData = useMemo(() => {
    return items?.data?.filter((i) => {
      const searchMatch =
        !inputValue ||
        i.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
        i.booking_id?.toLowerCase().includes(inputValue.toLowerCase()) ||
        i.phone?.toLowerCase().includes(inputValue.toLowerCase());
      const statusMatch =
        !status || i.tag_status?.toLowerCase().includes(status?.toLowerCase());

      return searchMatch && statusMatch;
    });
  }, [items, inputValue, status]);

  return { FilterData };
};
