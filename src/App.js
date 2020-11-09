import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
//import AddVideoFile from './component/AddVideo';
import UploadData from './component/uploaddata/UploadData';
import '@aws-amplify/ui/dist/style.css';

function App() {
  return (
    <div className='App'>
      <h2>TCS VIDEO CHANNEL</h2>
      <UploadData />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
