import React, { Component } from 'react';
import { TablePagination } from 'react-pagination-table';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import '../style/progressbar/loading-bar.css';
import '../style/vendor/datatables/dataTables.bootstrap4.min.css';
import Navbar from '../components/Navbar';
import axios from 'axios/index';
import {connect} from "react-redux";
import {fetchFacilityUsers, fetchTokens} from "../actions";
import cookie from "react-cookies";

const Header = [
  'Batch Number',
  'Manufactured Date ',
  'Expiry Date',
  'Quantity',
];
class InventoryToTracking extends Component {
  state = { filteredInventoryData: [] };

  componentDidMount() {
    this.fetchInventories();
    const username = cookie.load('userId');
    this.props.fetchTokens(username);
  }

  async fetchInventories() {
    const inventories = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=1Cnj19qqNK6hNxRFGWcveBtT9W4XQt52Tnoj5S',
    );
    const inventoryData = inventories.data.items.map(inventory => {
      const inventoryData = JSON.parse(inventory.data);
      const manufacturingDate = inventoryData.Manufacturing_Date;
      const quantity = inventoryData.Quantity;
      const productName = inventoryData.Product_Name;
      const batchNumber = inventoryData.Serial_Number;
      const expiryDate = inventoryData.Expiring_Date;
      debugger;

      const key = inventory.key.replace(/['"]+/g, '');
      return {
        batchNumber: key,
        productName,
        quantity,
        manufacturingDate,
        expiryDate,
      };
    });
    const filteredInventoryData = inventoryData.filter(inventory => {
      const id = this.props.match.params.id.replace(':', '');
      if (inventory.productName && inventory.productName.toLowerCase().indexOf(id) > -1) {
        return true;
      }
      return false;
    });
    debugger;

    this.setState({ filteredInventoryData });
  }

  render() {
    const { filteredInventoryData } = this.state;
    const { user } = this.props;
    return (
      <div>
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
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    Inventory Details of Product { this.props.match.params.id.toUpperCase() }
                  </h1>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    {filteredInventoryData.length > 0 ? (
                      <div className="card shadow mb-4">
                        <div className="card-body">
                          <TablePagination
                            title=" Inventory Details"
                            headers={Header}
                            data={filteredInventoryData}
                            columns="batchNumber.manufacturingDate.expiryDate.quantity"
                            perPageItemCount={5}
                            totalCount={filteredInventoryData.length}
                          />
                        </div>
                      </div>
                    ) : <div>No Results found</div>}
                  </div>
                </div>
              </div>

              <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright &copy; STATWIG 2019</span>
                  </div>
                </div>
              </footer>
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

          <div
            className="modal"
            id="tracKing-pop"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Tracking Details
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
                  <div
                    data-type="fill"
                    data-fill-dir="ltr"
                    data-img="img/delivery-truck.svg"
                  />
                </div>
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

export default connect(mapStateToProps, { fetchTokens })(InventoryToTracking);
