import { Store, createStore, applyMiddleware } from 'redux'
import { ApplicationState, rootReducer } from './store';

//import { connectRouter, routerMiddleware } from 'connected-react-router'
//import { composeWithDevTools } from 'redux-devtools-extension'
//import { History } from 'history'
//import {ApplicationState} from './store/ApplicationState'
//import { rootReducer } from './store/RootReducer';

export default function configureStore(  
  initialState: ApplicationState
): Store<ApplicationState> {
  // create the composing function for our middlewares
  // const composeEnhancers = composeWithDevTools({})
  // create the redux-saga middleware
  //const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store
}