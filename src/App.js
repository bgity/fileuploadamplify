import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import AddVideoFile from './component/AddVideo';
import '@aws-amplify/ui/dist/style.css';

function App() {
  return (
    <div className='App'>
      <h2>S3 Upload example...</h2>
      <AddVideoFile />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
