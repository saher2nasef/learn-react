import React, { useEffect, useState } from "react";
import "./Style.css";
const Portfolio = () => {
  let Projects = [
    {
      type: "Front-End",
      Data: {
        ProjectName: "Tasks App Front-End",
      },
    },
    {
      type: "Front-End",
      Data: {
        ProjectName: "E-Commerce App Front-End",
      },
    },
    {
      type: "Back-End",
      Data: {
        ProjectName: "Tasks App API",
      },
    },
    {
      type: "Back-End",
      Data: {
        ProjectName: "E-Commerce App API",
      },
    },
    {
      type: "Full-Stack",
      Data: {
        ProjectName: "Tasks App Full-Stack",
      },
    },
    {
      type: "Full-Stack",
      Data: {
        ProjectName: "E-Commerce App Full-Stack",
      },
    },
    {
      type: "Mobile Stack",
      Data: {
        ProjectName: "E-Commerce App Mobile",
      },
    },
  ];
  let [Data, setData] = useState(Projects);
  let [TypesState, setTypes] = useState([]);
  useEffect(() => {
    let Types = [];
    Projects.forEach((Project) => {
      if (Types.indexOf(Project.type) === -1) {
        Types.push(Project.type);
      }
    });
    setTypes(Types);
  }, []);
  const FilterBy = (FilterByType) => {
    setData(
      Projects.filter((Project) => {
        if (Project.type == FilterByType) {
          return Project;
        }
      })
    );
  };
  const All = () => {
    setData(Projects);
  };
  return (
    <section id="Portfolio">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center p-3">Portfolio</h1>
          </div>
        </div>
        <div className="col-12">
          <div className="controllerBar">
            <ul>
              <li className="bg-primary" onClick={All}>
                All
              </li>
              {TypesState.map((Type, index) => {
                return (
                  <li
                    key={index}
                    className="bg-primary"
                    onClick={() => {
                      FilterBy(Type);
                    }}
                  >
                    {Type}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="Porjects">
            {Data.map((Project, index) => {
              return (
                <div className="Porject" key={index}>
                  <div>
                    <h4>{Project.type}</h4>
                    <p>{Project.Data["ProjectName"]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
