import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createRootReducer from './reducers'

const rootReducer = createRootReducer()

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(logger))
}
