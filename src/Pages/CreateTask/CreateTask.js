/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppDataContext } from "../../AppData/App.Data";
import { SaveData } from "../../ServicesApp/DataController";
import { toast } from "react-toastify";
import AOS from "aos";
import "./CreateTask.style.css";
const CreateTask = () => {
  let TitleValueInput = useRef();
  let ItemValueInput = useRef();
  let [TaskItems, setTaskItems] = useState([]);
  let [Task, setTask] = useState({});
  let { Data, SetTasks } = useContext(AppDataContext);
  let [ShowSectionsToAddTask, setShowSectionsToAddTask] = useState(true);

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
      SetTasks(Data.Tasks);
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
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section id="CreateTask" className="pb-5">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-12 text-center pt-3"
            data-aos-delay="100"
            data-aos="fade-left"
          >
            <h2>Create Task</h2>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
            {ShowSectionsToAddTask ? (
              <div className="Task pt-3">
                <div
                  data-aos-delay="200"
                  data-aos="fade-left"
                  className="Input-Box"
                >
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
                <div
                  data-aos-delay="300"
                  data-aos="fade-left"
                  className="AddTaskItems mt-3 mb-3"
                >
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
                <div
                  data-aos-delay="400"
                  data-aos="fade-left"
                  className="TaskItems mt-3 mb-3"
                >
                  <label className="form-label mb-1">Task Items</label>
                  <ol className="list-group Theme">
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
                <div
                  data-aos-delay="500"
                  data-aos="fade-left"
                  className="Button-Box w-100"
                >
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
                  <h3
                    className="TaskTitle"
                    data-aos-delay="100"
                    data-aos="fade-left"
                  >
                    Task Title is : <strong>{Task.TaskTitle}</strong>
                  </h3>
                  <hr />
                  <div>
                    <label
                      className="form-label mb-1"
                      data-aos-delay="200"
                      data-aos="fade-left"
                    >
                      <h4>Task Items</h4>
                    </label>
                    <ol className="list-group Theme">
                      {Task.TaskItems.map((TaskItem, index) => {
                        return (
                          <li
                            data-aos-delay={(index + 1) * 100}
                            data-aos="fade-left"
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
