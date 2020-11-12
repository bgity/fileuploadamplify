import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
//import AddVideoFile from './component/AddVideo';
import UploadData from './component/uploaddata/UploadData';
import DataForm from './component/uploaddata/DataForm';
import ValidationForm from './component/uploaddata/ValidationForm';
import '@aws-amplify/ui/dist/style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className='App'>
      <DataForm />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
