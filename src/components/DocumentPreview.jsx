import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';


const DocumentPreview = () => {
  // Чтение данных из Redux store
  const contract = useSelector((state) => state.contract);
  const buyer = useSelector((state) => state.buyer);
  const tableData = useSelector((state) => state.table);

  return (
    <div className="p-4">

    <div id="document-content" className="hidden-section">
     
      <Header
        contractNumber={contract.contractNumber}
        dateProtocol={contract.dateProtocol}
      />

    
      <div className="flex justify-between flex-wrap mb-4">
        <h3>г. Москва</h3>
        <h3>{contract?.dateProtocol || 'не указана'}</h3>
      </div>

      
      <div className="mb-4">
        <h3 className="font-bold">Поставщик: ООО "ИнтерметГрупп"</h3>
        <h3 className="font-bold">Покупатель: {buyer?.name || 'не указан'}</h3>
      </div>

     
      <table className="w-full border-collapse border mb-4">
        <thead>
          <tr>
            <th className="border p-2">№ пункта</th>
            <th className="border p-2">Редакция Поставщика</th>
            <th className="border p-2">Редакция Покупателя</th>
            <th className="border p-2">Согласованная редакция</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{row.section || '-'}</td>
                <td className="border p-2">{row.supplier || 'по тексту договора'}</td>
                <td className="border p-2">по тексту протокола разногласий</td>
                <td className="border p-2">{row.customAgreed || row.agreed || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="4">
                Данные отсутствуют
              </td>
            </tr>
          )}
        </tbody>
      </table>

      
      <Footer
        contractNumber={contract.contractNumber}
        supplier={contract.selectedSupplier}
        buyer={buyer}
      />
    </div>

</div>


  );
};

export default DocumentPreview;