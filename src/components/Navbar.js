/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
} from "@themesberg/react-bootstrap";
import NOTIFICATIONS_DATA from "../data/notifications";
import userIcon from "../assets/img/team/user-icon.jpg";
import { signOut } from "../redux/action/authAction";
import { Routes1 } from "../routes";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const areNotificationsRead = notifications.reduce(
    (acc, notif) => acc && notif.read,
    true
  );
  const usr = useSelector((state) => state.AuthReducer.userResult);
  const dispatch = useDispatch();
  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }, 300);
  };

  function logout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
        <Container fluid className="px-0">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center"></div>
            <Nav className="align-items-center">
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                  <div className="media d-flex align-items-center">
                    {usr.image != null ? (
                      <>
                        <Image
                          src={usr.img}
                          className="user-avatar md-avatar rounded-circle"
                        />
                      </>
                    ) : (
                      <Image
                        src={userIcon}
                        className="user-avatar md-avatar rounded-circle"
                      />
                    )}

                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                      <span className="mb-0 font-small fw-bold">
                        {usr.name}
                      </span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    <Link to={Routes1.Dashboard.path}> My Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item className="fw-bold" onClick={() => logout()}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-danger me-2"
                    />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
};
