import Http from "Http";
import {GetQueryString} from "./GetQueryString";
import {message} from "antd";

export const handleAntdTablePagination = (
  apiEndPoint,
  filters,
  setDataSource,
  setPagination,
  pagination
) => {
  Http.get(`${apiEndPoint}${GetQueryString(filters)}`)
    .then((res) => {
      setDataSource(res?.data?.data);
      setPagination({
        pageSize: pagination.pageSize,
        current: pagination.current,
        total: res?.data?.totalRecords,
      });
    })
    .catch((err) => message.error("Something went, please try again"));
};
