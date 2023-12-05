import { useEffect, useState } from 'react';

import useGetData from './hooks/useGetData';

import NewColumn from './components/NewColumn';
import Column from './components/Column';
import Order from './components/Order';

import './Dashboard.css';

const Dashboard = () => {
  const [isChange, setIsChange] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const { data, loading, error } = useGetData(isChange);

  useEffect(() => {
    if (!loading) {
      setIsChange(false);
    }
  }, [loading]);

  const handleDragging = dragging => setIsDragging(dragging);

  const handleChangeData = () => setIsChange(true);

  const MainContent = () => {
    if (loading) {
      return <div>Loading</div>;
    }

    if (error.hasError) {
      return <div>{error.message}</div>;
    }

    return data.map(column => (
      <Column
        columnId={column.id}
        key={column.id}
        title={column.title}
        cards={column.cards}
        isDragging={isDragging}
        onDragging={handleDragging}
        onChange={handleChangeData}
      />
    ));
  };

  return (
    <div className='app'>
      <header>
        <h1>Kanban Dashboard</h1>
      </header>
      <div className='action-bar'>
        <NewColumn onAdd={handleChangeData} />
        <Order onChangeOrder={handleChangeData} />
      </div>
      <main className='column-container'>
        <MainContent />
      </main>
    </div>
  );
};

export default Dashboard;
