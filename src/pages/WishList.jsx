import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddWishlistThunk, setRemoveWishlistThunk } from '../store/slices/wishlist';
import Button from "react-bootstrap/Button";
import { setAddCardThunk } from "../store/slices/cartList"

const WishList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const userId = JSON.parse(localStorage.getItem('userData')).id;

  const removeFromWishlist = (productId) => {
    dispatch(setRemoveWishlistThunk(productId));
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
    storedWishlist.forEach(item => {
      dispatch(setAddWishlistThunk(item));
    });
  }, [dispatch, userId]);

  const addCart =(productId)=>{
    const data = {
      quantity: 1,
      productId
    }
    dispatch( setAddCardThunk( data ) )

}

    return (
        <div>
            <h1
            style={{marginTop:"20px",
            width:"100%",
            backgroundColor:"#25496d",
            color:"white",
            padding:"5px",
            marginBottom:"20px"}}>Wish List</h1>
            <ul
            style={{display:"flex",
                    flexDirection:"column",
                    gap:"20px"}}>
                {wishlist.map((item) => (
                    item.isChecked && (
                        <li key={item.id}
                        style={{display:"flex",
                            gap:"5px",
                            border:"2px solid",
                            padding:"10px",
                            maxHeight:"210px"}}>
                                <div
                                className='wishListImgSection'>
                                    <img src={item.images?.[0].url} alt="Product" />
                                </div>
                                <div
                                style={{display:"flex",
                                justifyContent:"space-evenly",
                                alignItems:"center",
                                gap:"10px",
                                width:"100%"}}
                                className='wishListCard'>
                                    <div>
                                    <Button
                                    onClick={() => addCart(item.id)}
                                    
                                    className="buthover"
                                    >
                                        <i className="bx bxs-cart-alt bx-sm"></i>
                                    </Button>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.price}</p>
                                    <div className="backgroundDeleteButton">
                                        <button onClick={() => removeFromWishlist(item.id)}className="deleteButton"></button>
                                    </div>
                                    
                                </div>
                            
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default WishList;
