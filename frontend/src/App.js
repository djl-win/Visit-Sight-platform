import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
       <Route path="/" component={Admin} />
      </Switch>
      <ToastContainer/>
    </Router>
    

  );
}

export default App;
