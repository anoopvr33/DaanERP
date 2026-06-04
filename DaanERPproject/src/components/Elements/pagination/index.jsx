import { useMemo } from "react";

const rowsPerPage = 30;

export const Pageination = (FilterData, page) => {
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return FilterData?.slice(start, start + rowsPerPage);
  }, [FilterData, page]);
  const totalPages = Math.ceil(FilterData?.length / rowsPerPage);

  return { paginatedData, totalPages };
};
