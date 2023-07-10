/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppDataContext } from "../../AppData/App.Data";
import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { SaveData } from "../../ServicesApp/DataController";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./All-Tasks-style.css";
const TaskPage = () => {
  let Params = useParams();
  let navigate = useNavigate();
  // let TaskData =
  let { Data } = useContext(AppDataContext);
  let Tasks = Data["Tasks"];
  let TaskData = Tasks.filter((Task) => {
    if (Task.TaskId == Params["TaskId"]) {
      return Task;
    }
  })[0];
  let DeleteTask = (TaskId) => {
    Tasks.filter((Task, index) => {
      if (Task.TaskId == TaskId) {
        Tasks.splice(index, 1);
      }
    });
    SaveData({
      SaveAs: Data["KeyData"],
      Data: Data["Tasks"],
    });
    toast.success(`This Task ${TaskData.TaskTitle} Is Deleted SuccessFul!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/All-Tasks");
  };
  let EditTask = (TaskId) => {
    navigate(`/Edit-Task/${TaskId}`);
  };

  return (
    <section id="TaskDetails" className="pb-5 pt-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="Task" key={TaskData.TaskId}>
              <div className="header d-flex w-100 align-items-center justify-content-between">
                <h3 className="Title">{TaskData.TaskTitle}</h3>
                <div className="buttons-controllers">
                  <Tooltip title={`Edit This Task Name: ${TaskData.TaskTitle}`}>
                    <button
                      className="Edit btn btn-primary ms-1"
                      onClick={() => {
                        EditTask(TaskData.TaskId);
                      }}
                    >
                      <Edit></Edit>
                    </button>
                  </Tooltip>
                  <Tooltip
                    title={`Delete This Task Name: ${TaskData.TaskTitle}`}
                  >
                    <button
                      className="delete btn btn-danger ms-1"
                      onClick={() => {
                        DeleteTask(TaskData.TaskId);
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
                  {TaskData.TaskItems.map((TaskItem) => {
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
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskPage;
