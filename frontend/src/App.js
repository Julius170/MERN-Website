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

function App() {
  const {state, dispatch: ctxDispatch } = useContext(Store); 
  const { cart, userInfo } = state;

    const signoutHandler = () => {
      ctxDispatch({ type: "USER_SIGNOUT" });
      localStorage.removeItem('userInfo');
    };
  return (
     <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <ToastContainer 
      position="bottom-center" 
      draggable={true} 
      limit={1} />
         <header >
            <Navbar bg='dark'  varient='dark'>
              <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                  <p style={{color:"white"}}> <b>Amazona</b> </p>
                </Navbar.Brand>
                </LinkContainer>
                <Nav className='me-auto'>
                  <Link to='/cart' className='nav-link'>
                    <p style={{color:"white"}}>Cart</p>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='warning'>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title= {<text style={{color:"white"}}>{userInfo.name}</text>} id="basic-nav-dropdown">
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/profile'>
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
                      <p style={{color:"white"}}>Sign In</p>
                    </Link>
                  )}

                </Nav>
              </Container>
            </Navbar>
          </header>


        <main>
          
          <Container className='mt-3'>

            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
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
