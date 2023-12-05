import { useState } from 'react';
import Popup from 'reactjs-popup';

import useCard from '../hooks/useCard';

import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';

import 'reactjs-popup/dist/index.css';
import './ModalCard.css';

const convertToTwoDigits = num => num.toString().padStart(2, '0');

const formatDate = date =>
  `${convertToTwoDigits(date.getDate())}/${convertToTwoDigits(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${convertToTwoDigits(date.getHours())}:${convertToTwoDigits(
    date.getMinutes()
  )}:${convertToTwoDigits(date.getSeconds())}`;

const ModalCard = ({ id, open, handleOnClose, name, description, creationDate, onChange }) => {
  const [inputName, setInputName] = useState(name);
  const [errorName, setErrorName] = useState(false);
  const [inputDescription, setInputDescription] = useState(description || '');

  const { updateCard, deleteCard } = useCard();

  const handleDelete = async () => {
    const { success, error } = await deleteCard(id);
    if (success) {
      onChange();
    } else {
      alert(error);
    }
  };

  const handleUpdate = async (name, description) => {
    const { success, error } = await updateCard({ id, name, description });

    if (success) {
      onChange();
    } else {
      alert(error);
    }
  };

  const handleChangeName = e => {
    const newInput = e.target.value;
    setInputName(newInput);
    setErrorName(!newInput);
  };

  const handleChangeDescription = e => {
    const newInput = e.target.value;
    setInputDescription(newInput);
  };

  const handleOnUpdate = () => {
    if (!errorName) {
      handleUpdate(inputName, inputDescription);
    }
  };

  return (
    <Popup open={open} onClose={handleOnClose} position='right center'>
      <div className='modal'>
        <div className='data-content'>
          <p>Name: </p>
          <input
            className={errorName ? 'input-error' : 'input'}
            type='text'
            value={inputName}
            onChange={handleChangeName}
          />
          <p>Description: </p>
          <input className='input' type='text' value={inputDescription} onChange={handleChangeDescription} />
          <p>Date of creation</p>
          <p>{formatDate(new Date(creationDate))}</p>
        </div>
        <div className='buttons-content'>
          <div onClick={handleOnUpdate} className='action-icon'>
            <img src={editIcon} alt='edit' title='edit' />
          </div>
          <div onClick={handleDelete} className='action-icon'>
            <img src={deleteIcon} alt='delete' title='delete' />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default ModalCard;
