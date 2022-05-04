import { useContext } from 'react';
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
    }
  return (
     <BrowserRouter>
       <div className='d-flex flex-column site-container'>
         <ToastContainer position="bottom-container" limit={1} />
         <header >
            <Navbar bg='dark'  varient='dark'>
              <Container>
                <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
                </LinkContainer>
                <Nav className='me-auto'>
                  <Link to='/cart' className='nav-link'>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='warning'>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
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
                        Sign Out  
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to='/signin'>
                    Sign In 
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
