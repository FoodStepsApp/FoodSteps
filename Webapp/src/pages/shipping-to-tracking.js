import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/css/sb-admin-2.min.css';
import '../style/js/vectormap/jquery-jvectormap-2.0.3.css';
import '../style/progressbar/loading-bar.css';
import '../style/vendor/datatables/dataTables.bootstrap4.min.css';
import '../style/css/shippingToTracking.css';
import Navbar from '../components/Navbar';
import geoImage from '../assets/images/geotracking.jpg';
import temperatureImage from '../assets/images/temperatureImage.jpg';
import { connect } from 'react-redux';
import { fetchTokens } from '../actions';
import cookie from 'react-cookies';
import SimpleMap from '../components/SimpleMap';

const serialNumbers = [];
class Popup extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          width: '35%',
          height: '50%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          backgroundColor: '#fff',
          borderRadius: 10,
          border: 'groove',
        }}
      >
        <button onClick={this.props.closePopup} style={{ float: 'right' }}>
          X
        </button>
        <div className="row justify-content-between">
          <table style={{ marginTop: 20, marginLeft: 20 }}>
            <tbody style={{ textAlign: 'left', paddingLeft: '10px' }}>
              <tr>
                <td>Product Type</td>
                <td style={{ color: 'black' }}>bOPV</td>
              </tr>
              <tr>
                <td>Batch Number</td>
                <td style={{ color: 'black' }}>70130433402587</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            overflow: 'scroll',
            height: '150px',
          }}
        >
          <table>
            <thead>
              <th
                style={{ textAlign: 'left', paddingLeft: 10, paddingRight: 10 }}
              >
                Serial Number{' '}
              </th>
              <th
                style={{ textAlign: 'left', paddingLeft: 10, paddingRight: 10 }}
              >
                Manufactured Date{' '}
              </th>
              <th
                style={{ textAlign: 'left', paddingLeft: 10, paddingRight: 10 }}
              >
                Expiry Date{' '}
              </th>
            </thead>
            <tbody style={{ textAlign: 'left' }}>
              {serialNumbers.map(serialNumber => (
                <tr>
                  <td style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {serialNumber.number}
                  </td>
                  <td style={{ paddingLeft: 40, paddingRight: 20 }}>
                    {serialNumber.manufacturedDate}
                  </td>
                  <td style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {serialNumber.expiryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* </div> */}
      </div>
    );
  }
}

class ShippingToTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      data: [
        {
          id: 1,
          date: '22/12/2019',
          time: '10:20',
          location: 'Gachibowli',
          status: 'In Transit',
        },
        {
          id: 2,
          date: '21/12/2019',
          time: '21:20',
          location: 'Hayathnagar',
          status: 'Delivered',
        },
        {
          id: 3,
          date: '20/12/2019',
          time: '8:30',
          location: 'Vijayawada',
          status: 'Delivered',
        },
        {
          id: 4,
          date: '19/12/2019',
          time: '5:30',
          location: 'Vijayawada',
          status: 'Added Inventory by the manufacturer',
        },
      ],
    };
  }

  componentDidMount() {
    const username = cookie.load('userId');
    this.props.fetchTokens(username);
    for (let i = 0; i < 99; i++) {
      serialNumbers.push({
        number: `BPOV777410100${i}`,
        manufacturedDate: '10/10/2019',
        expiryDate: '12/12/2022',
      });
    }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  render() {
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

              <div className="container-fluid row m-0 ">
                <div className="col-6 left-block">
                  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Chain of Custody</h1>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card mb-4">
                        <div className="card-body text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="400.016"
                            height="167.306"
                            viewBox="0 0 973.016 167.306"
                          >
                            <defs />
                            <g id="icons" transform="translate(-1230 -696)">
                              <rect
                                id="Line"
                                className="cls-1"
                                width="4.403"
                                height="101.264"
                                transform="translate(1500.771 770.452) rotate(90)"
                              />
                              <rect
                                id="Line-2"
                                data-name="Line"
                                className="cls-2"
                                width="4.403"
                                height="101.264"
                                transform="translate(1769.341 770.452) rotate(90)"
                              />
                              <rect
                                id="Line-3"
                                data-name="Line"
                                className="cls-2"
                                width="4.403"
                                height="101.264"
                                transform="translate(2037.911 770.452) rotate(90)"
                              />
                              <g id="Icon" transform="translate(2035.71 696)">
                                <g id="Ellipse" className="cls-3">
                                  <circle
                                    className="cls-7"
                                    cx="83.653"
                                    cy="83.653"
                                    r="83.653"
                                  />
                                  <circle
                                    className="cls-8"
                                    cx="83.653"
                                    cy="83.653"
                                    r="83.153"
                                  />
                                </g>
                                <path
                                  id="ic_person_24px"
                                  className="cls-4"
                                  d="M44.37,44.37A20.185,20.185,0,1,0,24.185,24.185,20.179,20.179,0,0,0,44.37,44.37Zm0,10.092C30.9,54.462,4,61.224,4,74.647V84.74H84.74V74.647C84.74,61.224,57.843,54.462,44.37,54.462Z"
                                  transform="translate(38.92 39.63)"
                                />
                              </g>
                              <g
                                id="Icon-2"
                                data-name="Icon"
                                transform="translate(1767.14 696)"
                              >
                                <g
                                  id="Ellipse-2"
                                  data-name="Ellipse"
                                  className="cls-3"
                                >
                                  <circle
                                    className="cls-7"
                                    cx="83.653"
                                    cy="83.653"
                                    r="83.653"
                                  />
                                  <circle
                                    className="cls-8"
                                    cx="83.653"
                                    cy="83.653"
                                    r="83.153"
                                  />
                                </g>
                              </g>
                              <g
                                id="Icon-3"
                                data-name="Icon"
                                transform="translate(1498.57 696)"
                              >
                                <g
                                  id="Ellipse-3"
                                  data-name="Ellipse"
                                  className="cls-5"
                                  transform="translate(0 0)"
                                >
                                  <circle
                                    className="cls-7"
                                    cx="83.653"
                                    cy="83.653"
                                    r="83.653"
                                  />
                                  <circle
                                    className="cls-8"
                                    cx="83.653"
                                    cy="83.653"
                                    r="83.153"
                                  />
                                </g>
                              </g>
                              <g
                                id="Icon-4"
                                data-name="Icon"
                                transform="translate(1230 696)"
                              >
                                <g
                                  id="Ellipse-4"
                                  data-name="Ellipse"
                                  className="cls-6"
                                >
                                  <path
                                    className="cls-7"
                                    d="M 83.65292358398438 166.8058471679688 C 78.01078033447266 166.8058471679688 72.37232208251953 166.2374420166016 66.89417266845703 165.1164703369141 C 61.55552673339844 164.0240020751953 56.30423736572266 162.3939208984375 51.28621673583984 160.271484375 C 46.35917282104492 158.1875 41.60698699951172 155.6081085205078 37.16169357299805 152.6049194335938 C 32.75848770141602 149.6301727294922 28.6179027557373 146.2138824462891 24.85492324829102 142.450927734375 C 21.09196472167969 138.6879425048828 17.67567443847656 134.54736328125 14.70092391967773 130.1441497802734 C 11.69773578643799 125.698860168457 9.118340492248535 120.9466705322266 7.034360885620117 116.0196304321289 C 4.911923408508301 111.0016098022461 3.281840324401855 105.7503204345703 2.189381837844849 100.4116744995117 C 1.068402767181396 94.93352508544922 0.5000069141387939 89.29506683349609 0.5000069141387939 83.65292358398438 C 0.5000069141387939 78.01078033447266 1.068402767181396 72.37232208251953 2.189381837844849 66.89417266845703 C 3.281840324401855 61.55552673339844 4.911923408508301 56.30423736572266 7.034360885620117 51.28621673583984 C 9.118340492248535 46.35917282104492 11.69773578643799 41.60698699951172 14.70092391967773 37.16169357299805 C 17.67567443847656 32.75848770141602 21.09196472167969 28.6179027557373 24.85492324829102 24.85492324829102 C 28.6179027557373 21.09196472167969 32.75848770141602 17.67567443847656 37.16169357299805 14.70092391967773 C 41.60698699951172 11.69773578643799 46.35917282104492 9.118340492248535 51.28621673583984 7.034360885620117 C 56.30423736572266 4.911923408508301 61.55552673339844 3.281840324401855 66.89417266845703 2.189381837844849 C 72.37232208251953 1.068402767181396 78.01078033447266 0.5000069141387939 83.65292358398438 0.5000069141387939 C 89.29506683349609 0.5000069141387939 94.93352508544922 1.068402767181396 100.4116744995117 2.189381837844849 C 105.7503204345703 3.281840324401855 111.0016098022461 4.911923408508301 116.0196304321289 7.034360885620117 C 120.9466705322266 9.118340492248535 125.698860168457 11.69773578643799 130.1441497802734 14.70092391967773 C 134.54736328125 17.67567443847656 138.6879425048828 21.09196472167969 142.450927734375 24.85492324829102 C 146.2138824462891 28.6179027557373 149.6301727294922 32.75848770141602 152.6049194335938 37.16169357299805 C 155.6081085205078 41.60698699951172 158.1875 46.35917282104492 160.271484375 51.28621673583984 C 162.3939208984375 56.30423736572266 164.0240020751953 61.55552673339844 165.1164703369141 66.89417266845703 C 166.2374420166016 72.37232208251953 166.8058471679688 78.01078033447266 166.8058471679688 83.65292358398438 C 166.8058471679688 89.29506683349609 166.2374420166016 94.93352508544922 165.1164703369141 100.4116744995117 C 164.0240020751953 105.7503204345703 162.3939208984375 111.0016098022461 160.271484375 116.0196304321289 C 158.1875 120.9466705322266 155.6081085205078 125.698860168457 152.6049194335938 130.1441497802734 C 149.6301727294922 134.54736328125 146.2138824462891 138.6879425048828 142.450927734375 142.450927734375 C 138.6879425048828 146.2138824462891 134.54736328125 149.6301727294922 130.1441497802734 152.6049194335938 C 125.698860168457 155.6081085205078 120.9466705322266 158.1875 116.0196304321289 160.271484375 C 111.0016098022461 162.3939208984375 105.7503204345703 164.0240020751953 100.4116744995117 165.1164703369141 C 94.93352508544922 166.2374420166016 89.29506683349609 166.8058471679688 83.65292358398438 166.8058471679688 Z"
                                  />
                                  <path
                                    className="cls-9"
                                    d="M 83.65292358398438 0.9999847412109375 C 78.04438018798828 0.9999847412109375 72.43964385986328 1.564971923828125 66.99442291259766 2.679229736328125 C 61.68807220458984 3.765060424804688 56.46862030029297 5.385269165039062 51.48098754882812 7.494857788085938 C 46.58366394042969 9.566253662109375 41.86013793945312 12.13009643554688 37.44157409667969 15.115234375 C 33.06474304199219 18.0721435546875 28.94894409179688 21.468017578125 25.20846557617188 25.20846557617188 C 21.468017578125 28.94894409179688 18.0721435546875 33.06474304199219 15.115234375 37.44157409667969 C 12.13009643554688 41.86013793945312 9.566253662109375 46.58366394042969 7.494857788085938 51.48098754882812 C 5.385269165039062 56.46862030029297 3.765060424804688 61.68807220458984 2.679229736328125 66.99442291259766 C 1.564971923828125 72.43964385986328 0.9999847412109375 78.04438018798828 0.9999847412109375 83.65292358398438 C 0.9999847412109375 89.26146697998047 1.564971923828125 94.86620330810547 2.679229736328125 100.3114242553711 C 3.765060424804688 105.6177520751953 5.385269165039062 110.8372268676758 7.494857788085938 115.8248596191406 C 9.566253662109375 120.72216796875 12.13009643554688 125.4457092285156 15.115234375 129.8642578125 C 18.0721435546875 134.2410736083984 21.468017578125 138.3569030761719 25.20846557617188 142.0973510742188 C 28.94894409179688 145.8378143310547 33.06474304199219 149.2336883544922 37.44157409667969 152.1905975341797 C 41.86013793945312 155.1757202148438 46.58366394042969 157.7395782470703 51.48098754882812 159.8109741210938 C 56.46862030029297 161.9205474853516 61.68807220458984 163.540771484375 66.99442291259766 164.6266021728516 C 72.43964385986328 165.7408599853516 78.04438018798828 166.3058319091797 83.65292358398438 166.3058319091797 C 89.26146697998047 166.3058319091797 94.86620330810547 165.7408599853516 100.3114242553711 164.6266021728516 C 105.6177520751953 163.540771484375 110.8372268676758 161.9205474853516 115.8248596191406 159.8109741210938 C 120.72216796875 157.7395782470703 125.4457092285156 155.1757202148438 129.8642578125 152.1905975341797 C 134.2410736083984 149.2336883544922 138.3569030761719 145.8378143310547 142.0973510742188 142.0973510742188 C 145.8378143310547 138.3569030761719 149.2336883544922 134.2410736083984 152.1905975341797 129.8642578125 C 155.1757202148438 125.4457092285156 157.7395782470703 120.72216796875 159.8109741210938 115.8248596191406 C 161.9205474853516 110.8372268676758 163.540771484375 105.6177520751953 164.6266021728516 100.3114242553711 C 165.7408599853516 94.86620330810547 166.3058319091797 89.26146697998047 166.3058319091797 83.65292358398438 C 166.3058319091797 78.04438018798828 165.7408599853516 72.43964385986328 164.6266021728516 66.99442291259766 C 163.540771484375 61.68807220458984 161.9205474853516 56.46862030029297 159.8109741210938 51.48098754882812 C 157.7395782470703 46.58366394042969 155.1757202148438 41.86013793945312 152.1905975341797 37.44157409667969 C 149.2336883544922 33.06474304199219 145.8378143310547 28.94894409179688 142.0973510742188 25.20846557617188 C 138.3569030761719 21.468017578125 134.2410736083984 18.0721435546875 129.8642578125 15.115234375 C 125.4457092285156 12.13009643554688 120.72216796875 9.566253662109375 115.8248596191406 7.494857788085938 C 110.8372268676758 5.385269165039062 105.6177520751953 3.765060424804688 100.3114242553711 2.679229736328125 C 94.86620330810547 1.564971923828125 89.26146697998047 0.9999847412109375 83.65292358398438 0.9999847412109375 M 83.65292358398438 -1.52587890625e-05 C 129.8531494140625 -1.52587890625e-05 167.3058319091797 37.45268249511719 167.3058319091797 83.65292358398438 C 167.3058319091797 129.8531494140625 129.8531494140625 167.3058319091797 83.65292358398438 167.3058319091797 C 37.45268249511719 167.3058319091797 -1.52587890625e-05 129.8531494140625 -1.52587890625e-05 83.65292358398438 C -1.52587890625e-05 37.45268249511719 37.45268249511719 -1.52587890625e-05 83.65292358398438 -1.52587890625e-05 Z"
                                  />
                                </g>
                                <path
                                  id="ic_location_city_24px"
                                  className="cls-1"
                                  d="M62.822,46.867V16.956L47.867,2,32.911,16.956v9.97H3V96.719H92.734V46.867ZM22.941,86.748H12.97v-9.97h9.97Zm0-19.941H12.97v-9.97h9.97Zm0-19.941H12.97V36.9h9.97ZM52.852,86.748h-9.97v-9.97h9.97Zm0-19.941h-9.97v-9.97h9.97Zm0-19.941h-9.97V36.9h9.97Zm0-19.941h-9.97v-9.97h9.97ZM82.763,86.748h-9.97v-9.97h9.97Zm0-19.941h-9.97v-9.97h9.97Z"
                                  transform="translate(36.133 34.141)"
                                />
                              </g>
                              <path
                                id="ic_store_mall_directory_24px"
                                className="cls-4"
                                d="M73.2,4H7.129v8.259H73.2Zm4.129,41.295V37.036L73.2,16.388H7.129L3,37.036v8.259H7.129V70.071H48.424V45.295H64.942V70.071H73.2V45.295ZM40.165,61.812H15.388V45.295H40.165Z"
                                transform="translate(1790.246 742.964)"
                              />
                              <path
                                id="ic_local_shipping_24px"
                                className="cls-4"
                                d="M29.4,9.978H24.914V4H3.989A3,3,0,0,0,1,6.989V23.43H3.989a4.484,4.484,0,0,0,8.968,0h8.968a4.484,4.484,0,0,0,8.968,0h2.989V15.957ZM8.473,25.672a2.242,2.242,0,1,1,2.242-2.242A2.239,2.239,0,0,1,8.473,25.672ZM28.651,12.22l2.929,3.737H24.914V12.22ZM26.409,25.672a2.242,2.242,0,1,1,2.242-2.242A2.239,2.239,0,0,1,26.409,25.672Z"
                                transform="translate(1874.835 784.259)"
                              />
                              <path
                                id="ic_local_airport_24px"
                                className="cls-1"
                                d="M87.692,65.142v-9.02L51.611,33.571V8.765a6.765,6.765,0,1,0-13.53,0V33.571L2,56.121v9.02L38.081,53.866V78.672l-9.02,6.765V92.2l15.785-4.51L60.631,92.2V85.437l-9.02-6.765V53.866Z"
                                transform="matrix(0.574, 0.819, -0.819, 0.574, 1595.36, 714.248)"
                              />
                            </g>
                          </svg>

                          <table className="table table-tasklist ">
                            <thead>
                              <th>Date </th>
                              <th> Time </th>
                              <th>Locations </th>
                              <th>Status </th>
                            </thead>
                            <tbody>
                              {this.state.data.map((x, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{x.date}</td>
                                    <td>{x.time}</td>
                                    <td>{x.location}</td>
                                    <td>{x.status}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          {/* <div className="row">
                            <div className="col-6 left-block m-0">
                            <a style={{color:'black'}}>Shipment Details</a>
                            <div className="row">
                              {/* <p> Shipment Number</a>
                              <p>Client Name</a>
                              <div className="left-block m-0">
                              Shipment Number
                              <span> hi</span>
                              </div>
                              <div className="col-6 left-block m-0">
                              Client Name
                              </div>

                            </div>

                            </div>
                          </div> */}
                          <table>
                            <thead>
                              <th style={{ textAlign: 'left', color: 'black' }}>
                                Shipment Details{' '}
                              </th>
                              <th> </th>
                            </thead>
                            <tbody style={{ textAlign: 'left' }}>
                              <tr>
                                <td>Shipment Number</td>
                                <td style={{ color: 'black' }}>
                                  {this.props.location.pathname.substr(22)}
                                </td>
                              </tr>
                              <tr>
                                <td>Client Name</td>
                                <td style={{ color: 'black' }}>Unicef</td>
                              </tr>
                            </tbody>
                          </table>

                          <table style={{ marginTop: '5%' }}>
                            <thead>
                              <th style={{ textAlign: 'left', color: 'black' }}>
                                Shipment Details
                              </th>
                              <th> </th>
                            </thead>
                            <tbody style={{ textAlign: 'left' }}>
                              <tr>
                                <td>Product Type</td>
                                <td style={{ color: 'black' }}>bOPV</td>
                              </tr>
                              <tr>
                                <td>Batch Number</td>
                                <td style={{ color: 'black' }}>
                                  70130433402587
                                </td>
                              </tr>
                              <tr>
                                <td>Serial Number</td>
                                <td style={{ color: 'black' }}>
                                  BPOV7774101000
                                </td>
                              </tr>
                              <tr>
                                <td>Quantity</td>
                                <td style={{ color: 'black' }}>450 </td>
                              </tr>
                              <tr>
                                <td>Manufactured Date</td>
                                <td style={{ color: 'black' }}> 01/04/2019</td>
                              </tr>
                              <tr>
                                <td>Expiry Date</td>
                                <td style={{ color: 'black' }}>26/06/2023</td>
                              </tr>
                            </tbody>

                            <div>
                              <button
                                onClick={this.togglePopup.bind(this)}
                                type="button"
                                style={{
                                  color: '#259897',
                                  borderWidth: 1,
                                  borderColor: '#259897',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: 5,
                                  float: 'right',
                                  marginTop: '20%',
                                }}
                              >
                                View Serial Number
                              </button>
                            </div>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 right-block">
                  <div className="col">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Geographical Tracking
                        </h6>
                      </div>
                      <SimpleMap />
                    </div>
                  </div>

                  <div className="col">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Temperature Details
                        </h6>
                      </div>
                      <div className="card-body">
                        <img src={temperatureImage} width={500} height={360} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.showPopup ? (
                <Popup
                  text="Close Me"
                  closePopup={this.togglePopup.bind(this)}
                />
              ) : null}

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
  return { user: state.user };
}

export default connect(mapStateToProps, { fetchTokens })(ShippingToTracking);
