import React, { Component } from 'react';
import './Home.css';
import '../style/css/bootstrap1.min.css';




class Home extends Component {
  componentDidMount() {
    this.subscribeWebsockets();
  }

  subscribeWebsockets() {
    if (!this.ws) {
      const transactionWs = new WebSocket(
        "ws://localhost:5000/transfer"
      );

      this.transactionWs = transactionWs;

      transactionWs.onopen = () => {
        console.log("connected transaction websocket");
        if (transactionWs.OPEN === transactionWs.readyState) {
          transactionWs.send('test');
        }
      };
      transactionWs.onclose = () => {
        console.log("Transaction WS Disconnected");
      };
      transactionWs.onmessage = payload => {
        const response = JSON.parse(payload.data);
        console.log("transactions", response);
      };
    } else if (this.transactionWs) {
      this.transactionWs.close();
      this.transactionWs = null;
    }
  }
  render() {
    return (
      <div className="Background" style={{backgroundImage: require("./img/bg.jpg"), backgroundSize: "cover"}}>


      <main role="main" style={{minHeight: "600px"}}>
      
        <header>
           
            <div className="navbar navbar-dark bg-dark">
              <div className="container d-flex justify-content-between">
                <a href="#" className="navbar-brand d-flex align-items-center">
                  <img src={require('./img/logo.png')} width="200"/>
                </a>
                
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-light" href="#">About</a>
                    <a className="p-2 text-light" href="#">Insights</a>
                  </nav>
              </div>
            </div>

            
          </header>


        <section className="text-center" style={{marginTop: "20%"}}>
          <div className="container mt-3" style={{width:"60%"}}>
            
            <div className="input-group">
                <input type="text" style={{padding:"25px"}} className="form-control" placeholder="Search Wallet Address" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                  <button type="submit" onclick="location.href = 'index.html';" className="input-group-text" style={{backgroundColor: "#8cc310", color: "#fff"}} id="basic-addon2">Search</button>
                </div>
              </div>
          </div>
        </section>
      
        
      
      </main>
      
      <footer className="text-white text-center">
        <div className="container">
          
          <p style={{fontSize: "11px"}}>Copyright &copy; <img src={require('./img/statwig_logo.png')} style={{marginTop: "-5px", width:"70px"}}/> 2019</p>
        </div>
      </footer>




      </div>
    );
  }

}

export default Home;
