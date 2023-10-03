
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { getListProductThunk,modifyQuantityProduct,deleteProductThunk} from '../store/slices/cartList';
import { postPurchase } from '../store/slices/purchasesSlide';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

function CartModal({show, handleClose}) {

    const cartList = useSelector(state => state.cartList)
    const dispatch = useDispatch()

    useEffect (() => {
        dispatch(getListProductThunk())
    },[])

    const incrementArt= artCart => {
        dispatch (modifyQuantityProduct(artCart.id,artCart.quantity+1))
    }

    const decrementArt= artCart => {
        if(artCart.quantity > 1) {
            dispatch (modifyQuantityProduct(artCart.id,artCart.quantity-1))
        }
    }

return (
    <>

        <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end">

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul
                style={{display:"flex",
                        flexDirection:"column",
                        gap:"10px",
                        padding:"initial"}}>
                    {
                        cartList.map(listProduct=>(
                            <ListGroup.Item 
                            key={listProduct.id}
                            style={{width:"100%",
                                    
                                    display:"flex",
                                    padding:"5px",
                                    gap:"10px",
                                    border:"2px solid ",
                                    boxShadow:"2px 2px 8px"}}>
                                <Row xs={1} md={2}>
                                    <Col
                                    style={{display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center"}}
                                    className='imgCartSection'>
                                        <img
                                        src={listProduct.product.images?.[0].url}
                                        alt="article_img"
                                        style={{height:"180px",
                                                width:"100%",
                                                objectFit:"contain"}}
                                        />
                                    </Col>
                                    <Col
                                    style={{display:"flex",
                                            flexDirection:"column",
                                            justifyContent:"center",
                                            }}
                                    className='bodyCartArticle'>
                                        <Row
                                        style={{display:"flex"}}
                                        className='cartArticleDates'>
                                            <p >{listProduct.product?.title}</p>
                                            <p>{listProduct.product?.price}</p>
                                            <p>quantity: {listProduct.quantity}</p>
                                        </Row>
                                        <Row xs={2}
                                        style={{display:"flex",
                                                justifyContent:"space-around"}}
                                        className='cartArticleButtons'>
                                            <Col
                                            style={{display:"flex",
                                                    alignItems:"center",
                                                    gap:"5px",
                                                    maxWidth:"80px"}}>
                                                
                                                    <Button
                                                    onClick={() => decrementArt(listProduct)}
                                                    className='buthover'
                                                    style={{
                                                            display:"flex",
                                                            justifyContent:"center",
                                                            alignItems:"center"}}>-</Button>
                                                    {listProduct.quantity}
                                                    <Button 
                                                    onClick={() => incrementArt(listProduct)}
                                                    className='buthover'
                                                    style={{
                                                            display:"flex",
                                                            justifyContent:"center",
                                                            alignItems:"center"}}>+</Button>
                                            </Col>
                                            <Col
                                            className="backgroundDeleteButton"
                                            >
                                                <button
                                                    onClick={()=>dispatch( deleteProductThunk(listProduct.id))}
                                                    className="deleteButton"></button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                
                                    
                                        
                                    
                                    
                                        
                                    
                                
                                </Row>
                                
                            </ListGroup.Item >
                            
                        ))
                    }
                </ul>
                <Button onClick={() => dispatch(postPurchase())}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    </>
    );
}

export default CartModal;