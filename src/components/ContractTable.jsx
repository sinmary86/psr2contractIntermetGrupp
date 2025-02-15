import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData, updateRow, removeRow, addRow } from '../redux/tableSlice';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import DataContractPunktsPP from '../assets/DataContractPunktsPP';
import DataContractPunktsPO from '../assets/DataContractPunktsPO';

const ContractTable = ({ paymentType }) => {
  const dispatch = useDispatch();

  // Получение данных таблицы из Redux store
  const rows = useSelector((state) => state.table);

  // Загрузка начальных данных таблицы при изменении типа оплаты
  useEffect(() => {
    const initialData =
      paymentType === 'postpaid' ? DataContractPunktsPP : DataContractPunktsPO;

    const enrichedRows = initialData.map((row) => ({
      ...row,
      agreedOptions: Array.isArray(row.agreedOptions)
        ? [...row.agreedOptions, 'Другое']
        : ['Другое'], // Убедимся, что agreedOptions всегда массив
      customAgreed: '', // Для пользовательского текста
      agreed: row.agreed || (row.agreedOptions && row.agreedOptions[0]) || '', // Устанавливаем первое значение
    }));

    dispatch(setTableData(enrichedRows));
  }, [paymentType, dispatch]);

  // Удаление строки
  const handleRemoveRow = (id) => {
    dispatch(removeRow(id));
  };

  // Добавление новой строки
  const handleAddRowBelow = (id) => {
    const newRow = {
      id: Date.now(),
      section: '',
      supplier: 'по тексту договора',
      supplierOptions: ['по тексту договора', 'по тексту договора отсутствует'],
      agreed: 'В редакции Покупателя', // Значение по умолчанию
      agreedOptions: ['В редакции Покупателя', 'В редакции Поставщика', 'Другое'],
      customAgreed: '',
      isEditable: true,
    };

    dispatch(addRow({ id, newRow }));
  };

  // Обновление значения поля
  const handleChange = (id, field, value) => {
    dispatch(updateRow({ id, field, value }));
  };

  // Обновление пользовательского текста для "Другое"
  const handleCustomAgreedChange = (id, value) => {
    dispatch(updateRow({ id, field: 'customAgreed', value }));
  };

  return (
    <div className="">
      <table className="w-full border-collapse border">
        <TableHeader />
        <tbody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              onChange={handleChange}
              onCustomAgreedChange={handleCustomAgreedChange}
              onRemove={handleRemoveRow}
              onAdd={handleAddRowBelow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;


