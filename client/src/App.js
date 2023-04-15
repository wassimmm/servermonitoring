import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AddServer from "./components/dashboard/AddServer.js";
import Server from "./components/dashboard/Server.js";
import CpuServer from "./components/dashboard/cpuserver.js";
import Startbutton from "./components/dashboard/Startbuttonserver.js";
import FirewallServer from "./components/dashboard/firewallserver.js";
import Networkserver from "./components/dashboard/Networkserver.js";
import Bandwidthserver from "./components/dashboard/Bandwidthserver.js";
import RequestServer from "./components/dashboard/Requestserver.js";
import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to log in
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/addServer" component={AddServer} />
              <PrivateRoute exact path="/server/:id" component={Server} />
              <PrivateRoute exact path="/cpu/:id" component ={CpuServer}/>
              <PrivateRoute exact path="/network/:id" component ={Networkserver}/>
              <PrivateRoute exact path="/firewall/:id" component ={FirewallServer}/>
              <PrivateRoute exact path="/request/:id" component ={RequestServer}/>
              <PrivateRoute exact path="/bandwidth/:id" component ={Bandwidthserver}/>
              {/* <PrivateRoute exact path="/button/:id" component ={Startbutton}/> */}
              
              
            </Switch>
              

          </div>
     
        
        </Router>
      </Provider>
    ;
  }
}
export default App;