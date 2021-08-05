import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducers from './reducers'

export default function configureAppStore(preloadedState?: PreloadedState<typeof rootReducers>) {
  const store = configureStore({
    reducer: rootReducers,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV === 'development') {
        return getDefaultMiddleware().concat(logger)
      }
      return getDefaultMiddleware()
    },
    devTools: process.env.NODE_ENV !== 'production'
  })

  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    import.meta?.hot?.accept('./reducers', () => store.replaceReducer(rootReducers))
  }

  return store
}
