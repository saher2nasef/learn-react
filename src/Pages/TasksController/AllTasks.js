/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import { AppDataContext } from "../../AppData/App.Data";
import "./All-Tasks-style.css";
import { useNavigate } from "react-router-dom";
import { SaveData } from "../../ServicesApp/DataController";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
const AllTasks = () => {
  let { Data, SetTasks } = useContext(AppDataContext);
  let [AllTasks, setallTasks] = useState([]);
  let navigate = useNavigate();
  const GoToDetailsTask = (TaskId) => {
    navigate(`/Task/${TaskId}`);
  };
  let DeleteTask = (task) => {
    // eslint-disable-next-line array-callback-return
    AllTasks.filter((Task, index) => {
      if (Task.TaskId == task.TaskId) {
        AllTasks.splice(index, 1);
      }
    });
    SaveData({
      SaveAs: Data["KeyData"],
      Data: AllTasks,
    });
    toast.success(`This Task ${task.TaskTitle} Is Deleted SuccessFul!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/All-Tasks");
  };
  const DeleteAllTasks = () => {
    Data.Tasks = [];
    SetTasks([]);
    setallTasks(
      AllTasks.map((TaskItem) => {
        return TaskItem;
      })
    );
    SaveData({
      SaveAs: Data["KeyData"],
      Data: [],
    });
  };
  useEffect(() => {
    setallTasks(Data.Tasks);
    AOS.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AllTasks]);
  return (
    <section id="AllTasks" className="pb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center pt-3">
            <h2>All Task</h2>
          </div>
          {AllTasks.length > 1 ? (
            <div className="col-12">
              <div
                className="w-100 text-center my-3  d-flex align-items-center justify-content-center"
                data-aos="zoom-out"
                data-aos-delay="100"
              >
                <button
                  className="btn btn-danger d-flex align-items-center"
                  onClick={DeleteAllTasks}
                >
                  <span className="me-2">Delete All Tasks</span>
                  <Delete></Delete>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-12">
            <hr />
            {AllTasks.length !== 0 ? (
              <div className="AllTasksShow">
                {AllTasks.map((Task, index) => {
                  return (
                    <div
                      className="Task mb-2"
                      key={Task.TaskId}
                      data-aos-delay={(index + 1) * 100}
                      data-aos="fade-left"
                    >
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
                      <div className="TaskItems mt-3 mb-3">
                        <label className="form-label mb-1">Task Items</label>
                        <ol className="list-group Theme">
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
