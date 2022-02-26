import React, { useState, useEffect } from "react";

function useFetchData(initialData, fetchMethod, fetchMethodParams) {
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await fetchMethod(fetchMethodParams);
      setData(resp);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [data, fetchMethod, isLoading, error];
}

export default useFetchData;
