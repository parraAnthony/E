import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import CartModal from './CartModal';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeValor } from '../store/slices/tokenSlice';

function BarrNav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state=> state.tokenSlice)
  const [show, setShow] = useState(false);
  const cartList = useSelector(state => state.cartList);

  const totalCartItems = cartList.reduce((total, item) => total + item.quantity, 0);

  useEffect(()=>{
    const tokenn = localStorage.getItem("userToken")
      if(tokenn){
      dispatch( setChangeValor() )
    }
  },[userLogin])

  const handleClose = () => setShow(false);
  const handleShow = () => {
    
    const token = localStorage.getItem("userToken")
      if(token){
        setShow(true)
      }else{
        navigate("/login")
      }

  }
  const removeLocalStorage =()=>{
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
    dispatch( setChangeValor(false))
  }
  

  return (
    <Navbar expand="lg" className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand style={{cursor:"pointer"}}>e-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate(`/`)}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate(`/purchases`)}>Purchases</Nav.Link>
            <Nav.Link onClick={()=>navigate(`/wishlist`)}>Wish List</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown" style={{backgroundColor:"#325d88"}}>
              <NavDropdown.Item onClick={()=>navigate(`/login`)}>login</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate(`/register`)}>Register</NavDropdown.Item>
              
              {userLogin&&
                <>
                  <NavDropdown.Divider />
                  {totalCartItems > 0 ? (
                    <NavDropdown.Item onClick={handleShow}>
                      <i className='bx bxs-cart-alt bx-sm'></i>
                      <span className="cartItemCount">{totalCartItems}</span>
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item onClick={handleShow}>
                      <i className='bx bxs-cart-alt bx-sm'></i>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={()=>navigate(`/my-dates`)}>
                    My Dates
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>removeLocalStorage()}>
                    Log out
                  </NavDropdown.Item>
                  
                  <CartModal
                  show={show}
                  handleClose={handleClose} />
                </>
              }
            </NavDropdown>
            <div className='countcartSection'>
              <span className="cartItemCount countart">{totalCartItems}</span>
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarrNav;