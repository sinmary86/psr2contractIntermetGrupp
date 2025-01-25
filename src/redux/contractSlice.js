import { createSlice } from '@reduxjs/toolkit';
import DataSygnatory from '../assets/DataSygnatory.json';

const initialState = {
  paymentType: 'prepaid',
  contractNumber: '',
  dateProtocol: '',
  selectedSupplier: null,
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContractData(state, action) {
      const updatedData = { ...state, ...action.payload };

      // Логика определения филиала по первым буквам договора
      if (updatedData.contractNumber) {
        const prefix = updatedData.contractNumber.slice(0, 2).toUpperCase();
        let branch = 'Москва'; // Город по умолчанию

        switch (prefix) {
          case 'ВР':
            branch = 'Воронеж';
            break;
          case 'ЕК':
            branch = 'Екатеринбург';
            break;
          case 'ИЖ':
            branch = 'Ижевск';
            break;
          case 'КЗ':
            branch = 'Казань';
            break;
          case 'ЛЦ':
            branch = 'Липецк';
            break;
          case 'ТБ':
            branch = 'Тамбов';
            break;
          case 'ОР':
            branch = 'Оренбург';
            break;
          case 'ПН':
            branch = 'Пенза';
            break;
          case 'ПМ':
            branch = 'Пермь';
            break;
          case 'СП':
            branch = 'Санкт-Петербург';
            break;
          case 'РЗ':
            branch = 'Рязань';
            break;
          case 'СМ':
            branch = 'Самара';
            break;
          case 'СР':
            branch = 'Саратов';
            break;
          case 'ТЛ':
            branch = 'Тольятти';
            break;
          case 'УЛ':
            branch = 'Ульяновск';
            break;
          case 'УФ':
            branch = 'Уфа';
            break;
          case 'ЧБ':
            branch = 'Чебоксары';
            break;
          case 'НЧ':
            branch = 'Набережные Челны';
            break;
          case 'ЧЛ':
            branch = 'Челябинск';
            break;
          case 'ЯР':
            branch = 'Ярославль';
            break;
          default:
            branch = 'Москва';
            break;
        }

        // Находим подписанта по филиалу
        const supplier = DataSygnatory.find((s) => s.city === branch);
        updatedData.selectedSupplier = supplier || null;
      }

      if (updatedData.contractNumber.includes('ПП/')) {
        updatedData.paymentType = 'postpaid'; // Устанавливаем "постоплата"
      } else if (updatedData.contractNumber.includes('ПО/')) {
        updatedData.paymentType = 'prepaid'; // Устанавливаем "предоплата"
      } else {
        updatedData.paymentType = 'postpaid'; 
      }

      return updatedData;
    },
  },
});

export const { setContractData } = contractSlice.actions;
export default contractSlice.reducer;
