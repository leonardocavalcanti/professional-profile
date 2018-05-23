import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './store/reducers'

const loggerMiddleware = createLogger()

const DEBUG = process.env.NODE_ENV === 'development';

const middleware = [
  thunkMiddleware,
  DEBUG && loggerMiddleware,
].filter(Boolean);

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  )
}