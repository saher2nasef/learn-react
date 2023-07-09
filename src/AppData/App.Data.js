import React, { createContext, useState } from "react";
import { GetData } from "../ServicesApp/DataController";

const AppDataContext = createContext();
const AppDataContextProvider = ({ children }) => {
  let [Data, setData] = useState({
    Tasks: GetData("Tasks"),
    AppName: "Tasks App",
    KeyData: "Tasks",
  });
  let ChangeData = (NewData) => {
    setData(NewData);
  };
  return (
    <AppDataContext.Provider value={{ Data, ChangeData }}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContextProvider, AppDataContext };
