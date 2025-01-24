import React from 'react';
import { useSelector } from 'react-redux';
import ContractTable from './components/ContractTable';
import dataSygnatory from './assets/DataSygnatory.json';
import BuyerInfo from './components/BuyerInfo';
import ContractInfo from './components/ContractInfo';
import DocumentPreview from './components/DocumentPreview.jsx';
import Additionaly from './components/Additionally.jsx';
import DownloadButton from './components/DownloadButton.jsx';


const App = () => {
 
  // Чтение данных из Redux store
  const contract = useSelector((state) => state.contract);
  const buyer = useSelector((state) => state.buyer);
  const tableData = useSelector((state) => state.table);

  return (
    <div>
      
      <h1 className="text-center text-2xl font-bold mb-4">
        ПРОТОКОЛ СОГЛАСОВАНИЯ РАЗНОГЛАСИЙ
      </h1>

      <BuyerInfo />

      <ContractInfo suppliers={dataSygnatory} />

        <div className="flex justify-between">
      <div className="w-3/4">
      <ContractTable paymentType={contract.paymentType} />

      <DownloadButton
        tableData={tableData}
        contract={contract}
        supplier={contract?.selectedSupplier}
        buyer={buyer}
      />
      </div>
    
      <div className="w-1/4">
      <Additionaly />
      </div>
        </div>
    
    <DocumentPreview />

</div>
  );
};

export default App;
