import React, { Component } from 'react';
import Description from './Description'
import './Style.css';
import { BrowserRouter, Route} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard"
import Register from "./Register"

class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <switch>
                <Route exact path="/" component={Description}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Register" component={Register}/>
                <Route path="/Dashboard" component={Dashboard}/>
                </switch>
            </BrowserRouter>
        );
    }
}

export default Home;
