import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TablePagination } from 'react-pagination-table';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import vaccine from '../assets/images/vaccine.png';
import drop from '../assets/images/drop.png';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import { getLastDates } from '../utils';
import axios from 'axios/index';
import {fetchTokens} from "../actions";
import {connect} from "react-redux";
import cookie from "react-cookies";

const Header = [
  'Batch Number',
  'Manufactured Date ',
  'Expiry Date',
  'Quantity',
];

class Inventory extends Component {
  state = {
    last24HrsCount: '',
    last3MonthsCount: '',
    last6MonthsCount: '',
    allTimeCount: '',
    inventoryData: [],
    batchNumber: '',
    selectedValue: 'All'
  };

  componentDidMount() {
    this.fetchInventories();
  }

  fetchInventory = async () => {
    const { batchNumber } = this.state;
    if (batchNumber.trim() !== '') {
      const inventoriesOriginal = await axios.get(`http://34.207.213.121:3500/queryDataByKey?stream=stream1&key=${batchNumber}`);
      const username = cookie.load('userId');

      const inventories = inventoriesOriginal.data.items.filter(inventory => JSON.parse(inventory.data).username === username || JSON.parse(inventory.data).to === username);

      const inventoryData = this.buildInventoryData(inventories);
      inventoryData.reverse();
      this.setState({ inventoryData });
    }
  }


