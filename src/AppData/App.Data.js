import React, { createContext, useEffect, useState } from "react";
import { GetData } from "../ServicesApp/DataController";

const AppDataContext = createContext(null);
const AppDataContextProvider = ({ children }) => {
  let [Data, setData] = useState({
    Tasks: GetData("Tasks"),
    AppName: "Tasks App",
    KeyData: "Tasks",
    Theme: "Light",
  });
  let [Theme, SetTheme] = useState("Light");
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      Data["Theme"] = "Light";
      setData(Data);
      SetTheme("Light");
    } else {
      Data["Theme"] = "Dark";
      setData(Data);
      SetTheme("Dark");
    }
  }, []);
  let SetMode = (Mode) => {
    Data["Theme"] = Mode;
    setData(Data);
    SetTheme(Mode);
  };
  let SetTasks = (Tasks) => {
    Data["Tasks"] = Tasks;
    setData(Data);
  };
  let SetAppName = (AppName) => {
    Data["AppName"] = AppName;
    setData(Data);
  };
  return (
    <AppDataContext.Provider value={{ Data, SetMode, SetTasks, SetAppName }}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContextProvider, AppDataContext };
