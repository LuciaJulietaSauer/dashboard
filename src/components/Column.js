import { useState } from 'react';

import useCard from '../hooks/useCard';

import cardIcon from '../icons/card.svg';

import NewItem from './NewItem';
import Card from './Card';

import './Column.css';

const Column = ({ columnId, title, cards, isDragging, onDragging, onChange }) => {
  const [showNewCard, setShowNewCard] = useState(false);
  const { addCard, updateCard } = useCard();

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    const id = +e.dataTransfer.getData('cardId');
    handleDragCard(id, columnId);
    onDragging(false);
  };

  const handleAddCard = async name => {
    const { success, error } = await addCard({ columnId, name });

    if (success) {
      onChange();
    } else {
      alert(error);
    }
  };

  const handleDragCard = async (cardId, columnId) => {
    const { success, error } = await updateCard({ id: cardId, columnId });

    if (success) {
      onChange();
    } else {
      alert(error);
    }
  };

  return (
    <div className={`column ${isDragging ? 'column-dragging' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop}>
      <header>{title}</header>
      <main className='card-container'>
        {cards.map(card => (
          <Card key={card.id} {...card} isDragging={isDragging} onDragging={onDragging} onChange={onChange} />
        ))}
        <div onClick={() => setShowNewCard(show => !show)} className='new-card-icon'>
          <img src={cardIcon} alt='new card' title='new card' />
        </div>
        {showNewCard && (
          <div className='new-card'>
            <NewItem onAdd={handleAddCard} buttonText='+' placeholder='card name' />
          </div>
        )}
      </main>
    </div>
  );
};

export default Column;
