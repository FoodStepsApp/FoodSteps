import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {Table, Grid, Button, Form } from 'react-bootstrap';
import { Form, Button, Table, Input, Message } from 'semantic-ui-react';
import * as mservices from '../multichain/pharmalib';
import './Certificate.css';
import ipfs from './ipfs';
import QRCode from 'qrcode.react';
import axios from 'axios';
var result = '';


class Certificate extends Component {

    state = {
      ipfsHash:null,
      buffer:'',
      txnHash: '',
      eventDate: '',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
      fileName: '',
      eventName: '',
      actor: '',
      key: '',
    };

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        this.setState({ fileName: file.name });

        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)

      };


    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };

    onClick = async () => {

    try{
        this.setState({txnHash:"waiting.."});
        this.setState({eventDate:"waiting..."});

	await this.setState({ txnHash: result.txnHash, eventDate: result.eventDate });

//        await this.setState({txnHash: this.state.txReceipt.blockNumber});
//        await this.setState({eventDate: this.state.txReceipt.gasUsed});
      } 
    catch(error){
        console.log(error);
      } 
  } 

    onSubmit = async (event) => {
      event.preventDefault();

      //save document to IPFS,return its hash#, and set hash# to state
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);

        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });


    result =  mservices.storeIpfsHash(this.state.key, this.state.actor, this.state.ipfsHash);
//    this.setState({ txnHash: result.txnHash, eventDate: result.eventDate });

      }) //await ipfs.add 
    }; //onSubmit

    render() {
      const thStyle = {
        borderRight: '1px solid grey',
        width: '50%'
      }

      const tdStyle = {
        textOverflow: 'clip'
      }
      
      return (
        <div className="Certificate">
          <div style={{height: '90px', backgroundColor: '#0F95D8', textAlign: 'center', color: 'white'}}>
            <h2 style={{marginTop: '10px'}}>Certification with scBlockchain</h2>
            <h4 className="h2Size">Powered by StaTwig</h4>
          </div>

          <div>
            <h3> Choose file to add </h3>
            <Form onSubmit={this.onSubmit}>

          <Form.Field>
            <label className="w3-large">Select Role of Actor</label>
            <select className="w3-large" name="selectbreed"
              onChange={event =>
                this.setState({ actor: event.target.value })}>
                      <option name="" value="0">Role of Actor</option>
                      <option name="actor1"  value="Manufacturer">Manufacturer</option>
                      <option name="actor2"  value="Distributor">Distributor</option>
                      <option name="actor3"  value="Pharmacy">Pharmacy</option>
                      <option name="actor4"  value="Hospital">Hospital</option>
              </select>

          </Form.Field>

          <Form.Field>
            <label className="w3-large">Enter GTIN</label>
            <Input className="w3-large"
              label="Product GTIN"
              labelPosition="right"
              onChange={event =>
                this.setState({ key: event.target.value })
              }
            />
          </Form.Field>


              <div >
                <div style={{marginLeft: '-710px'}}>
                  <input type="file" name="file" id="file" className="inputfile" onChange = {this.captureFile}/>
                  <label for="file" className="hoverColor">
                    <i  className="fa fa-file-text" aria-hidden="true" style={{ fontSize: '80px' }}></i><br/>
                    Choose File
                  </label>
                  
                  <span className="certificateFileName">{this.state.fileName}</span>
		</div>
		<div style={{marginLeft: '80px', marginTop: '-135px'}}>
                  <button type="submit" className="certificateSumitBtn" >
                    <i className="fa fa-paper-plane-o" aria-hidden="true" style={{ fontSize: '80px' }}></i><br/>
                    Send It
                  </button >
		</div>
		<div style={{marginLeft: '770px', marginTop: '-125px'}}>
                  <QRCode value={`https://gateway.ipfs.io/ipfs/${this.state.ipfsHash}`} /> 
                </div>
              </div>
              

              
            </Form> 
               
          </div>

<br/>

          <div style={{maxHeight: '450px', backgroundColor: '#0F95D8'}}>
            <div className="w3-container w3-padding-24">
<br/>              <Button type="button" style={{backgroundColor: '#FFC300', color: 'black'}} onClick = {this.onClick}>Get Transaction Receipt</Button>
            </div>
           


            <div className="certificateTableBackground" style={{ borderRadius: '10px',  width: '100%',  maxWidth: '800px',  backgroundColor: 'white'}}>
              <div style={{marginTop: '20px'}} className="w3-hide-small">
                <Table className="w3-table w3-bordered">
                  <tbody>
                    <tr>
                      <th style={thStyle}>Tx Receipt Category</th>
                      <th>Values</th>
                    </tr>
                    <tr>
                      <th style={thStyle} className="w3-text-gray">IPFS Hash # stored on Blockchain</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.ipfsHash}</td>
                    </tr>


                    <tr>
                      <th style={thStyle} className="w3-text-gray">Tx Hash # </th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.txnHash}</td>
                    </tr>

                    <tr>
                      <th style={thStyle} className="w3-text-gray">Role of Actor</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.actor}</td>
                    </tr>

                    <tr>
                      <th style={thStyle} className="w3-text-gray">Associated Key/GTIN</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.key}</td>
                    </tr>

                    <tr>
                      <th style={thStyle} className="w3-text-gray">Event Date</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.eventDate}</td>
                    </tr>

                  </tbody>
                </Table>
              </div>
            </div>
            <br/><br/>
            
          </div>
        </div>
      );
    } 
}


export default Certificate;
