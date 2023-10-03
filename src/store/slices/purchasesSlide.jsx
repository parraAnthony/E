import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../tools/getConfig';
import { setIsLoading } from './isLoading';
import {getListProductThunk} from './cartList'

export const purchases = createSlice({
		name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        },
    }
})

export const postPurchase  = () => dispatch =>{
    dispatch (setIsLoading(true))

    axios
    .post(`https://ecommerce-api-l3eo.onrender.com/purchases`,{}, getConfig())
    .then(()=>dispatch( getListProductThunk()))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const getPurchase = () => dispatch =>{
    dispatch(setIsLoading(true))

    axios
        .get("https://ecommerce-api-l3eo.onrender.com/purchases", getConfig())
        .then(resp=> dispatch( setPurchases(resp.data)))
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setPurchases } = purchases.actions;

export default purchases.reducer;