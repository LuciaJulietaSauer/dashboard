import { useEffect, useState } from 'react';

import { serviceURL } from '../constant';

const useGetData = isChange => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState({ hasError: false, message: null });

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serviceURL}/columns`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
      });

      const responseJson = await response.json();

      if (response.status !== 200) {
        setError({ hasError: true, error: responseJson.message });
      }

      setData(responseJson);
      setLoading(false);
    } catch (error) {
      setError({ hasError: true, error });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isChange) {
      getData();
    }
  }, [isChange]);

  return { data, loading, error };
};

export default useGetData;
