/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppDataContext } from "../../AppData/App.Data";
import { SaveData } from "../../ServicesApp/DataController";
import { toast } from "react-toastify";

const CreateTask = () => {
  let TitleValueInput = useRef();
  let ItemValueInput = useRef();
  let [TaskItems, setTaskItems] = useState([]);
  let [Task, setTask] = useState({});
  let { Data, ChangeData } = useContext(AppDataContext);
  let [ShowSectionsToAddTask, setShowSectionsToAddTask] = useState(true);
  useEffect(() => {}, []);
  const CreateTask = () => {
    let TaskTitle = TitleValueInput["current"].value;
    if (TaskTitle.replaceAll(" ", "").length !== 0 && TaskItems.length !== 0) {
      let PartyOfId = new Date();
      let TaskData = {
        TaskId:
          "TaskId" +
          Math.round(
            Math.random() *
              Math.random() *
              PartyOfId.getMilliseconds() *
              PartyOfId.getSeconds() *
              PartyOfId.getMilliseconds() *
              PartyOfId.getSeconds()
          ),
        TaskTitle: TaskTitle,
        TaskItems: TaskItems,
      };
      setTask(TaskData);
      Data.Tasks.push(TaskData);
      ChangeData(Data);
      SaveData({
        Data: Data.Tasks,
        SaveAs: Data.KeyData,
      });
      setShowSectionsToAddTask(false);
      toast.success(`Your Task " ${TaskTitle} " Is Created SuccessFul!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const AddItem = () => {
    if (ItemValueInput["current"].value.replaceAll(" ", "").length !== 0) {
      TaskItems.push({
        id: "id" + Math.random().toString(16).slice(2),
        Text: ItemValueInput["current"].value,
      });
      let AllTaskItems = TaskItems.map((TaskItem) => {
        return TaskItem;
      });
      setTaskItems(AllTaskItems);
      ItemValueInput["current"].value = "";
    }
  };
  const DeleteItem = (ID) => {
    TaskItems.filter((TaskItem, index) => {
      if (TaskItem.id == ID) {
        TaskItems.splice(index, 1);
      }
    });
    let AllTaskItems = TaskItems.map((TaskItem) => {
      return TaskItem;
    });
    setTaskItems(AllTaskItems);
  };
  return (
    <section id="CreateTask" className="pb-5">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 text-center pt-3">
            <h2>Create Task</h2>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
            {ShowSectionsToAddTask ? (
              <div className="Task pt-3">
                <div className="Input-Box">
                  <label htmlFor="TaskTitle" className="form-label">
                    Enter Your Task Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="TaskTitle"
                    ref={TitleValueInput}
                    id="TaskTitle"
                    placeholder="Task Title"
                  />
                </div>
                <div className="AddTaskItems mt-3 mb-3">
                  <label htmlFor="AddTaskItems" className="form-label mb-1">
                    Add Task Items
                  </label>
                  <div className="Input-Box d-flex align-items-center justify-content-center flex-column">
                    <input
                      type="text"
                      className="form-control"
                      name="AddTaskItems"
                      id="AddTaskItems"
                      placeholder="Add Task Items"
                      ref={ItemValueInput}
                    />
                    <button
                      className="w-100 mt-3 btn btn-primary"
                      onClick={AddItem}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="TaskItems mt-3 mb-3">
                  <label className="form-label mb-1">Task Items</label>
                  <ol className="list-group">
                    {TaskItems.map((TaskItem, index) => {
                      return (
                        <li
                          key={index}
                          className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                          style={{ cursor: "pointer" }}
                        >
                          <span>{TaskItem.Text}</span>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              DeleteItem(TaskItem.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <div className="Button-Box w-100">
                  <button
                    className="btn btn-primary w-100"
                    onClick={CreateTask}
                  >
                    Create Task
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-2">
                <div className="alert alert-info">Your Task Is Created</div>
                <div className="Task">
                  <h3 className="TaskTitle">
                    Task Title is : <strong>{Task.TaskTitle}</strong>
                  </h3>
                  <hr />
                  <div>
                    <label className="form-label mb-1">
                      <h4>Task Items</h4>
                    </label>
                    <ol className="list-group">
                      {Task.TaskItems.map((TaskItem, index) => {
                        return (
                          <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                            style={{ cursor: "pointer" }}
                          >
                            <span>{TaskItem.Text}</span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <hr />
                  <Link to="/All-Tasks">Go To Your Tasks</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTask;
