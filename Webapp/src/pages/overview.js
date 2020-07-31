import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import DonutChart from 'react-donut-chart';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import '../style/vendors/morris.js/morris.css';
import '../style/css/main.css';
import cookie from "react-cookies";

class Overview extends Component {
  state = { shipments: [], inventories: [] };

  componentDidMount() {
    this.fetchShipments();
    this.fetchInventories();
  }

  async fetchShipments() {
    const shipments = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=16dZeEVSn68G2kXxmiUdaTKDkQBr6c5k9nPDsY',
    );
    const username = cookie.load('userId');

    const shipmentData = shipments.data.items.filter(shipment => JSON.parse(shipment.data).username === username || JSON.parse(shipment.data).to === username);
    this.setState({ shipments: shipmentData });
  }
  async fetchInventories() {
    const inventories = await axios.get(
      'http://34.207.213.121:3500/queryDataByPublishers?stream=stream1&address=1GeUGrgyuqZjKz6p6yfyCKAMJgwxmN5cC74mmg',
    );
    const username = cookie.load('userId');

const inventoryData = inventories.data.items.filter(inventory => JSON.parse(inventory.data).username === username || JSON.parse(inventory.data).to === username);
    this.setState({ inventories: inventoryData });
  }


  renderShipments() {

    const shipmentsReverse = this.state.shipments.slice().reverse();

    const shipments = shipmentsReverse.slice(0,5);
    return shipments.map((shipment, index) => {
      const key = shipment.key.replace(/['"]+/g, '');
      const manufacturingData = JSON.parse(shipment.data)
      const shipmentDate = manufacturingData.Shipment_Date;
      return (
        <tr key={index}>
          <td>
            <Link onClick={() => this.props.history.push(`/shipping-to-tracking:${key}`)}>{key}</Link>
          </td>
          <td>{shipmentDate}</td>
          <td className="text-center">
            {index !== 0 ? <i className="fas fa-circle text-success" aria-hidden="true" /> : <i className="fas fa-circle text-warning" aria-hidden="true" />}
          </td>
        </tr>
      );
    });
  }

  renderInventories() {
    const inventoriesReverse = this.state.inventories.slice();
    const inventories = inventoriesReverse.slice(0,5);
    return inventories.map((inventory, index) => {
      const inventoryData = JSON.parse(inventory.data);
      const manufacturingDate = inventoryData.Manufacturing_Date;
      const quantity = inventoryData.Quantity;
      const productName = inventoryData.Product_Name;
      const batchNumber = inventoryData.Serial_Number;
      const key = inventory.key.replace(/['"]+/g, '');
      return (
        <tr key={index}>
          <td>{productName}</td>
          <td>{key}</td>
          <td>{manufacturingDate}</td>
          <td>{quantity}</td>
        </tr>
      );
    });
  }
  render() {
    const { shipments, inventories} = this.state;
    return (
      <div>
        <div id="wrapper" className="overview-block">
          <Navbar  selectedTab='overview'/>

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

                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary text-uppercase">
                          Transaction Overview
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
                        <DonutChart
                          colors={['green', 'blue']}
                          data={[
                            {
                              label: 'Shipped',
                              value: shipments.length,
                            },
                            {
                              label: 'Inventory',
                              value: inventories.length,
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary text-uppercase">
                          Recent Shipments
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
                            className="table table-bordered mb-5"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                          >
                            <thead>
                              <tr>
                                <th className="text-uppercase">
                                  Shipment Number
                                </th>
                                <th className="text-uppercase">
                                  Shipment Date
                                </th>
                                <th className="text-uppercase">Status</th>
                              </tr>
                            </thead>

                            <tbody>{this.renderShipments()}</tbody>
                          </table>
                          <hr />
                          <div className="text-center">
                            <Link to="/shipping" className="btn btn-link">
                              More Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary text-uppercase">
                          Recent Inventory
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
                            className="table mb-5"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                          >
                            <thead>
                              <tr>
                                <th className="text-uppercase">Product Name</th>
                                <th className="text-uppercase">Batch Number</th>
                                <th className="text-uppercase">
                                  Manufactured Date
                                </th>
                                <th className="text-uppercase">Quantity</th>
                              </tr>
                            </thead>

                            <tbody>{this.renderInventories()}</tbody>
                          </table>
                          <hr />
                          <div className="text-center">
                            <Link to="/inventory" className="btn btn-link">
                              More Details
                            </Link>
                          </div>
                        </div>
                      </div>
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

export default Overview;
