import { serviceURL } from '../constant';

const useSettings = () => {
  const getSetting = async code => {
    try {
      const response = await fetch(`${serviceURL}/settings/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
      });

      const responseJson = await response.json();

      if (response.status !== 200) {
        return { success: false, error: responseJson.message };
      }

      return { success: true, data: responseJson };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateSetting = async setting => {
    try {
      const response = await fetch(`${serviceURL}/settings/${setting.code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
        body: JSON.stringify({ value: setting.value }),
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

  return { getSetting, updateSetting };
};

export default useSettings;
