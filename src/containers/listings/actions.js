import axios from 'axios';

import {
  GET_LISTINGS_REQUEST,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_FAILURE
} from '../../constants/actionTypes';


export const getListings = () => async dispatch => {
  dispatch({ type: GET_LISTINGS_REQUEST });
  try {
    const { data } = await axios.get('https://linniaserver.com/records');
    dispatch({ type: GET_LISTINGS_SUCCESS, data })
  } catch (err) {
    dispatch({ type: GET_LISTINGS_FAILURE, err })
  }
}
