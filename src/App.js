import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './Components/Navbar';
import dashboard from './pages/dashboard';
import CreateParty from './pages/createParty';
import  Kyc  from './pages/kyc';
import AddBank from './pages/AddBank';
import ShowBank from './pages/ShowBank';
import profile from './pages/Profile';
import PartyDetail from './pages/PartyDetail';
import ShowParty from './pages/ShowParty';
import { setAuthToken } from './Utils/setAuthToken';
import Alerted from './Components/Alerted';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PrivateRoute from './Utils/PrivateRoute';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Kumbh Sans',
      'Prompt'].join(','),
  }
});

if(localStorage.token){
  setAuthToken(localStorage.token);
}


const  App = () => {
  
  useEffect( () => {
    store.dispatch(loadUser());
  },[]);

 
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Alerted />
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signup' component={signup} />
              <PrivateRoute exact path='/dashboard' component={dashboard}/>
              <PrivateRoute exact path='/createParty' component={CreateParty}/>
              <PrivateRoute exact path='/kyc' component={Kyc}/>
              <PrivateRoute exact path='/addBank' component={AddBank}/>
              <PrivateRoute exact path='/showBank' component={ShowBank}/>
              <PrivateRoute exact path='/profile' component={profile}/>
              <PrivateRoute exact path='/showParty/:category' component={ShowParty}/>
              <PrivateRoute exact path='/showParty/party/:partyId' component={PartyDetail}/>
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    </Provider>
    
  );
}

export default App;
