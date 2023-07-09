import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Header from "../Components/Header/Header";
import CreateTask from "../Pages/CreateTask/CreateTask";
import AllTasks from "../Pages/TasksController/AllTasks";
import TaskPage from "../Pages/TasksController/TaskPage";
import EditTask from "./../Pages/TasksController/EditTask";
import Portfolio from "../Pages/Groups/GetAllGroups";

const RouterController = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Create-Task" element={<CreateTask />}></Route>
        <Route path="/All-Tasks" element={<AllTasks />}></Route>
        <Route path="/Task/:TaskId" element={<TaskPage />}></Route>
        <Route path="/Edit-Task/:TaskId" element={<EditTask />}></Route>
        <Route path="/Portfolio" element={<Portfolio />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default RouterController;
