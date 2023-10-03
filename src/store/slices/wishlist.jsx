import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    setAddWishlist: (state, action) => {
      const item = action.payload;
      if (!state.some(existingItem => existingItem.id === item.id)) {
        state.push({ ...item, isChecked: true });
      }
    },
    setRemoveWishlist: (state, action) => {
      const productId = action.payload.id;
      const updatedWishlist = state.filter(item => item.id !== productId);
      return updatedWishlist;
    },
  },
});

export const { setAddWishlist, setRemoveWishlist } = wishlistSlice.actions;

export const setAddWishlistThunk = (data) => (dispatch) => {
  dispatch(setAddWishlist(data));
  const userId = JSON.parse(localStorage.getItem('userData')).id;
  const currentWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
  const updatedWishlist = [...currentWishlist, data];
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
};

export const setRemoveWishlistThunk = (productId) => (dispatch) => {
  dispatch(setRemoveWishlist({ id: productId }));
  const userId = JSON.parse(localStorage.getItem('userData')).id;
  const currentWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
  const updatedWishlist = currentWishlist.filter(item => item.id !== productId);
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
};

export default wishlistSlice.reducer;
