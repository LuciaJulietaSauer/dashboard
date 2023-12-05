import { serviceURL } from '../constant';

const useColumn = () => {
  const addColumn = async title => {
    try {
      const response = await fetch(`${serviceURL}/columns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
        body: JSON.stringify({ title }),
      });

      if (response?.status === 200) {
        return { success: true };
      }

      const responseJson = await response.json();
      return { success: false, error: responseJson.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { addColumn };
};

export default useColumn;
