import { useState } from 'react';

import ModalCard from './ModalCard';

import 'reactjs-popup/dist/index.css';
import './Card.css';

const Card = ({ id, name, description, creationDate, onDragging, onChange }) => {
  const [visible, setVisible] = useState(false);

  const handleDragStart = e => {
    e.dataTransfer.setData('cardId', `${id}`);
    onDragging(true);
  };

  const handleDragEnd = () => onDragging(false);

  const handleOnClose = () => setVisible(false);

  const handleOpenModal = () => setVisible(o => !o);

  return (
    <div draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className='card' onClick={handleOpenModal}>
      <div className='heading-card'>
        <h5>{name}</h5>
      </div>
      <ModalCard
        id={id}
        open={visible}
        onClose={handleOnClose}
        name={name}
        description={description}
        creationDate={creationDate}
        onChange={onChange}
      />
    </div>
  );
};

export default Card;
