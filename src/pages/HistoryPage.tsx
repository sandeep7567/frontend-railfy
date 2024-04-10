import LayoutHOC from "@/components/layout/LayoutHOC";
import { TodoListing } from "./TodoListing";
import { useNavigate, useParams } from "react-router-dom";
import { isValidObjectId } from "@/lib/utils";
import { useEffect, useState } from "react";

import { QUERY } from "@/constant/constant";
import { useGetAllHistoryByTaskIdQuery } from "@/redux/api/historySlice";
import NotFound from "@/pages/NotFound"; 
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const isValidId = isValidObjectId(id as string);
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: QUERY.PAGE_INDEX,
    pageSize: QUERY.PAGE_SIZE,
  });

  const [sort, setSort] = useState({
    field: QUERY.SORT_FIELD.CREATED_AT,
    order: QUERY.SORT_ORDER.ASC,
  });

  if (!isValidId) {
    return <NotFound />
  };

  const { history, pageInfo } = useSelector((state: RootState) => state.history);

  const {
    isFetching,
    isLoading,
    isError: isGetHistoryError,
  } = useGetAllHistoryByTaskIdQuery(
    {
      taskId: id as string,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      field: sort.field,
      order: sort.order,
    },
    { refetchOnMountOrArgChange: true }
  );

  console.log(isGetHistoryError);
  useEffect(() => {
    if (isGetHistoryError) {
      navigate("/task");
    }
  }, []);
  

  return (
    <>
      <TodoListing
        isHistory={true}
        isFetching={isFetching}
        isLoading={isLoading}
        pageInfo={pageInfo}
        pagination={pagination}
        setPagination={setPagination}
        setSort={setSort}
        task={history}
      />
    </>
  );
};

export default LayoutHOC(HistoryPage);
