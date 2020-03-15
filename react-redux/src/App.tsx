import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const CmsLayout = React.lazy(() => import('./cms/CmsLayout'));
// Pages

const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));


class App extends Component{

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route path="/cms" name="CMS" component={CmsLayout} />
            <Redirect exact from="/" to="/login" />                      
          </Switch>                    
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
