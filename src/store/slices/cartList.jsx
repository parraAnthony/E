import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../tools/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading';

export const cartList = createSlice({
		name: 'cartList',
    initialState: [],
    reducers: {
        setCartList: (state, action) => {
            return action.payload
        },
    }
})

export const setAddCardThunk =(data)=> dispatch => {
    axios
        .post("https://ecommerce-api-l3eo.onrender.com/cart-products", data, getConfig())
        .then(()=>dispatch( getListProductThunk()))
        .catch(error=>console.error(error))
        .finally(() => dispatch(setIsLoading(false)))

}
export const getListProductThunk = () => dispatch =>{
    axios
        .get("https://ecommerce-api-l3eo.onrender.com/cart-products", getConfig())
        .then(resp=> dispatch( setCartList(resp.data) ) )
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}
export const deleteProductThunk = (id) => (dispatch)=>{
    axios
        .delete(`https://ecommerce-api-l3eo.onrender.com/cart-products/${id}`, getConfig())
        .then(()=>dispatch( getListProductThunk()))
        .catch(err => console.error(err))
}
export const modifyQuantityProduct = (id, data) => dispatch =>{
    dispatch(setIsLoading(true))

    const body = {
        quantity: data
    }

    axios
        .put(`https://ecommerce-api-l3eo.onrender.com/cart-products/${id}`, body, getConfig())
        .then(()=>dispatch( getListProductThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}



export const { setCartList } = cartList.actions;

export default cartList.reducer;