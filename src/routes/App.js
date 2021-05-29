import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Login from "../components/containers/Admin";
import Event from "../components/containers/Event";
import Categories from "../components/containers/Categories";
import Courses from "../components/containers/Courses";
import Teachers from "../components/containers/Teachers";
import Students from "../components/containers/Students";
import Trash from "../components/containers/Trash";
import TeachersAdd from "../components/containers/TeachersAdd";
import CoursesAdd from "../components/containers/CoursesAdd";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/admin" component={Login} />
      <PrivateRoute exact path="/courses" component={Courses} />
      <PrivateRoute exact path="/courses/add" component={CoursesAdd} />
      <PrivateRoute exact path="/courses/:mode/:id" component={CoursesAdd} />
      <PrivateRoute exact path="/teachers" component={Teachers} />
      <PrivateRoute exact path="/teachers/add" component={TeachersAdd} />
      <PrivateRoute exact path="/teachers/:mode/:id" component={TeachersAdd} />
      <PrivateRoute path="/categories" component={Categories} />
      <PrivateRoute path="/students" component={Students} />
      <PrivateRoute path="/trash" component={Trash} />
      <Route exact path="/event" component={Event} />
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
);

export default App;
