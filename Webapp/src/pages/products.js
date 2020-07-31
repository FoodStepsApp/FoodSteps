import React, { Component } from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';

import Navbar from '../components/Navbar';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import '../style/vendors/morris.js/morris.css';
import '../style/css/main.css';
import { connect } from 'react-redux';
const Header = ['From ', 'Bag Id', 'Shipment Date', 'Location'];
const WasteHeader = ['Bag Id', 'Location'];

let interval = 0;
class Products extends Component {
  state = {
    transactions: [],
    selectedTab: 'all',
    lostTransactions: [
      { bagId: '2903289870', location: 'Karimnagar' },
      { bagId: '4521879370', location: 'Miyapur' },
      { bagId: '1908326898', location: 'Gachibowli' },
      { bagId: '4890981726', location: 'Chintal' },
      { bagId: '3398761290', location: 'LB Nagar' },
      { bagId: '3876541938', location: 'Hayathnagar' },
      { bagId: '5839876345', location: 'Nanakramguda' },
      { bagId: '1984678383', location: 'Vanasthalipuram' },
      { bagId: '7736541739', location: 'Dilsukhnagar' },
    ],
    wasteTransactions: [
      { bagId: '9958873657', location: 'Karimnagar' },
      { bagId: '2284769028', location: 'Miyapur' },
      { bagId: '1908326898', location: 'Gachibowli' },
      { bagId: '2754897756', location: 'Chintal' },
      { bagId: '119457898', location: 'LB Nagar' },
      { bagId: '3396758987', location: 'Hayathnagar' },
      { bagId: '2298759987', location: 'Nanakramguda' },
      { bagId: '1984678383', location: 'Vanasthalipuram' },
      { bagId: '2945678819', location: 'Dilsukhnagar' },
    ],
  };
  componentDidMount() {
    this.fetchMobileTransactions();
    interval = setInterval(() => this.fetchMobileTransactions(), 5000);
  }
  async fetchMobileTransactions() {
    const { user } = this.props;
    const transactions = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=1a33ZAHJgVMTSQV4WttaCsus7kmzs3a4EgF8Xr',
    );

    const transactionsData = transactions.data.items.map(transaction => {
      const productData = JSON.parse(transaction.data);
      const from = productData.from;
      const bagId = productData.bagId;
      const shipmentDate = productData.shipmentDate;
      const location = productData.location;
      return { from, bagId, shipmentDate, location };
    });
    /* const filteredTransactions = transactionsData.filter(
      tx => tx.from === user.fullName || tx.to === user.fullName,
    );*/
    const filteredTransactionsReverse = transactionsData.slice().reverse();
    this.setState({ transactions: filteredTransactionsReverse });
  }

  componentWillUnmount() {
    clearInterval(interval);
  }
  render() {
    const { transactions, selectedTab, lostTransactions, wasteTransactions } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div id="wrapper">
          <Navbar selectedTab="products" />

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
                      placeholder="Search Product"
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
              </nav>
              <div className="container-fluid">
                <div className="row">
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
                          Role: ERP specialist
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="text-dark"> Recent Transactions </h3>
                    <nav className="mt-3">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className={selectedTab === 'all' ? "nav-item nav-link active" : "nav-item nav-link"}
                          id="nav-home-tab"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                          onClick={() => this.setState({ selectedTab: 'all' })}
                        >
                          All
                        </a>

                      <a
                        className={selectedTab === 'lost' ? "nav-item nav-link active" : "nav-item nav-link"}
                        id="nav-home-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                        onClick={() => this.setState({ selectedTab: 'lost' })}
                      >
                        Lost
                      </a>
                      <a
                        className={selectedTab === 'waste' ? "nav-item nav-link active" : "nav-item nav-link"}
                        id="nav-home-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                        onClick={() => this.setState({ selectedTab: 'waste' })}
                      >
                        Waste
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
                          {transactions.length > 0 && selectedTab === 'all' && (
                            <div className="card shadow mb-4">
                              <div className="card-body">
                                <TablePagination
                                  title="Product Inventory"
                                  headers={Header}
                                  data={transactions}
                                  columns="from.bagId.shipmentDate.location"
                                  perPageItemCount={5}
                                  totalCount={transactions.length}
                                  className="quantityTable"
                                />
                              </div>
                            </div>
                          )}{lostTransactions.length > 0 && selectedTab === 'lost' && (
                            <div className="card shadow mb-4">
                              <div className="card-body">
                                <TablePagination
                                  title="Lost Inventory"
                                  headers={WasteHeader}
                                  data={lostTransactions}
                                  columns="bagId.location"
                                  perPageItemCount={5}
                                  totalCount={lostTransactions.length}
                                  className="quantityTable"
                                />
                              </div>
                            </div>
                          )}{wasteTransactions.length > 0 && selectedTab === 'waste' && (
                            <div className="card shadow mb-4">
                              <div className="card-body">
                                <TablePagination
                                  title="Waste Inventory"
                                  headers={WasteHeader}
                                  data={wasteTransactions}
                                  columns="bagId.location"
                                  perPageItemCount={5}
                                  totalCount={wasteTransactions.length}
                                  className="quantityTable"
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
                <a className="btn btn-primary" href="/">
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
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, {})(Products);
