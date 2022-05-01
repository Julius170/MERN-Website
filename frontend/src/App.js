import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';




function App() {
  return (
     <BrowserRouter>
       <div >
         <header >
            <Navbar bg='dark' varient='dark'>
              <Container>
                <LinkContainer to="/">
                <Navbar.Brand>Amazoma</Navbar.Brand>
                </LinkContainer>
              </Container>
            </Navbar>
          </header>


        <main>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>

          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
