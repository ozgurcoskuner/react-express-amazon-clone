import {
FETCH_PRODUCTS_REQUEST,
FETCH_PRODUCTS_SUCCESS,
FETCH_PRODUCTS_FAILURE
} from './productsTypes'


const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    }
}


const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}

const fetchProductsFailure = (err) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: err
    }
}


const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsRequest())
        fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(products => dispatch(fetchProductsSuccess(products)))
        .catch(err => dispatch(fetchProductsFailure(err)))
        
    }
}

export default fetchProducts;