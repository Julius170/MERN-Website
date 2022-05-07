import React, { useContext } from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Nav, Navbar, Badge, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Store }  from './Store';
import CartScreen from './screens/CartScreen'; 
import SigninScreen from './screens/SigninScreen'; 
import {ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';


function App() {
  const {state, dispatch: ctxDispatch } = useContext(Store); 
  const { cart, userInfo } = state;

    const signoutHandler = () => {
      ctxDispatch({ type: "USER_SIGNOUT" });
      localStorage.removeItem('userInfo');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
    };
  return (
     <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <ToastContainer 
      position="bottom-center" 
      draggable={true} 
      limit={1} />
         <header >
            <Navbar bg='dark'  varient='dark' expand='lg'>
              <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                  <span style={{color:"white"}}> <b>Amazona</b> </span>
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className='me-auto w-100 justify-content-end'>
                    <Link to='/cart' className='nav-link'>
                      <span style={{color:"white"}}>Cart</span>
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg='warning'>
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown title= {<span style={{color:"white"}}>{userInfo.name}</span>} id="basic-nav-dropdown">
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link 
                        className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}>
                          Sing Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <Link className="nav-link" to='/signin'>
                        <span style={{color:"white"}}>Sign In</span>
                      </Link>
                    )}

                  </Nav>  
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>


        <main>
          
          <Container className='mt-3'>

            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/orderhistory' element={<OrderHistoryScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>

        </main>
        <footer>
          <div className='text-center'> Julius Phensic @2022</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
