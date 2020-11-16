import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
//import AddVideoFile from './component/AddVideo';
import UploadData from './component/uploaddata/UploadData';
import DataForm from './component/uploaddata/DataForm';
import '@aws-amplify/ui/dist/style.css';

function App() {
  return (
    <div className='App'>
      <DataForm />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
