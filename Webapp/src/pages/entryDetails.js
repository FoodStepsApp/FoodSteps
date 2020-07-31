import React, { Component } from 'react';
import axios from 'axios';
import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/css/react-pagination-table.css';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { fetchFacilityUsers, sendTokensFrom, fetchTokens } from '../actions';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class EntryDetails extends Component {
  state = {
    shipmentActive: 'active',
    inventoryActive: '',
    shipmentNumber: '',
    clientName: '',
    shipmentDate: '',
    estimatedDate: '',
    manufacturedDate: '',
    batchNumber: '',
    expiryDate: '',
    quantity: '',
    selectedFacilityUser: '',
    showModal: false,
    location: '',
    destination: '',
    source: '',
    serialNumberStart: 'BPOV',
    serialNumberEnd: 'BPOV',
  };

  componentDidMount() {
    const username = cookie.load('userId');
    this.props.fetchFacilityUsers(username);
    this.props.fetchTokens(username);
  }
  formatDate(dt) {
    const dateArray = dt.split('-');
    const formattedDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    return formattedDate;
  }
  onSubmit = async (e, isShip) => {
    e.preventDefault();
    console.log('submitted ', this.state);
    const {
      shipmentNumber,
      batchNumber,
      clientName,
      shipmentDate,
      estimatedDate,
      productType,
      quantity,
      manufacturedDate,
      expiryDate,
      selectedFacilityUser,
      inventoryActive,
      location,
      source,
      destination,
      serialNumberStart,
      serialNumberEnd
    } = this.state;
    const shipmentDateFormatted = shipmentDate.split('-');
    const username = cookie.load('userId');
    const shipmentData = {
      stream: 'stream1',
      key: shipmentNumber,
      data: {
        actor: 'shipping',
        userID: 'vc14',
        Batch_Number: batchNumber,
        Client: clientName,
        Shipment_Date: this.formatDate(shipmentDate),
        Estimated_time: this.formatDate(estimatedDate),
        source,
        destination,
        location,
        STATUS: 'GREEN',
        username,
        quantity,
        to: selectedFacilityUser
      },
    };

    const randomSerialNumber = Math.round(Math.random() * 10000);

    const inventoryData = {
      stream: 'stream1',
      key: batchNumber,
      data: {
        actor: 'inventory',
        userID: 'vc14',
        Serial_Number: randomSerialNumber,
        Product_Name: productType,
        Quantity: quantity,
        Manufacturing_Date: this.formatDate(manufacturedDate),
        Expiring_Date: this.formatDate(expiryDate),
        username,
        serialNumberEnd,
        serialNumberStart
      },
    };
    if (isShip) {
      const shipmentResult = await axios.post(
        'http://34.207.213.121:3500/publish',
        shipmentData,
      );
    } else {
      const inventoryResult = await axios.post(
        'http://34.207.213.121:3500/publish',
        inventoryData,
      );
    }

    if (inventoryActive === '') {
      const username = cookie.load('userId');
      const transferResult = await sendTokensFrom({
        tokensQuantity: parseInt(quantity),
        toName: selectedFacilityUser,
        username,
      });
    }

    this.setState({ showModal: true });
  };

  render() {
    const {
      shipmentActive,
      inventoryActive,
      shipmentNumber,
      clientName,
      shipmentDate,
      estimatedDate,
      batchNumber,
      expiryDate,
      quantity,
      manufacturedDate,
      showModal,
      location,
      source,
      destination,
      serialNumberStart,
      serialNumberEnd
    } = this.state;

    const { facilityUsers, user } = this.props;
    return (
      <div>
        {showModal && (
          <div className="modal addProduct" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Added Shipment/Inventory</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div id="wrapper">
          <Navbar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars" />
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm" />
                      </button>
                    </div>
                  </div>
                </form>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw" />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell fa-fw" />
                      <span className="badge badge-danger badge-counter">
                        3+
                      </span>
                    </a>
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="alertsDropdown"
                    >
                      <h6 className="dropdown-header">Alerts Center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 12, 2019
                          </div>
                          <span className="font-weight-bold">
                            A new monthly report is ready to download!
                          </span>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 7, 2019
                          </div>
                          $290.29 has been deposited into your account!
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 2, 2019
                          </div>
                          Spending Alert: We've noticed unusually high spending
                          for your account.
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Show All Alerts
                      </a>
                    </div>
                  </li>

                  <div className="topbar-divider d-none d-sm-block" />

                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        {user.fullName}
                      </span>
                      <img
                        className="img-profile rounded-circle"
                        src={user.imageUrl}
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                      </a>
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Enter Details</h1>
                <div className="card">
                  <nav className="mt-3">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a
                        className={`nav-item nav-link ${shipmentActive}`}
                        id="nav-home-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                        onClick={() =>
                          this.setState({
                            shipmentActive: 'active',
                            inventoryActive: '',
                          })
                        }
                      >
                        Add Shipment
                      </a>
                      <a
                        className={`nav-item nav-link ${inventoryActive}`}
                        id="nav-profile-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                        onClick={() =>
                          this.setState({
                            shipmentActive: '',
                            inventoryActive: 'active',
                          })
                        }
                      >
                        Add Inventory
                      </a>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className={`tab-pane fade show ${shipmentActive} p-3`}
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <form
                        id="shipment"
                        onSubmit={e => this.onSubmit(e, true)}
                      >
                        <div className="form-row">
                          <div className="col-md-4 mb-3">
                            <label for="Shipment_Number">Shipment Number</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Shipment_Number"
                              placeholder="SMT67568654956"
                              required
                              value={shipmentNumber}
                              onChange={e =>
                                this.setState({
                                  shipmentNumber: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label for="Client">Client Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Client"
                              placeholder="Client Name"
                              required
                              value={clientName}
                              onChange={e =>
                                this.setState({ clientName: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="col-md-4 mb-3">
                            <label for="Shipment_Date">Shipment Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="Shipment_Date"
                              placeholder="dd/mm/yyy"
                              required
                              value={shipmentDate}
                              onChange={e =>
                                this.setState({ shipmentDate: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label for="Estimated_time">
                              Estimated Arrival
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="Estimated_time"
                              placeholder="dd/mm/yyy"
                              required
                              value={estimatedDate}
                              onChange={e =>
                                this.setState({ estimatedDate: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label>Current Location</label>
                            <input
                              type="input"
                              className="form-control"
                              placeholder="location"
                              required
                              value={location}
                              onChange={e =>
                                this.setState({ location: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label>Point of Origination</label>
                            <input
                              type="input"
                              className="form-control"
                              placeholder="source"
                              required
                              value={source}
                              onChange={e =>
                                this.setState({ source: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label>Destination</label>
                            <input
                              type="input"
                              className="form-control"
                              placeholder="destination"
                              required
                              value={destination}
                              onChange={e =>
                                this.setState({ destination: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label for="validationDefault04">Quantity</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault04"
                              placeholder="2454"
                              required
                              value={quantity}
                              onChange={e =>
                                this.setState({ quantity: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label for="validationDefault03">
                              To
                            </label>
                            <select
                              className="custom-select"
                              required
                              onChange={e => {
                                this.setState({ selectedFacilityUser: e.target.value });
                              }}
                            >
                              <option value="">Select</option>
                              {facilityUsers.map(user => <option value={user.username}> {user.username} </option>)}
                            </select>
                          </div>
                        </div>
                        {/*<hr />
                        <h1 className="h5 mb-4 text-gray-800">
                          Description of Goods
                        </h1>
                        <div className="form-row">
                          <div className="col-md-6 mb-3">
                            <label for="validationDefault03">
                              Product Type
                            </label>
                            <select
                              className="custom-select"
                              required
                              onChange={e => {
                                if (e.target.value === '1')
                                  this.setState({ productType: 'Polio' });
                                if (e.target.value === '2')
                                  this.setState({ productType: 'MMR' });
                                if (e.target.value === '3')
                                  this.setState({ productType: 'Measles' });
                              }}
                            >
                              <option value="">Product Type</option>
                              <option value="1">Polio</option>
                              <option value="2">MMR</option>
                              <option value="3">Measles</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label for="validationDefault04">
                              Batch Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault04"
                              placeholder="70130433402586"
                              required
                              onChange={e =>
                                this.setState({
                                  batchNumber: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-4 mb-3">
                            <label for="validationDefault01">
                              Manufactured Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="validationDefault01"
                              placeholder="dd/mm/yyy"
                              required
                              value={manufacturedDate}
                              onChange={e =>
                                this.setState({
                                  manufacturedDate: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="col-md-4 mb-3">
                            <label for="validationDefault01">Expiry Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="validationDefault01"
                              placeholder="dd/mm/yyy"
                              required
                              value={expiryDate}
                              onChange={e =>
                                this.setState({ expiryDate: e.target.value })
                              }
                            />
                          </div>

                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationDefault03">
                            To
                          </label>
                          <select
                            className="custom-select"
                            required
                            onChange={e => {
                              this.setState({ selectedFacilityUser: e.target.value });
                            }}
                          >
                            <option value="">Select</option>
                            {facilityUsers.map(user => <option value={user.username}> {user.username} </option>)}
                          </select>
                        </div>
                        <hr />*/}

                       {/* <button
                          className="btn btn-success"
                          type="submit"
                          value="Add"
                        >
                          <i className="fas fa-plus-circle" /> Add New Product
                        </button>*/}
                        <button
                          className="btn btn-primary"
                          type="submit"
                          value="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                    <div
                      className={`tab-pane fade show ${inventoryActive} p-3`}
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <form
                        id="inventory"
                        onSubmit={e => this.onSubmit(e, false)}
                      >
                        <div className="form-row">
                          <div className="col-md-6 mb-3">
                            <label for="ProductType">Product Type</label>
                            <select
                              id="ProductType"
                              className="custom-select"
                              required
                              onChange={e => {
                                if (e.target.value === '1')
                                  this.setState({ productType: 'Polio' });
                                if (e.target.value === '2')
                                  this.setState({ productType: 'MMR' });
                                if (e.target.value === '3')
                                  this.setState({ productType: 'Measles' });
                              }}
                            >
                              <option value="">Product Type</option>
                              <option value="1">Polio</option>
                              <option value="2">MMR</option>
                              <option value="3">Measles</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label for="BatchNumber">Batch Number</label>
                            <input
                              type="text"
                              className="form-control"
                              id="BatchNumber"
                              placeholder="70130433402586"
                              required
                              value={batchNumber}
                              onChange={e => {
                                console.log('batchnumber', e.target.value);
                                this.setState({ batchNumber: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-6 mb-3">
                            <label for="BatchNumber">Serial Number Start</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="BPOV7774101000"
                              required
                              value={serialNumberStart}
                              onChange={e => {
                                const bopvNumber =  e.target.value.match(/\d+/g);
                                let newSerialNumberEnd = 'BOPV';
                                debugger;
                                if(bopvNumber && bopvNumber.length > 0) {
                                  newSerialNumberEnd = `BOPV${parseInt(bopvNumber[0]) + 100}`
                                }
                                this.setState({ serialNumberStart: e.target.value, serialNumberEnd: newSerialNumberEnd });
                              }}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label for="BatchNumber">Serial Number End</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="BPOV7774101100"
                              required
                              value={serialNumberEnd}
                              onChange={e => {
                                this.setState({ serialNumberEnd: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-4 mb-3">
                            <label for="ManufacturedDate">
                              Manufactured Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="ManufacturedDate"
                              placeholder="dd/mm/yyy"
                              required
                              value={manufacturedDate}
                              onChange={e =>
                                this.setState({
                                  manufacturedDate: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="col-md-4 mb-3">
                            <label for="ExpiryDate">Expiry Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="ExpiryDate"
                              placeholder="dd/mm/yyy"
                              required
                              value={expiryDate}
                              onChange={e =>
                                this.setState({ expiryDate: e.target.value })
                              }
                            />
                          </div>

                          <div className="col-md-4 mb-3">
                            <label for="Quantity">Quantity</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Quantity"
                              placeholder="2454"
                              required
                              value={quantity}
                              onChange={e =>
                                this.setState({ quantity: e.target.value })
                              }
                            />
                          </div>

                        </div>
                        <hr />

                        <button
                          className="btn btn-primary"
                          type="submit"
                          value="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>

        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        <div id="successmodal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 className="modal-title" id="smodal-title" />
              </div>
              <div className="modal-body" id="smodal-body">
                <p />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { facilityUsers: state.facilityUsers, user: state.user };
}

export default connect(mapStateToProps, { fetchFacilityUsers, fetchTokens })(
  EntryDetails,
);
