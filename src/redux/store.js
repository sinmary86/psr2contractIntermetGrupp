import { configureStore } from '@reduxjs/toolkit';
import contractReducer from './contractSlice';
import buyerReducer from './buyerSlice';
import tableReducer from './tableSlice';


const store = configureStore({
  reducer: {
    contract: contractReducer,
    buyer: buyerReducer,
    table: tableReducer,
  },
});

export default store;