  buildInventoryData(inventories) {
    const inventoryData = inventories.map(inventory => {
      const inventoryData = JSON.parse(inventory.data);
      const manufacturingDate = inventoryData.Manufacturing_Date;
      const quantity = inventoryData.Quantity;
      const productName = inventoryData.Product_Name;
      const batchNumber = inventoryData.Serial_Number;
      const expiryDate = inventoryData.Expiring_Date;
      const key = inventory.key.replace(/['"]+/g, '');
      return {
        batchNumber: key,
        productName,
        quantity,
        manufacturingDate,
        expiryDate,
      };
    });

    return inventoryData;
  }
  async fetchInventories() {
    const inventoriesOriginal = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=1GeUGrgyuqZjKz6p6yfyCKAMJgwxmN5cC74mmg',
    );
    const username = cookie.load('userId');

    const inventories = inventoriesOriginal.data.items.filter(inventory => JSON.parse(inventory.data).username === username  || JSON.parse(inventory.data).to === username);
    const manufacturingDates = inventories.map(
      (inventory, index) => {
        const manufacturingData = JSON.parse(inventory.data);
        const manufacturingDate = manufacturingData.Manufacturing_Date;
        return manufacturingDate;
      },
    );
    const last24hrsDates = getLastDates(manufacturingDates, 24);
    const last3Months = getLastDates(manufacturingDates, 2190);
    const last6Months = getLastDates(manufacturingDates, 4380);
    const inventoryData = this.buildInventoryData(inventories);
    inventoryData.reverse();
    const inventoryData24 = inventoryData.filter(
      inventory =>
        last24hrsDates.find(dt => dt === inventory.manufacturingDate)
    );
    const inventoryData3Months = inventoryData.filter(
      inventory =>
        last3Months.find(dt => dt === inventory.manufacturingDate)
    );
    const inventoryData6Months = inventoryData.filter(
      inventory =>
        last6Months.find(dt => dt === inventory.manufacturingDate)
    );
    this.setState({
      last24HrsCount: last24hrsDates.length,
      last3MonthsCount: last3Months.length,
      last6MonthsCount: last6Months.length,
      allTimeCount: manufacturingDates.length,
      inventoryData,
      inventoryData24,
      inventoryData3Months,
      inventoryData6Months,
    });
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
      inventoryData,
      inventoryData24,
      inventoryData3Months,
      inventoryData6Months,
      selectedValue
    } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div id="wrapper">
          <Navbar selectedTab='inventory'/>

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
                    <i className="fas fa-plus-circle" /> Add Inventory / Shipment
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
                      onChange={e => this.setState({ batchNumber: e.target.value })}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button" onClick={this.fetchInventory}>
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
                  <h1 className="h3 mb-0 text-gray-800">INVENTORY</h1>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card  bg-card-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-md font-weight-boldtext-uppercase mb-1">
                              <p className="mb-0"> Manufactured (24 Hours)</p>
                              <h4 className="mb-0">{last24HrsCount}</h4>
                            </div>
                            <div
                              className="h5 mb-0 font-weight-bold text-gray-800"
                              id="day"
                            />
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-chart-pie fa-2x" />
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
                              <p className="mb-0"> Manufactured (last 3 Months)</p>
                              <h4 className="mb-0">{last3MonthsCount}</h4>
                            </div>
                            <div
                              className="h5 mb-0 font-weight-bold text-gray-800"
                              id="three"
                            />
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-chart-pie fa-2x" />
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
                              <p className="mb-0"> Manufactured (last 6 Months)</p>
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
                            <i className="fas fa-chart-pie fa-2x" />
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
                            <div className="text-md font-weight-bold text-uppercase mb-1">
                              <p className="mb-0">All Time Manufactured</p>
                              <h4 className="mb-0">{allTimeCount}</h4>
                            </div>
                            <div
                              className="h5 mb-0 font-weight-bold text-gray-800"
                              id="all"
                            />
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-chart-pie fa-2x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                   {/* <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Product Details
                        </h6>
                        <form className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search mr-2">
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

                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card shadow h-100 py-2 bg-light">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto mr-3">
                                    <Link onClick={() => this.props.history.push('/inventory-to-tracking:polio')}>
                                      <img src={drop} width={35} height={35} />
                                    </Link>
                                  </div>
                                  <div className="col mr-2">
                                    <div className="h6 mb-0 font-weight-bold text-dark">
                                      <Link
                                        onClick={() => this.props.history.push('/inventory-to-tracking:polio')}
                                        className="text-dark"
                                      >
                                        POLIO
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card shadow h-100 py-2 bg-light">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto mr-3">
                                    <Link onClick={() => this.props.history.push('/inventory-to-tracking:mmr')}>
                                     <img src={vaccine} width={35} height={35} />
                                    </Link>
                                  </div>
                                  <div className="col mr-2">
                                    <div className="h6 mb-0 font-weight-bold text-dark">
                                      <Link
                                        onClick={() => this.props.history.push('/inventory-to-tracking:mmr')}
                                        className="text-dark"
                                      >
                                        MMR
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card shadow h-100 py-2 bg-light">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto mr-3">
                                    <Link onClick={() => this.props.history.push('/inventory-to-tracking:bcg')}>
                                      <img src={vaccine} width={35} height={35} />
                                    </Link>
                                  </div>
                                  <div className="col mr-2">
                                    <div className="h6 mb-0 font-weight-bold text-dark">
                                      <Link
                                        onClick={() => this.props.history.push('/inventory-to-tracking:bcg')}
                                        className="text-dark"
                                      >
                                        BCG
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card shadow h-100 py-2 bg-light">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto mr-3">
                                    <Link onClick={() => this.props.history.push('/inventory-to-tracking:mr')}>
                                      <img src={vaccine} width={35} height={35} />
                                    </Link>
                                  </div>
                                  <div className="col mr-2">
                                    <div className="h6 mb-0 font-weight-bold text-dark">
                                      <Link
                                        onClick={() => this.props.history.push('/inventory-to-tracking:mr')}
                                        className="text-dark"
                                      >
                                        MR
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card shadow h-100 py-2 bg-light">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto mr-3">
                                    <Link onClick={() => this.props.history.push('/inventory-to-tracking:ocv')}>
                                      <img src={vaccine} width={35} height={35} />
                                    </Link>
                                  </div>
                                  <div className="col mr-2">
                                    <div className="h6 mb-0 font-weight-bold text-dark">
                                      <Link
                                        onClick={() => this.props.history.push('/inventory-to-tracking:ocv')}
                                        className="text-dark"
                                      >
                                        OCV
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card shadow h-100 py-2 bg-light">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto mr-3">
                                    <Link onClick={() => this.props.history.push('/inventory-to-tracking:measles')}>
                                      <img src={vaccine} width={35} height={35} />
                                    </Link>
                                  </div>
                                  <div className="col mr-2">
                                    <div className="h6 mb-0 font-weight-bold text-dark">
                                      <Link
                                        onClick={() => this.props.history.push('/inventory-to-tracking:measles')}
                                        className="text-dark"
                                      >
                                        Measles
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>*/}
                    <select
                      onChange={this.handleChange}
                      value={selectedValue}
                    >
                      <option value="24Hours">24 Hours</option>
                      <option value="3Months">3 Months</option>
                      <option value="6Months">6 Months</option>
                      <option value="All">All</option>
                    </select>
                    {selectedValue === 'All' && (inventoryData.length > 0 ? (
                      <div className="card shadow mb-4">
                        <div className="card-body">
                          <TablePagination
                            title=" Inventory Details"
                            headers={Header}
                            data={inventoryData}
                            columns="batchNumber.manufacturingDate.expiryDate.quantity"
                            perPageItemCount={5}
                            totalCount={inventoryData.length}
                            className="status"
                          />

                        </div>
                      </div>
                    ): <p>No Results Found</p>)}
                    {selectedValue === '24Hours' && (inventoryData24.length > 0 ? (
                      <div className="card shadow mb-4">
                        <div className="card-body">
                          <TablePagination
                            title=" Inventory Details"
                            headers={Header}
                            data={inventoryData24}
                            columns="batchNumber.manufacturingDate.expiryDate.quantity"
                            perPageItemCount={5}
                            totalCount={inventoryData24.length}
                            className="status"
                          />

                        </div>
                      </div>
                    ): <p>No Results Found</p>)}
                    {selectedValue === '3Months' && (inventoryData3Months.length > 0 ?  (
                      <div className="card shadow mb-4">
                        <div className="card-body">
                          <TablePagination
                            title=" Inventory Details"
                            headers={Header}
                            data={inventoryData3Months}
                            columns="batchNumber.manufacturingDate.expiryDate.quantity"
                            perPageItemCount={5}
                            totalCount={inventoryData3Months.length}
                            className="status"
                          />

                        </div>
                      </div>
                    ): <p>No Results Found</p>)}
                    {selectedValue === '6Months' && (inventoryData6Months.length > 0 ?(
                      <div className="card shadow mb-4">
                        <div className="card-body">
                          <TablePagination
                            title=" Inventory Details"
                            headers={Header}
                            data={inventoryData6Months}
                            columns="batchNumber.manufacturingDate.expiryDate.quantity"
                            perPageItemCount={5}
                            totalCount={inventoryData6Months.length}
                            className="status"
                          />

                        </div>
                      </div>
                    ): <p>No Results Found</p>)}

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
  return { user: state.user };
}

export default connect(mapStateToProps, {  })(Inventory);

