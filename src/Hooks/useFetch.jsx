import {useEffect, useState} from "react";
import {message} from "antd";
import {GetQueryString} from "./../Utilities/GetQueryString";
import {Http} from "./../Http";

const UseFetch = ({
  method,
  endpoint = "",
  query = {},
  deps = [],
  body = null,
  errorsMessage = {404: "Not found", 400: "bad request"},
  successMessage = "",
}) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    Http[method](`${endpoint}${GetQueryString(query)}`, body)
      .then((res) => {
        setResponse(res?.data);
        setIsLoading(false);
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 404)
          message.error(errorsMessage["404"]);
        else if (ex.response && ex.response.status === 400)
          message.error(errorsMessage["400"]);
        setError(ex);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return {response, isLoading, error};
};

export {UseFetch};
