import React from 'react';

const Header = ( { contractNumber, dateProtocol } ) => {
  
  return (
    <header className="text-center py-4">
      <h3 className="font-bold">ПРОТОКОЛ СОГЛАСОВАНИЯ РАЗНОГЛАСИЙ</h3>
      <h3>к договору поставки № {contractNumber || 'не указан'}</h3>
      <h3>и к протоколу разногласий Покупателя от {dateProtocol || 'не указана'}</h3>
    </header>
  );
};

export default Header;