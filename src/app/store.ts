import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';

const rootReducer = combineReducers({
  filter: filterReducer,
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
