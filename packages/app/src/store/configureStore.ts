import { createStore, Store } from 'redux'
import { createLogger } from 'redux-logger'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (obj: Record<string, any>) => Function
  }

  interface NodeModule {
    hot?: {
      accept: (path: string, cb: () => void) => void
    }
  }
}

export default function configureStore(initialState: any) {
  const middleware = []
  const enhancers = []
  let store: Store

  if (process.env.NODE === 'development') {
    // Loggin middleware
    const logger = createLogger({
      level: 'info',
      collapsed: true
    })
    middleware.push(logger)

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
      // actionCreators
    })
    enhancers.push(composeEnhancers)
    const enhancer = composeEnhancers(...enhancers)

    store = createStore(rootReducer, initialState, enhancer)

    module?.hot?.accept('../reducers', () => store.replaceReducer(require('./reducers').default))
  } else {
    store = createStore()
  }

  return store
}
