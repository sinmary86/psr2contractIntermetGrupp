import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const TableRow = ({
  row,
  onChange,
  onCustomAgreedChange,
  onRemove,
  onAdd,
}) => {
  return (
    <tr>
      {/* Столбец "№ пункта" */}
      <td className="border p-2 text-center">
        {row.isEditable ? (
          <input
            type="text"
            value={row.section}
            onChange={(e) => onChange(row.id, 'section', e.target.value)}
            className="border rounded p-1 w-full"
          />
        ) : (
          <span>{row.section}</span>
        )}
      </td>

      {/* Столбец "Редакция Поставщика" */}
      <td className="border p-2">
        {row.isEditable ? (
          <select
            value={row.supplier}
            onChange={(e) => onChange(row.id, 'supplier', e.target.value)}
            className="border rounded p-1 w-full"
          >
            {row.supplierOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <span>по тексту договора</span>
        )}
      </td>

       {/* Столбец "Редакция Покупателя" */}
       <td className="border p-2">по тексту протокола разногласий</td>

      {/* Столбец "Согласованная редакция" */}
      <td className="border p-2">
        <select
          value={row.agreed}
          onChange={(e) => onChange(row.id, 'agreed', e.target.value)}
          className="border rounded p-1 w-full"
        >
          {row.agreedOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {row.agreed === 'Другое' && (
          <input
            type="text"
            value={row.customAgreed}
            onChange={(e) => onCustomAgreedChange(row.id, e.target.value)}
            placeholder="Введите текст"
            className="border rounded p-1 w-full mt-2"
          />
        )}
      </td>

      {/* Столбец "Действия" */}
      <td className="border p-2 text-center">
        <button
          onClick={() => onRemove(row.id)}
          className="bg-red-500 text-white p-1 rounded mr-2"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          onClick={() => onAdd(row.id)}
          className="bg-blue-500 text-white p-1 rounded"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
