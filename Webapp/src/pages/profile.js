import React, { Component } from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';

import Navbar from '../components/Navbar';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import '../style/vendors/morris.js/morris.css';
import '../style/css/main.css';
import { fetchTokens } from "../actions";
import { connect } from "react-redux";
import cookie from "react-cookies";
const Header = ['Transaction ID', 'From ', 'To', 'Product', 'Value', 'Shipment Date'];
let interval = 0;

class Profile extends Component {
  state = { transactions: [] };

  componentDidMount() {
    this.fetchMobileTransactions();
    const username = cookie.load('userId');
    this.props.fetchTokens(username);
    interval = setInterval(() => this.fetchMobileTransactions(), 5000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  async fetchMobileTransactions() {
    const { user } = this.props;
    const transactions = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=1H6neBDJYweUoUyRjpiBYAcQ1yZdhW5RWgnZuw',
    );

    const transactionsData = transactions.data.items.map(transaction => {
      const manufacturingData = JSON.parse(transaction.data);
      const from = manufacturingData.from;
      const to = manufacturingData.to;
      const transactionId = manufacturingData.transactionId;
      const quantity = manufacturingData.quantity;
      const shipmentDate = manufacturingData.shipmentDate;
      const product = manufacturingData.vaccineName;
      return { from, to, transactionId, shipmentDate, quantity, product };
    });
    const filteredTransactions = transactionsData.filter(tx => tx.from === this.props.user.fullName || tx.to === this.props.user.fullName);
    const filteredTransactionsReverse = filteredTransactions.slice().reverse();
    this.setState({ transactions: filteredTransactionsReverse });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.fullName !== nextProps.user.fullName) {
      this.fetchMobileTransactions();
    }
  }
  render() {
    const { transactions } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div id="wrapper">
          <Navbar selectedTab='profile' />

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav
                className="navbar navbar-expand topbar mb-4 static-top"
                style={{ backgroundColor: 'white' }}
              >
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars" />
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search Wallet Address"
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
                  </li>
                </ul>
              </nav>
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h6
                    className="h6 mb-0 cust-text"
                    style={{ fontWeight: 'normal' }}
                  >
                    Wallet Address:{' '}
                    <span style={{ fontWeight: 'lighter !important' }}>
                      {user.address}
                    </span>
                  </h6>
                </div>

                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="card mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold cust-text">
                          Product's Details
                        </h6>
                        <div className="dropdown no-arrow">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <div className="dropdown-header">
                              Dropdown Header:
                            </div>
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellspacing="0"
                          >
                            <thead>
                              <tr>
                                <th>Product Type</th>
                                <th>Balance</th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td>bOPV</td>
                                <td>{user.tokens}</td>
                              </tr>
                              <tr>
                                <td>BCG</td>
                                <td>15,776</td>
                              </tr>
                              <tr>
                                <td>MMR</td>
                                <td>19,397</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6">
                    <div className="card mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold cust-text">
                          Profile
                        </h6>
                        <div className="dropdown no-arrow">
                          <a
                            className="dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <div className="dropdown-header">
                              Dropdown Header:
                            </div>
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-center cust-text">
                        <img
                          src={user.imageUrl}
                          className="img-profile rounded-circle"
                          width="150"
                        />
                        <p className="mt-2 mb-1">Name: {user.fullName}</p>
                        <span style={{ fontWeight: 'lighter' }}>
                          Role: {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <nav className="mt-3">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className="nav-item nav-link active"
                          id="nav-home-tab"
                          data-toggle="tab"
                          href="#nav-home"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Recent Transactions
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane bg-white fade show active p-3"
                        style={{
                          border: '1px solid #e3e6f0',
                          borderTop: 'none',
                        }}
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <div className="card-body">
                          {transactions.length > 0 && (
                            <div className="card shadow mb-4">
                              <div className="card-body">
                                <TablePagination
                                  title=" Shipping Details"
                                  headers={Header}
                                  data={transactions}
                                  columns="transactionId.from.to.product.quantity.shipmentDate"
                                  perPageItemCount={5}
                                  totalCount={transactions.length}
                                  className="quantityTable status"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="tab-pane bg-white fade p-3"
                        style={{
                          border: '1px solid #e3e6f0',
                          borderTop: 'none',
                        }}
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <div className="card-body">
                          <div className="chart-area">
                            <div
                              id="container"
                              style={{ height: '350px', minWidth: '310px' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default connect(mapStateToProps, { fetchTokens })(Profile);
