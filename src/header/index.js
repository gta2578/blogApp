import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../privateroute";
import Home from "../pages/home";
import Posts from "../pages/posts";
import Users from "../pages/users";
import Services from "../pages/services";
import SignUp from "./signUp";
import Login from "./logIn";

import './style.sass'



function Header() {

    return (
        <div className='header'>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/posts" component={Posts} />
                    <PrivateRoute exact path="/users" component={Users} />
                    <PrivateRoute exact path="/services" component={Services} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/signin" component={Login} />
                </Switch>
        </div>
    )
}

export default Header;