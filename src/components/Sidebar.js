import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCog,
  faDollarSign,
  faSignOutAlt,
  faTimes,
  faInbox,
  faRocket,
  faUserTie,
  faCarAlt,
  faPhotoVideo,
  faProcedures,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes1 } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import { faMagento, faRedRiver } from "@fortawesome/free-brands-svg-icons";

function Sidebar(props = {}) {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="Admin Dashboard"
                link={Routes1.Dashboard.path}
                image={ThemesbergLogo}
              />
              <Dropdown.Divider className="my-3 border-indigo" />

              {/* <NavItem
                title="Vehicle-Categories"
                link={Routes1.VehicleCategory.path}
                icon={faCog}
              /> */}

              <NavItem
                title="Loan Category"
                link={Routes1.LoanCategory.path}
                icon={faMagento}
              />
              {/*               
              <NavItem
                title="Driver Details"
                link={Routes1.VehicleDriver.path}
                icon={faRedRiver}
              /> */}

              {/* <NavItem
                title="Vehicle details"
                link={Routes1.Vehicle.path}
                icon={faCarAlt}
              /> */}

              {/* <NavItem
                title="Cab Details"
                link={Routes1.Cab.path}
                icon={faRocket}
              /> */}

              {/* <NavItem
                title="Banners Section"
                link={Routes1.Banner.path}
                icon={faPhotoVideo}
              /> */}

              {/* <NavItem
                title="Promo-Code"
                link={Routes1.Promocode.path}
                icon={faProcedures}
              /> */}

              {/* <NavItem
                title="Notifications"
                link={Routes1.Notification.path}
                icon={faPoll}
              /> */}

              {/* <NavItem
                title="Ride details"
                link={Routes1.JobRider.path}
                icon={faInbox}
              /> */}

              {/* <NavItem
                title="Payment History"
                link={Routes1.PaymentHistory.path}
                icon={faDollarSign}
              /> */}

              <NavItem
                title="Customer/User"
                link={Routes1.User.path}
                icon={faUserTie}
              />

              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
}

export default Sidebar;
