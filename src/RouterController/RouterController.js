import React from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Header from "../Components/Header/Header";
import CreateTask from "../Pages/CreateTask/CreateTask";
import AllTasks from "../Pages/TasksController/AllTasks";
import TaskPage from "../Pages/TasksController/TaskPage";
import EditTask from "./../Pages/TasksController/EditTask";
import GetAllProjects from "./../Pages/Projects/GetAllProjects";

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
        <Route path="/Projects" element={<GetAllProjects />}></Route>
        <Route
          path="*"
          element={
            <div className="text-center m-5">
              <h1 className="p-2">Page Not Found</h1>
              <Link to="/">Go To Home Page</Link>
            </div>
          }
        ></Route>
      </Routes>
    </HashRouter>
  );
};

export default RouterController;
