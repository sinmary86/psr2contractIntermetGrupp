// import React from 'react';

// const Footer = ({ contractNumber, supplier, buyer }) => {
//   return (
//     <div className="mt-4 pt-4">

// <div className="p-6">
//       <p className="text-justify indent-8">
//       Стороны договорились изложить вышеуказанные условия договора поставки № <span className="font-semibold">{contractNumber || 'не указан'}</span> г. в согласованной редакции. Все остальные условия договора, не затронутые настоящим протоколом согласования разногласий, остаются без изменений. 
//       </p>
//       <p className="text-justify indent-8">
//     Настоящий протокол согласования разногласий составлен в 2 экземплярах,  имеющих одинаковую  юридическую  силу,  и  является неотъемлемой частью договора № <span className="font-semibold">{contractNumber || 'не указан'}</span> г., составлен в двух экземплярах, вступает в силу с момента подписания.
//       </p>
//       </div>

//       <div className="flex justify-around flex-wrap mt-4">
        
//         <div className="w-1/3">
//       <p className="mb-2">
//         Поставщик: ООО "ИнтерметГрупп"
//       </p>
//       <p className="mb-2">
//         {supplier?.position || 'не указана'}
//       </p>
//       <p className="mb-2">
//       __________________{supplier?.surname || ''}
//       </p>
//       </div>

//       <div className="w-1/3">
//       <p className="mb-2">
//         Покупатель: <span className="font-semibold">{buyer?.name || 'не указан'}</span>
//       </p>
//       <p className="mb-2">
//         {buyer?.position || 'не указан'}
//       </p>
//       <p className="mb-2">
//         __________________{buyer?.surname || 'не указан'}
//       </p>
//       </div>

//       </div>

//     </div>
//   );
// };

// export default Footer;


// components/Footer.js
import React from 'react';
import { useSelector } from 'react-redux';

const Footer = ({ buyer }) => {
  const contract = useSelector((state) => state.contract);
  const supplier = contract.selectedSupplier;

  return (
    <div className="mt-4 pt-4">
      <div className="p-6">
        <p className="text-justify indent-8">
          Стороны договорились изложить вышеуказанные условия договора поставки №{' '}
         {contract.contractNumber || 'не указан'} г. в согласованной редакции. Все остальные условия договора, не затронутые настоящим протоколом согласования разногласий, остаются без изменений.
        </p>
        <p className="text-justify indent-8">
          Настоящий протокол согласования разногласий составлен в 2 экземплярах, имеющих одинаковую юридическую силу, и является неотъемлемой частью договора №{' '}
          {contract.contractNumber || 'не указан'} г., составлен в двух экземплярах, вступает в силу с момента подписания.
        </p>
      </div>

      <div className="flex justify-around flex-wrap mt-4">
        <div className="w-1/3">
          <p className="mb-2">Поставщик: ООО "ИнтерметГрупп"</p>
          <p className="mb-2">{supplier?.position || 'не указана'}</p>
          <p className="mb-2">__________________{supplier?.surname || ''}</p>
        </div>

        <div className="w-1/3">
          <p className="mb-2">
            Покупатель: {buyer?.name || 'не указан'}
          </p>
          <p className="mb-2">{buyer?.position || 'не указан'}</p>
          <p className="mb-2">__________________{buyer?.surname || 'не указан'}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
