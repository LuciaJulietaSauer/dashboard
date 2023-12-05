import { useState, useEffect } from 'react';

import useSettings from '../hooks/useSettings';

import './Order.css';

const OrderOptions = {
  creationDate: 'creationDate',
  name: 'name',
};

const codeSetting = 'cardOrder';

const Order = ({ onChangeOrder }) => {
  const [selectedOption, setSelectedOption] = useState();
  const { getSetting, updateSetting } = useSettings();

  const searchOrderSetting = async () => {
    const { success, data, error } = await getSetting(codeSetting);

    if (success) {
      setSelectedOption(data.value);
    }

    if (success) {
      onChangeOrder();
    } else {
      alert(error);
    }
  };

  useEffect(() => {
    if (!selectedOption) {
      searchOrderSetting();
    }
  }, []);

  const onValueChange = async event => {
    const { success, error } = await updateSetting({ code: codeSetting, value: event.target.value });

    if (success) {
      setSelectedOption(event.target.value);
      onChangeOrder();
    } else {
      alert(error);
    }
  };

  return (
    <div className='order-options'>
      <p>Order by:</p>
      <input
        type='radio'
        value={OrderOptions.creationDate}
        name='orderOptions'
        checked={selectedOption === OrderOptions.creationDate}
        onChange={onValueChange}
      />
      Date of creation
      <input
        type='radio'
        value={OrderOptions.name}
        name='orderOptions'
        checked={selectedOption === OrderOptions.name}
        onChange={onValueChange}
      />
      Name
    </div>
  );
};

export default Order;
