import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBuyerData } from '../redux/buyerSlice';

const BuyerInfo = () => {
  const dispatch = useDispatch();

  // Чтение состояния покупателя из Redux store
  const buyer = useSelector((state) => state.buyer);

  // Обработчик изменений формы
  const handleChangeBuyer = (e) => {
    const { name, value } = e.target;

    // Обновляем состояние через Redux
    dispatch(
      setBuyerData({
        ...buyer,
        [name]: value,
      })
    );
  };

  return (
    <div className="border p-4 rounded mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">ПОКУПАТЕЛЬ:</h2>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Наименование:</label>
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChangeBuyer}
            className="border rounded p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Должность подписанта:</label>
          <input
            type="text"
            name="position"
            value={buyer.position}
            onChange={handleChangeBuyer}
            className="border rounded p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">ФИО подписанта:</label>
          <input
            type="text"
            name="surname"
            value={buyer.surname}
            onChange={handleChangeBuyer}
            className="border rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerInfo;