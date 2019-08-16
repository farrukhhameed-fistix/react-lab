interface Window {
    initialReduxState: any
    store:Store<ApplicationState> 
    __REDUX_DEVTOOLS_EXTENSION__
  }

  declare module 'remote-redux-devtools'
  declare module 'react-color';