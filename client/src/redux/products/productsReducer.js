import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./productsTypes";

const initialState = {
  products: [],
  loading: true,
  error: "",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        products: '',
        loading: false,
        error: action.payload,
      };
    default:
      return{
          ...state
      };
  }
};

export default productsReducer;