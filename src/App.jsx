import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Purchases from './pages/Purchases'
import ArticleDetails from './pages/ArticleDetails'
import BarrNav from './components/BarrNav'
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader'
import { useDispatch, useSelector } from "react-redux";
import ProtectedRouter from './components/ProtectedRouter'
import UserData from './pages/UserData'
import WishList from './pages/WishList'
import { setAddWishlistThunk, setRemoveWishlistThunk } from './store/slices/wishlist';

function App() {
  const isLoading = useSelector (state => state.isLoading)
  const dispatch = useDispatch();

  const addToWishlist = (productId) => {
    const product = allArticles.find(item => item.id === productId);
    if (product) {
        dispatch(setAddWishlistThunk(product));
    }
};

const removeFromWishlist = (productId) => {
    dispatch(setRemoveWishlistThunk(productId));
};

  return (
    <HashRouter>
      <BarrNav />
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/articles/:id' element={ <ArticleDetails/>}/>
          <Route element={<ProtectedRouter/>}>
            <Route path='/purchases' element={<Purchases/>}/>
            <Route path='/my-dates' element={<UserData/>}/>
            <Route path='/wishlist' element={<WishList addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} />}/>
          </Route>
        </Routes>
      </Container>
      {isLoading && <Loader/>}
      
    </HashRouter>
  )
}

export default App
