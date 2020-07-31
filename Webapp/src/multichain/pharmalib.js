import axios from 'axios';

const baseUrl1 = 'http://34.207.213.121:3500';
const baseUrl2 = 'http://18.206.182.42:3500';

export async function makeCase(caseID, madeBy, srcLocation, bottleList) {
    var result = {
        txnHash: '',
        eventDate: '',
        errorMsg: '',
    };
    try {
        result.eventDate = new Date().toLocaleString();
        var dataArgs = {
            stream: 'pharmademo1',
            key: caseID,
            data: {
                date: result.eventDate,
                actor: 'manufacturer',
                eventName: 'makeCase',
                userID: '001',
                location: srcLocation,
                bottleList: bottleList,
            },
        };
        var res = await axios.post(baseUrl1 + '/publish', dataArgs);
        console.log('Hash:' + res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;
    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}

export async function shipCase(caseID, shippedBy, shippedTo, destLocation) {
    var result = {
        txnHash: '',
        eventDate: '',
        errorMsg: '',
    };
    try {
        result.eventDate = new Date().toLocaleString();

        var dataArgs = {
            stream: 'pharmademo1',
            key: caseID,
            data: {
                date: result.eventDate,
                actor: shippedBy,
                userID: '001',
                eventName: 'shipCase',
                shippedTo,
                destLocation,
            },
        };

        var res = await axios.post(baseUrl1 + '/publish', dataArgs);
        console.log('Hash:' + res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;
    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}

export async function receiveCase(caseID, receivedBy, shippedBy) {
    var result = {
        txnHash: '',
        eventDate: '',
        errorMsg: '',
    };
    try {
        result.eventDate = new Date().toLocaleString();

        var dataArgs = {
            stream: 'pharmademo1',
            key: caseID,
            data: {
                date: result.eventDate,
                actor: shippedBy,
                userID: '001',
                eventName: 'receiveCase',
            },
        };

        var res = await axios.post(baseUrl1 + '/publish', dataArgs);
        console.log('Hash:' + res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;
    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}

export async function verifyCase(caseID, requestBy, requestTo, callback) {
    var result = {
        txnHash: '',
        eventDate: '',
        errorMsg: '',
    };
    try {
        var dataArgs = {
            stream: 'pharmademo1',
            key: caseID,
            data: {
                date: result.eventDate,
                actor: requestBy,
                userID: '001',
                eventName: 'verifyCase',
                requestTo,
            },
        };
        var res = await axios.post(baseUrl1 + '/publish', dataArgs);
        console.log('Hash:' + res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;
    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}

export async function returnCase(caseID, bottleList, returnBy, returnTo) {
    var result = {
        txnHash: '',
        eventDate: '',
        errorMsg: '',
    };
    try {
        var dataArgs = {
            stream: 'pharmademo1',
            key: caseID,
            data: {
                date: result.eventDate,
                actor: returnBy,
                userID: '001',
                eventName: 'returnCase',
                returnTo,
                bottleList,
            },
        };
        var res = await axios.post(baseUrl1 + '/publish', dataArgs);
        console.log('Hash:' + res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;
    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}

//alertID is created by taking the current date & time stamp and the case ID
export async function recordAlert(caseID, alertType, alertValue, location) {
    var result = {
        txnHash: '',
        eventDate: '',
        errorMsg: '',
    };

    try {
        var dataArgs = {
            stream: 'pharmademo1',
            key: caseID,
            data: {
                date: result.eventDate,
                actor: 'sensorAdmin',
                userID: 'sensorAdmin', //we don't have multiple distributors to differentiate at the moment.
                eventName: 'alert',
                alertType,
                alertValue,
                location,
            },
        };

        var res = await axios.post(baseUrl1 + '/publish', dataArgs);
        console.log('Hash:' + res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;
    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}

export async function getCaseData(stream, txid) {
    const dataArgs = {params: {stream, txid}};
    const result = await axios.get(baseUrl1 + '/fetchDataFromTx', dataArgs);
    return JSON.parse(result.data);
}


export async function storeIpfsHash(caseID, role, ipfsHash) { //madeBy == role, caseID = GTIN
    var result  = {
        txnHash: '',
        eventDate: '',
        errorMsg: ''
    };
    try {
        result.eventDate = new Date().toLocaleString();
        var addr = '';
        if (role == "manufacturer") {
            addr = "14KXNhJU39LoySeMiMthXpng26SqHs6qzpQSuH";
        } else if (role == "distributor") {
            addr = "1QCamTNVHEoyxs8Ave43Ffy2M1WZJgyPux8CmA";
        }
        var dataArgs = {
            stream: "ipfs_stream",
            key: caseID,
            data : {
                date: result.eventDate,
                actor: role,
                eventName: "storeIPFS",
                address: addr,
                ipfsHash: ipfsHash
            }
        }
        var res = await axios.post(baseUrl1 + "/publish", dataArgs);
        console.log("Hash:"+res.data.transactionId);

        result.txnHash = res.data.transactionId;
        result.errorMsg = res.error;


    } catch (err) {
        result.errorMsg = err.message.split('\n')[0];
    }
    return result;
}


export async function detectIpfsDuplicacy(keyReceived) {

    var stream = 'ipfs_stream';
    const ipfsData = await axios.listStreamKeyItems({
        stream,
        keyReceived,
        verbose: true
    }, (err, data) => {
//        res.setHeader('Access-Control-Allow-Origin', '*');
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });

//        res.json({items: data});
    });

   return ipfsData;
}


export async function detectLocationDuplicacy(keyReceived) {

    var stream = 'location_stream';
    const ipfsData = await axios.listStreamKeyItems({
        stream,
        keyReceived,
        verbose: true
    }, (err, data) => {
//        res.setHeader('Access-Control-Allow-Origin', '*');
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });

//        res.json({items: data});
    });

   return ipfsData;
}

