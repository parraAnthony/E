import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './slices/tokenSlice'
import isLoading from './slices/isLoading'
import articles from './slices/articles'
import cartList from './slices/cartList'
import purchases from './slices/purchasesSlide'
import wishlist from './slices/wishlist';

export default configureStore({
  reducer: {
    tokenSlice,
    isLoading,
    articles,
    cartList,
    purchases,
    wishlist
	}
})