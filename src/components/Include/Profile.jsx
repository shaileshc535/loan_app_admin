import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Col, Row, Card } from "@themesberg/react-bootstrap";
import {
  cabCountAction,
  driverCountAction,
  rideCountAction,
  totalEarnAction,
  userAction,
  vehicleAction,
} from "../../redux/action/dashboard";
import {
  faCarAlt,
  faSnowman,
  faCompress,
  faUserTie,
  faCaravan,
  faTruckPickup,
  faPenAlt,
  faPeace,
  faSortAmountUp,
  faSortAmountDown,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes1 } from "../../routes";

function Profile() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cabCountAction());
    dispatch(driverCountAction());
    dispatch(rideCountAction());
    dispatch(totalEarnAction());
    dispatch(userAction());
    dispatch(vehicleAction());
  }, []);

  // const usr = useSelector((state) => state.AuthReducer.userResult);
  const cabCountDetail = useSelector((state) => state.dashboard.cabResult);
  const driverCountDeatils = useSelector(
    (state) => state.dashboard.driverResult
  );
  const rideCountDeatils = useSelector((state) => state.dashboard.rideResult);
  const earnCountDeatils = useSelector((state) => state.dashboard.earnResult);
  const userCountDeatils = useSelector((state) => state.dashboard.userResult);
  const vehicleCountDeatils = useSelector(
    (state) => state.dashboard.vehicleResult
  );

  return (
    <Container className="content">
      <ToastContainer />
      <Row>
        <Col>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    {userCountDeatils &&
                      userCountDeatils.map((item, i) => (
                        <div className="card border-left-primary shadow h-100 py-2">
                          <Link to={Routes1.User.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faUserTie}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs text-primary font-weight-bold text-uppercase mb-1">
                                      User Count
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 mt-1 font-weight-bold text-gray-800">
                                    {item.usercount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {driverCountDeatils &&
                      driverCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.VehicleDriver.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faSnowman}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                      Driver Count
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.driverCount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {cabCountDetail &&
                      cabCountDetail.map((item, i) => (
                        <div className="card border-left-primary shadow h-100 py-2">
                          <Link to={Routes1.Cab.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faCaravan}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                      Cab Count
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 mt-1 font-weight-bold text-gray-800">
                                    {item.cabCount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {vehicleCountDeatils &&
                      vehicleCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.Vehicle.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faCarAlt}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                      Vehicle Count
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.vehicleCount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    {earnCountDeatils &&
                      earnCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.PaymentHistory.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faSortAmountUp}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                      Company Earning
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    <i class="fas fa-rupee-sign"></i>{" "}
                                    {item.company_earning !== null &&
                                    item.company_earning !== undefined &&
                                    item.company_earning !== ""
                                      ? item.company_earning
                                      : 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-primary shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faPenAlt}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs text-primary font-weight-bold text-uppercase mb-1">
                                      Total Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 mt-1 font-weight-bold text-gray-800">
                                    {item.totalRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faPeace}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                      Raw Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.rawRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faPeace}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                      Accepted Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.aceptedRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-primary shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faTruckPickup}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                      Picked-Up Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 mt-1 font-weight-bold text-gray-800">
                                    {item.pickedUpRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faCompress}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                      Completed Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.completeRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faBus}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                      Cancel Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.cancelRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faBus}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                      Expired Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.expiredRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    {rideCountDeatils &&
                      rideCountDeatils.map((item, i) => (
                        <div className="card border-left-warning shadow h-100 py-2">
                          <Link to={Routes1.JobRider.path}>
                            <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                  <div>
                                    <div className="col-auto">
                                      <FontAwesomeIcon
                                        icon={faBus}
                                        className="text-danger me-2 fa-2x text-gray-600"
                                      />
                                    </div>
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                      Other Rides
                                    </div>
                                  </div>
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {item.otherRides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
