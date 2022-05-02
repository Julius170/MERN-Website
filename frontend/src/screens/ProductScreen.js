import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Rating from "../components/Rating";
// import Product from "../components/Products";

const reducer = (state, action) => {
    switch(action.type) {
        case "FETCH_REQUEST":
            return {...state, loading: true}
        case "FETCH_SUCCESS":
            return {...state, product: action.payload, loading: false}
        case "ETCH_FAIL" :
            return {...state, loading: false, error: action.payload};
        default:
            return state;


    }
};


function ProductScreen() {
    const params = useParams();
    const {slug} = params;
 
    const [{loading, error}, dispatch] = useReducer(reducer, {
        product: [],
        loading: true, 
        error: '',
    });
    const [product, setProducts] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            dispatch({type: "FETCH_REQUEST" });
            try {
                const result = await axios.get(`http://localhost:5000/api/product/slug/${slug}`);
                dispatch({type: "FETCH_SUCCESS", payload: result.data });                       
                setProducts(result.data);
            } catch(err) {
                dispatch({type:"FETCH_FAIL", payload: err.message});
            }
            
        };
        fetchData();
    }, [slug]);
 

    return ( 
        loading? <div>Loading...</div>
        : 
        error? 
        <div>{error}</div>
        :
        <div>
            <Row>
                <Col md={6}>
                    <img 
                        className="img-large"
                        src={product.image}
                        alt={product.name}>
                        </img>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h1>{product.name}</h1>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating rating = {product.rating}
                            numReviews= {product.numReviews}>

                            </Rating>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>


                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush"> 
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>

                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock>0? (
                                                <Badge bg='success'>In Stock</Badge>
                                            ): (
                                                <Badge bg='success'>Unavailable</Badge>
                                            )}
                                        </Col>
                                        
                                    </Row>
                                </ListGroupItem>
                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <div className="d-grid">
                                            <Button variant='primary'>
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </ListGroupItem>
                                )

                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>)
    
}

export default ProductScreen