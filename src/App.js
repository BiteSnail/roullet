import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Roullet from './components/Roullet';
import FieldList from './components/FieldList';

function App() {
  return (
    <Container>
      <Row className='text-center center'>
        <Col xs={9} className='d-flex justify-content-center'>
          <Roullet/>
        </Col>
        <Col>
          <FieldList/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
