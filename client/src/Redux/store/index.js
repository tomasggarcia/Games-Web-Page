import { createStore } from 'redux';

import rootReducer from '../reducer/index.js';

const initialState = {
  game: {
    name: '',
    rating: '',
    genres: [],
    imgUrl: '',
    },
  genres: [],
  genre: '',
  page: 0,
  response: [],
  order: [],
  orderResult: [],
  pageResult:[],
  flag:1,
}


export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);