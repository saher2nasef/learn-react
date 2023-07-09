import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AppDataContext } from "../../AppData/App.Data";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
const Header = () => {
  let Links = [
    { Path: "/", LinkName: "Home" },
    { Path: "/All-Tasks", LinkName: "Tasks" },
    { Path: "/Create-Task", LinkName: "Create Task" },
  ];
  const [show, setShow] = useState(false);
  let Data = useContext(AppDataContext);
  let AppName = Data.Data.AppName;
  let expand = "lg";
  const location = useLocation();
  useEffect(() => {
    if (show) {
      ChangeShow();
    }
  }, [location.pathname]);
  useEffect(() => {
    setShow(false);
  }, []);
  const ChangeShow = () => {
    setShow(!show);
  };
  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand>
            <Link className="navbar-brand fw-bold" to="/">
              {AppName}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={ChangeShow}
            aria-controls={`offcanvasNavbar-expand-${expand}`}
          />
          <Navbar.Offcanvas
            show={show}
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header>
              <button
                onClick={ChangeShow}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {AppName}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {Links.map((Link, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <NavLink className="nav-link" to={Link.Path}>
                        {Link.LinkName}
                      </NavLink>
                    </li>
                  );
                })}
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
