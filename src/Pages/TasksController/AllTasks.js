import React, { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../../AppData/App.Data";
import "./All-Tasks-style.css";
import { useNavigate } from "react-router-dom";
import { SaveData } from "../../ServicesApp/DataController";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
const AllTasks = () => {
  let { Data } = useContext(AppDataContext);
  let [AllTasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(Data.Tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AllTasks]);
  let navigate = useNavigate();
  const GoToDetailsTask = (TaskId) => {
    navigate(`/Task/${TaskId}`);
  };
  let DeleteTask = (task) => {
    AllTasks.filter((Task, index) => {
      if (Task.TaskId == task.TaskId) {
        AllTasks.splice(index, 1);
      }
    });
    console.log(Data);
    SaveData({
      SaveAs: Data["KeyData"],
      Data: AllTasks,
    });
    toast.success(`This Task ${task.TaskTitle} Is Deleted SuccessFul!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/All-Tasks");
  };
  return (
    <section id="AllTasks" className="pb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center pt-3">
            <h2>All Task</h2>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-12">
            <hr />
            {AllTasks.length !== 0 ? (
              <div className="AllTasksShow">
                {AllTasks.map((Task) => {
                  return (
                    <div className="Task mb-2" key={Task.TaskId}>
                      <div className="header d-flex w-100 align-items-center justify-content-between">
                        <h3 className="Title">{Task.TaskTitle}</h3>
                        <div className="buttons-controllers">
                          <Tooltip
                            title={`Delete This Task Name: ${Task.TaskTitle}`}
                          >
                            <button
                              className="delete btn btn-danger ms-1"
                              onClick={() => {
                                DeleteTask(Task);
                              }}
                            >
                              <Delete></Delete>
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                      {/* <h3 className="Title">{Task.TaskTitle}</h3> */}
                      <div className="TaskItems mt-3 mb-3">
                        <label className="form-label mb-1">Task Items</label>
                        <ol className="list-group">
                          {Task.TaskItems.length < 3
                            ? Task.TaskItems.map((TaskItem) => {
                                return (
                                  <li
                                    key={TaskItem.id}
                                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span>{TaskItem.Text}</span>
                                  </li>
                                );
                              })
                            : Task.TaskItems.slice(0, 3).map((TaskItem) => {
                                return (
                                  <li
                                    key={TaskItem.id}
                                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span>{TaskItem.Text}</span>
                                  </li>
                                );
                              })}
                          {Task.TaskItems.length > 3 ? (
                            <h6 className="mt-2 p-3 bg-warning rounded">
                              You have a lot of items
                            </h6>
                          ) : (
                            ""
                          )}
                        </ol>
                      </div>
                      <hr />
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => {
                          GoToDetailsTask(Task.TaskId);
                        }}
                      >
                        Go To Details Task
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="alert alert-secondary"> No Data Loaded</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTasks;
