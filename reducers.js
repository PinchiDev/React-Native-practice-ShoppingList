import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for React Native
import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  SET_FILTER,
  CLEAR_COMPLETED
} from './actionTypes';

const initialState = {
  items: [],
  filter: 'All'
};

function shoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false
          }
        ]
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    case TOGGLE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, completed: !item.completed }
            : item
        )
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        items: state.items.filter(item => !item.completed)
      };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'shoppingList',
  storage: storage,
  whitelist: ['items']
};

const persistedReducer = persistReducer(persistConfig, shoppingListReducer);

export default combineReducers({
  shoppingList: persistedReducer
});