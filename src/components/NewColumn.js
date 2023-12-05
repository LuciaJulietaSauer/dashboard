import { useState } from 'react';

import useColumn from '../hooks/useColumn';

import NewItem from './NewItem';

import addIcon from '../icons/add-circle.svg';
import './NewColumn.css';

const NewColumn = ({ onAdd }) => {
  const [showInput, setShowInput] = useState(false);
  const { addColumn } = useColumn();

  const handleAdd = async title => {
    const { success, error } = await addColumn(title);

    if (success) {
      setShowInput(false);
      onAdd();
    } else {
      alert(error);
    }
  };

  return (
    <div className='add-column'>
      <header onClick={() => setShowInput(show => !show)}>
        <img src={addIcon} className='add-icon' alt='add column' title='add column' />
      </header>
      {showInput && <NewItem onAdd={handleAdd} buttonText='Add' placeholder='column title' />}
    </div>
  );
};

export default NewColumn;
