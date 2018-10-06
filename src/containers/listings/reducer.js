import {
  GET_LISTINGS_REQUEST,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_FAILURE
} from '../../constants/actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS_REQUEST:
      return {
        ...state,
        listingsLoading: true,
        listingsLoaded: false,
        listingsSuccess: false,
      }
    case GET_LISTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
        listingsLoading: false,
        listingsLoaded: true,
        listingsSuccess: true,
      }
    case GET_LISTINGS_FAILURE:
      return {
        ...state,
        listingsLoading: false,
        listingsLoaded: true,
        listingsSuccess: false,
      }
    default:
      return state;
  }
};

export default reducer;
