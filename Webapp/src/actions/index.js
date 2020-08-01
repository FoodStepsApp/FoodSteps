import axios from 'axios';
import cookie from "react-cookies";
//const url = "Blockchain_URL";
 const url = "Blockchain_PRDURL";  

export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";


export const fetchCurrentUser = (username) => async (dispatch) => {
  try{
    const response = await axios.get(`${url}/current_user_web?username=${username}`);
    dispatch({
      type: FETCH_CURRENT_USER,
      payload: response
    });
    return response;
  }catch (e) {
    if(!this.alertPresent)
    {
      alert('Vaccine Ledger Engine is not running. Please run Vaccine Ledger Engine');
      this.alertPresent = true;
    }
  }
};


export const loginUser = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    dispatch({
      type: FETCH_CURRENT_USER,
      payload: response
    });
    if(response.data) {
      cookie.save('userId', response.data.username, { path: '/' })
      history.push('/');
    }else {
      return false;
    }
  }catch (e) {
    return false;
  }
};


export const logOutUser = () => async (dispatch) => {
  const response = await axios.get(`${url}/logout`);
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: response
  });
};

export const FETCH_TOKENS = "FETCH_TOKENS";

export const fetchTokens = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/fetchTokensFrom?username=${username}`);
    dispatch({
      type: FETCH_TOKENS,
      payload: response
    });
  }catch (e) {
    alert('Vaccine Ledger Engine is not running. Please run Engine');
    this.alertPresent = true;
    return false;
  }
};


export const FETCH_FACILITY_USERS = "FETCH_FACILITY_USERS";

export const fetchFacilityUsers = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/fetchFacilityUsersWeb?username=${username}`);
    dispatch({
      type: FETCH_FACILITY_USERS,
      payload: response
    });
  }catch (e) {
    alert('Vaccine Ledger Engine is not running. Please run Engine');
    this.alertPresent = true;
    return false;
  }
};


export const sendTokensFrom = async data => {
  try {
    const response = await axios.post(`${url}/sendTokensFromWeb`, data);
    return response;
  }catch (e) {
    alert('Vaccine Ledger Engine is not running. Please run Engine');
    this.alertPresent = true;
    return false;
  }
};
