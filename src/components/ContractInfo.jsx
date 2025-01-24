import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setContractData } from '../redux/contractSlice';

const ContractInfo = ({ suppliers = [] }) => {
  const dispatch = useDispatch();

  // Чтение состояния из Redux store
  const contract = useSelector((state) => state.contract);

  // Обработчик изменений формы
  const handleChangeContract = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedSupplier') {
      const supplier = suppliers.find((s) => s.city === value);
      dispatch(
        setContractData({
          ...contract,
          selectedSupplier: supplier || null,
        })
      );
    } else {
      dispatch(
        setContractData({
          ...contract,
          [name]: value,
        })
      );
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">ДОГОВОР:</h2>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Тип оплаты:</label>
          <select
            name="paymentType"
            value={contract.paymentType}
            onChange={handleChangeContract}
            className="border rounded p-2"
          >
            <option value="prepaid">Предоплата</option>
            <option value="postpaid">Постоплата</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Договор №:</label>
          <input
            type="text"
            name="contractNumber"
            value={contract.contractNumber}
            onChange={handleChangeContract}
            className="border rounded p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Дата ПР:</label>
          <input
            type="text"
            name="dateProtocol"
            value={contract.dateProtocol}
            onChange={handleChangeContract}
            className="border rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;

