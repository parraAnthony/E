import { useParams } from "react-router-dom"
import axios from "axios"
import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { filterArticlesByCategoryThunk } from "../store/slices/articles"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { setAddCardThunk } from "../store/slices/cartList"

const ArticleDetails = () => {
    const {id} = useParams()
    const [articlesDetail, setArticlesDetail] = useState({});
    const [quantity, setQuantity] = useState(1)
    const allArticles = useSelector((state) => state.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [activeImageIndex, setActiveImageIndex] = useState(0);


    useEffect (()=> {
        getDetails()
        setQuantity(1)
    },[id])

    const getDetails = () => {
        axios
            .get(`https://ecommerce-api-l3eo.onrender.com/products/${id}`)
            .then((resp) => {
                setArticlesDetail(resp.data)
                dispatch(filterArticlesByCategoryThunk(resp.data.category.id))
                
            })
            .catch((error) => console.error(error))
    }
    const addCart =(productId)=>{
        const data = {
            quantity,
            productId
        }
        setQuantity(1)
        dispatch( setAddCardThunk( data ) )

    }

    const nextImage = () => {
        setActiveImageIndex((prevIndex) =>
            (prevIndex + 1) % articlesDetail.images.length
        );
    };

    const prevImage = () => {
        setActiveImageIndex((prevIndex) =>
            (prevIndex - 1 + articlesDetail.images.length) %
            articlesDetail.images.length
        );
    };

    const changeImage = (index) => {
        setActiveImageIndex(index);
    };

    return(
        <main>
            <Row xs={1} lg={2} style={{marginTop:"10px", display:"flex",alignItems:"center"}} className="productData">
                <Col style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        overflow: "hidden",
                        position: "relative",
                        height: "70%",
                    }}
                    className="imgDetailSection">
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <button
                            
                            onClick={prevImage}
                            style={{ position: "absolute", left: "5px", zIndex: 1, borderStyle:"none", padding:"5px", backgroundColor:"#00000048"}}
                            >
                                &#10094;
                            </button>
                            <button
                            
                            onClick={nextImage}
                            style={{ position: "absolute", right: "5px", zIndex: 1, borderStyle:"none", padding:"5px", backgroundColor:"#00000048"}}
                            >
                                &#10095;
                            </button>
                            <div
                                style={{
                                    display: "flex",
                                    transition: "transform 0.5s ease-in-out",
                                    transform: `translateX(-${activeImageIndex * 100}%)`,
                                }}
                            >
                                {articlesDetail.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display:"flex",
                                            minWidth: "100%",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`article_img_${index}`}
                                            style={{
                                                width: "100%",
                                                height: "50vh",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                            gap:"10px",
                            height:"30%",
                            zIndex:1}}>
                            <img
                        src={articlesDetail.images?.[0].url}
                        alt="article_img"
                        style={{maxHeight:"100px",width:"30%",objectFit:"contain"}}
                        onClick={() => changeImage(0)}/>
                            <img
                        src={articlesDetail.images?.[1].url}
                        alt="article_img"
                        style={{maxHeight:"100px",width:"30%",objectFit:"contain"}}
                        onClick={() => changeImage(1)}/>
                            <img
                        src={articlesDetail.images?.[2].url}
                        alt="article_img"
                        style={{maxHeight:"100px",width:"30%",objectFit:"contain"}}
                        onClick={() => changeImage(2)}/>
                    </div>
                </Col>
                <Col style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                    <div style={{border:"2px solid",height:"100%",width:"100%", padding:"10px",boxShadow:"2px 2px 8px"}}>
                        <div style={{height:"100%",display:"flex",flexDirection:"column", justifyContent:"center",gap:"10px"}}>
                            <h2>{articlesDetail.title}</h2>
                            <h4>{articlesDetail.brand}</h4>
                            <h3>$ {articlesDetail.price}</h3>
                            <div style={{display:"flex", gap:"10px"}}>
                                <Button  onClick={()=>addCart(articlesDetail.id)}><i className='bx bxs-cart-alt bx-sm' style={{textAlign:"center"}}></i> Add to cart</Button>
                                <div>
                                    <Button  disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</Button>
                                    {" "+quantity+" "} 
                                    <Button  onClick={()=>setQuantity(quantity+1)}>+</Button>
                                </div>
                            </div>
                            <div style={{overflow:"auto"}}>
                                <span style={{display:"flex",flexDirection:"column", alignItems:"center",backgroundColor:"#00000048"}}>Description</span>
                                <p style={{padding:"10px"}}>{articlesDetail.description}</p>
                            </div>
                                
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom:"10px"}}>
                <Col>
                    <Row>
                        <span
                        style={{padding:"10px",display:"flex",justifyContent:"center"}}>Suggerences</span>
                    </Row>
                    <Row xs={1} mg={2} lg={3} >
                        {
                            allArticles.map(article => (
                                <Col key={article.id}>

                                    <Row  style={{margin:"5px"}}>
                                        <Card 
                                        className="cardSuggerences"
                                        style={{overflow:"auto"}}
                                        onClick={()=>navigate(`/articles/${article.id}`)}>
                                            <div style={{width:"100%",maxHeight:"210px"}}>
                                                <Card.Img
                                                variant="top"
                                                src={article.images?.[0].url}
                                                style={{ height:"100%",objectFit:"contain"}}
                                                className="imgSuggerences"
                                                />
                                            </div>
                                            
                                            <Card.Body>
                                                <Card.Title>{article.title}</Card.Title>
                                                <Card.Subtitle>{article.price}</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Row>

                                </Col>
                            ))
                        }
                    </Row>
                </Col>    
            </Row>
        </main>
    )
}

export default ArticleDetails