import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
//import AddVideoFile from './component/AddVideo';
import UploadData from './component/uploaddata/UploadData';
import '@aws-amplify/ui/dist/style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className='App'>
      <Row>
        <Col
          sm={6}
          style={{
            marginTop: '40px',
            marginBottom: '62px',
            marginLeft: '-45px',
          }}
        >
          <h5>TCS VIDEO CHANNEL</h5>
        </Col>
      </Row>

      <UploadData />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
