import { serviceURL } from '../constant';

const useCard = () => {
  const addCard = async newCard => {
    try {
      const response = await fetch(`${serviceURL}/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
        body: JSON.stringify(newCard),
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

  const updateCard = async card => {
    try {
      const response = await fetch(`${serviceURL}/card/${card.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
        body: JSON.stringify(card),
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

  const deleteCard = async cardId => {
    try {
      const response = await fetch(`${serviceURL}/card/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
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

  return { addCard, updateCard, deleteCard };
};

export default useCard;
