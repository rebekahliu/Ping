import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger))
);

export default configureStore;

// export default function configureStore(preloadedState = {}) {
//   const store = createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger));
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers/root_reducer');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//
//   return store;
// }
