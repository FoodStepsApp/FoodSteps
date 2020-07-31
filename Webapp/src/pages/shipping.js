import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { getLastDates } from '../utils';
import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import '../style/vendor/datatables/dataTables.bootstrap4.min.css';
import { connect } from 'react-redux';
import cookie from "react-cookies";

const Header = [
  'Shipment Number',
  'Client ',
  'Shipment Date',
  'Estimated Time',
  'Quantity',
  'Point Of Origin',
  'Destination',
];
class Shipping extends Component {
  state = {
    last24HrsCount: '',
    last3MonthsCount: '',
    last6MonthsCount: '',
    allTimeCount: '',
    shipmentsData: [],
    shipmentNumber: '',
    selectedValue: 'All',
  };

  componentDidMount() {
    this.fetchShipments();
  }

  fetchShipment = async () => {
    const { shipmentNumber } = this.state;
    if (shipmentNumber.trim() !== '') {
      const shipmentsOriginal = await axios.get(
        `http://34.207.213.121:3500/queryDataByKey?stream=stream1&key=${shipmentNumber}`,
      );
      const username = cookie.load('userId');

      const shipments = shipmentsOriginal.data.items.filter(shipment => JSON.parse(shipment.data).username === username || JSON.parse(shipment.data).to === username);

      const shipmentsData = this.buildShipmentsData(shipments);
      shipmentsData.reverse();
      this.setState({ shipmentsData });
    }
  };

  async fetchShipments() {
    const shipmentsOirignal = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=16dZeEVSn68G2kXxmiUdaTKDkQBr6c5k9nPDsY',
    );
    const username = cookie.load('userId');

