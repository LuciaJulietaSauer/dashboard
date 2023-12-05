import { useState } from 'react';
import './Column.css';

import './NewItem.css';

const NewItem = ({ onAdd, buttonText, placeholder }) => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(false);

  const handleChangeInput = e => {
    const newInput = e.target.value;
    setInputText(newInput);
    setError(!newInput);
  };

  const handleAdd = () => {
    if (inputText) {
      onAdd(inputText);
      setInputText('');
    } else {
      setError(true);
    }
  };

  return (
    <>
      <input
        className={error ? 'input-error' : 'input'}
        type='text'
        value={inputText}
        onChange={handleChangeInput}
        placeholder={placeholder}
      />
      <button className='add-button' onClick={handleAdd}>
        {buttonText}
      </button>
    </>
  );
};

export default NewItem;
