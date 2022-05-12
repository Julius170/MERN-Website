import React, { useContext, useEffect, useReducer } from 'react';
import { Card, Button, ListGroup, Row, Col, ListGroupItem } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { getError } from '../utils';
import Axios  from 'axios';
import LoadingBox from '../components/LoadingBox';


const reducer = ( state, action ) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return{...state, loading: true};
        case 'CREAT_SUCCESS':
            return {...state, loading: false };
        case 'CREAT_FAIL':
            return {...state, loading: false };
        default:
            return state;

    }
}

export default function PlaceOrderScreen() {
    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading:false,
    });

    const { state, dispatch: ctxDispatch} = useContext(Store);
    const { cart, userInfo} = state;

     

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 1234.2345 =>123.23
    cart.itemPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemPrice);
    cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({type: 'CREATE_REQUEST' });
            const {data} = await Axios.post(
                'http://localhost:5000/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemPrice: cart.itemPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
                );
            console.log("Suppose to show");
            ctxDispatch({type: 'CART_CLEAR'});
            dispatch({type: 'CREATE_SUCCESS'});
            localStorage.removeItem('cartItems');
            navigate(`http://localhost:5000/order/${data.order._id}`);
            alert("Suppose to show");


        }catch (err) {
            dispatch({type: 'CREATE_FAIL'});
            toast.error(getError(err));

        };
    };
    useEffect(()=>{
        if(!cart.paymentMethod) {
        navigate('/payment');        
    }
    },[navigate, cart]);


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
            <title>Preview Order</title>
        </Helmet>
        <h1 className='my-3'><b>Preview Order</b></h1>
        {loading && <LoadingBox></LoadingBox>}

        <Row>
            <Col md={8}>
            <Card className='mb-3' >
                <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                        <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {cart.shippingAddress.address},
                        {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                    </Card.Text>
                    <Link to="/shipping">Edit</Link>
                </Card.Body>
            </Card>


            <Card className='mb-3' >
                <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                        <strong>Method:</strong> {cart.paymentMethod}
                    </Card.Text>
                    <Link to="/payment">Edit</Link>
                </Card.Body>
            </Card>


            <Card className='mb-3' >
                <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup>
                        {cart.cartItems.map((item)=> (
                            <ListGroupItem key = {item._id}>
                                <Row className='align-items-center'>
                                    <Col md={6}>
                                        <img src={item.image} 
                                        alt={item.name}
                                        className='img-fluid rounded img-thumbnail'></img>{" "}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        <Col md={3}><strong>Quantity: </strong><span>  {item.quantity}</span></Col>
                                        <Col md={3}><strong>Price: </strong><span>  ${item.price}</span></Col>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <Link to="/cart">Edit</Link>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card>
                <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Order Total</Col>
                                <Col>${cart.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item><ListGroup.Item>
                            <div className='d-grid'>
                            <Button 
                            type='button'
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems.length === 0}>
                                Place Order
                            </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>

    </div>
  )
}
