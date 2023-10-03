import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArticleCard from '../components/ArticleCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { getArticlesThunk, filterArticlesByCategoryThunk, searchArticlesThunk } from '../store/slices/articles';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

const Home = () => {

    const articles = useSelector(state=>state.articles)
    const dispatch = useDispatch()

    const [categories,setCategories] = useState([])
    const [search, setSearch] = useState("")

    const handleSearch = () => {
        dispatch(searchArticlesThunk(search))
    }

    useEffect(()=> {
        dispatch(getArticlesThunk ())
        getCategories()
    },[])

    const getCategories = () => {
        axios
        .get(`https://ecommerce-api-l3eo.onrender.com/category`)
        .then((resp) => setCategories(resp.data))
        .catch((error) => console.error(error))
    }   

    return(
        <main>
                <Row xs={1} md={2} lg={3} style={{marginTop:"10px",marginBottom:"10px"}}>
                    <Col md={4} lg={3} >
                        <ListGroup>
                            <ListGroup.Item 
                                style={{cursor:"pointer"}}
                                onClick={()=>dispatch(getArticlesThunk())}    
                            >
                                <p style={{marginTop:"10px",marginBottom:"10px"}}>All Product</p>
                            </ListGroup.Item>
                            {
                                categories?.map(category =>(
                                    <ListGroup.Item
                                    key={category.id}
                                    onClick={()=>dispatch(filterArticlesByCategoryThunk(category.id))}
                                    style={{cursor:"pointer"}}>
                                        <p style={{marginTop:"10px",marginBottom:"10px"}}>{category.name}</p>
                                    </ListGroup.Item>
                                ))
                            }

                        </ListGroup>
                    </Col>
                    <Col md={8} lg={9} >
                        <p style={{marginTop:"10px",marginBottom:"10px"}}>Lista de productos</p>
                        <Row>
                            <Col>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Type the name of some Product"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />                            
                                <Button  onClick={handleSearch} className='buthover'>search</Button>
                            </InputGroup>
                            </Col>
                        </Row>
                        <Row xs={1} mg={2} lg={3} >
                        {
                            articles?.map((item) => (
                                <Col key={item.id} style={{marginBottom:"10px"}}>
                                <ArticleCard data={item} />
                                </Col>
                            ))
                        }
                        </Row>
                    </Col>
                </Row>
            
        </main>
    )
}

export default Home