    const shipments = shipmentsOirignal.data.items.filter(shipment => JSON.parse(shipment.data).username === username || JSON.parse(shipment.data).to === username);
    const manufacturingDates = shipments.map((shipment, index) => {
      const manufacturingData = JSON.parse(shipment.data);

      return manufacturingData.Shipment_Date;
    });
    const last24hrsDates = getLastDates(manufacturingDates, 24);
    const last3Months = getLastDates(manufacturingDates, 2190);
    const last6Months = getLastDates(manufacturingDates, 4380);
    const shipmentsData = this.buildShipmentsData(shipments);
     shipmentsData.reverse();
    const shipmentsData24 = shipmentsData.filter(
      shipment =>
        last24hrsDates.find(dt => dt === shipment.shipmentDate)
    );
    const shipmentsData3Months = shipmentsData.filter(
      shipment =>
        last3Months.find(dt => dt === shipment.shipmentDate)
    );
    const shipmentsData6Months = shipmentsData.filter(
      shipment =>
        last6Months.find(dt => dt === shipment.shipmentDate)
    );
    this.setState({
      last24HrsCount: last24hrsDates.length,
      last3MonthsCount: last3Months.length,
      last6MonthsCount: last6Months.length,
      allTimeCount: manufacturingDates.length,
      shipmentsData,
      shipmentsData24,
      shipmentsData3Months,
      shipmentsData6Months,
    });
  }

  buildShipmentsData(shipments) {
    const shipmentsData = shipments.map(shipment => {
      const dataString = shipment.data.replace(/['"]+/g, '');
      const dataStringArray = dataString.split(',');
      const manufacturingData = JSON.parse(shipment.data);

      const client = manufacturingData.Client;
      const shipmentNumber = shipment.key.replace(/['"]+/g, '');
      const shipmentNum = (
        <Link
          onClick={() =>
            this.props.history.push(`/shipping-to-tracking:${shipmentNumber}`)
          }
        >
          {shipmentNumber}
        </Link>
      );
      const shipmentDate = manufacturingData.Shipment_Date;
      const estimatedTime = manufacturingData.Estimated_time;
      const location = manufacturingData.location;
      const source = manufacturingData.source;
      const destination = manufacturingData.destination;
      const quantity = manufacturingData.quantity;
      return {
        shipmentNumber: shipmentNum,
        client,
        shipmentDate,
        estimatedTime,
        status: 'Shipped',
        source,
        location,
        destination,
        quantity
      };
    });

    return shipmentsData;
  }

  handleChange = e => {
    this.setState({ selectedValue: e.target.value });
  };

  render() {
    const {
      last24HrsCount,
      last3MonthsCount,
      last6MonthsCount,
      allTimeCount,
      shipmentsData,
      shipmentNumber,
      selectedValue,
      shipmentsData24,
      shipmentsData3Months,
      shipmentsData6Months,
    } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div id="wrapper">
          <Navbar selectedTab="shipping" />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars" />
                </button>

                <div className="text-center">
                  <Link to="/entrydetails" className="btn btn-success">
                    <i className="fas fa-plus-circle" /> Add Inventory /
                    Shipment
                  </Link>
                </div>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      value={shipmentNumber}
                      onChange={e =>
                        this.setState({ shipmentNumber: e.target.value })
                      }
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.fetchShipment}
                      >
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
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">SHIPPING</h1>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card bg-card-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="font-weight-bold text-uppercase mb-1">
                              <p className="mb-0">Shipped (24 Hours)</p>
                              <h4 className="mb-0">{last24HrsCount}</h4>
                            </div>
                            <div
                              className="h5 mb-0 font-weight-bold text-gray-800"
                              id="day"
                            />
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-truck fa-2x " />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card bg-card-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-md font-weight-bold text-uppercase mb-1">
                              <p className="mb-0">Shipped (last 3 Months)</p>
                              <h4 className="mb-0">{last3MonthsCount}</h4>
                            </div>
                            <div
                              className="h5 mb-0 font-weight-bold text-gray-800"
                              id="three"
                            />
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-truck fa-2x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card bg-card-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-md font-weight-bold text-uppercase mb-1">
                              <p className="mb-0">Shipped (last 6 Months)</p>
                              <h4 className="mb-0">{last6MonthsCount}</h4>
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div
                                  className="h5 mb-0 mr-3 font-weight-bold text-gray-800"
                                  id="six"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-truck fa-2x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card bg-card-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="font-weight-bold text-uppercase mb-1">
                              <p className="mb-0">All Time Shipped</p>
                              <h4 className="mb-0">{allTimeCount}</h4>
                            </div>
                            <div
                              className="h5 mb-0 font-weight-bold text-gray-800"
                              id="all"
                            />
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-truck fa-2x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <select
                  onChange={this.handleChange}
                  value={selectedValue}
                >
                  <option value="24Hours">24 Hours</option>
                  <option value="3Months">3 Months</option>
                  <option value="6Months">6 Months</option>
                  <option value="All">All</option>
                </select>
                {selectedValue === 'All' && (shipmentsData.length > 0 ? (
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <TablePagination
                        title=" Shipping Details"
                        headers={Header}
                        data={shipmentsData}
                        columns="shipmentNumber.client.shipmentDate.estimatedTime.quantity.source.destination"
                        perPageItemCount={5}
                        totalCount={shipmentsData.length}
                        arrayOption={[]}
                        className="status"
                      />

                    </div>
                  </div>
                ): <p>No Results Found</p>)}
                {selectedValue === '24Hours' && (shipmentsData24.length > 0 ? (
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <TablePagination
                        title=" Shipping Details"
                        headers={Header}
                        data={shipmentsData24}
                        columns="shipmentNumber.client.shipmentDate.estimatedTime.status.source.destination"
                        perPageItemCount={5}
                        totalCount={shipmentsData24.length}
                        arrayOption={[]}
                        className="status"
                      />

                    </div>
                  </div>
                ): <p>No Results Found</p>)}
                {selectedValue === '3Months' && (shipmentsData3Months.length > 0 ?  (
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <TablePagination
                        title=" Shipping Details"
                        headers={Header}
                        data={shipmentsData3Months}
                        columns="shipmentNumber.client.shipmentDate.estimatedTime.status.source.destination"
                        perPageItemCount={5}
                        totalCount={shipmentsData3Months.length}
                        arrayOption={[]}
                        className="status"
                      />

                    </div>
                  </div>
                ): <p>No Results Found</p>)}
                {selectedValue === '6Months' && (shipmentsData6Months.length > 0 ?(
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <TablePagination
                        title=" Shipping Details"
                        headers={Header}
                        data={shipmentsData6Months}
                        columns="shipmentNumber.client.shipmentDate.estimatedTime.status.source.destination"
                        perPageItemCount={5}
                        totalCount={shipmentsData6Months.length}
                        arrayOption={[]}
                        className="status"
                      />

                    </div>
                  </div>
                ): <p>No Results Found</p>)}
              </div>
            </div>

            <Footer />
          </div>
        </div>

        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>

        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
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
  return { user: state.user };
}

export default connect(mapStateToProps, {})(Shipping);
