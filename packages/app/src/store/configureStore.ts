import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './reducers'

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== 'production'
  })

  if (process.env.NODE_ENV !== 'production') {
    // @ts-expect-error
    import.meta?.hot?.accept('./reducers', () => store.replaceReducer(rootReducers))
    // import?.meta.hot.accept
  }

  return store
}
