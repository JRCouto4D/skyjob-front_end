import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'skyjob',
      storage,
      whitelist: ['auth', 'user', 'statusPDV', 'saleData'],
    },
    reducers
  );
  return persistedReducer;
};
