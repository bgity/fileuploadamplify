import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
class AddVideo extends Component {
  state = {
    videoName: '',
    videoFile: '',
    response: '',
    isLoading: false,
  };

  uploadVideo = () => {
    this.setState({ isLoading: true });
    Storage.put(
      `uservideo/${this.upload.files[0].name}`,
      this.upload.files[0],
      { contentType: this.upload.files[0].type }
    )
      .then((result) => {
        this.upload = null;
        this.setState({ isLoading: false });
        this.setState({ response: 'Success uploading file!' });
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
  };
  render() {
    return (
      <div>
        <input
          type='file'
          accept='video/*'
          style={{ display: 'none' }}
          ref={(ref) => (this.upload = ref)}
          onChange={(e) =>
            this.setState({
              videoFile: this.upload.files[0],
              videoName: this.upload.files[0].name,
            })
          }
        />
        <input value={this.state.videoName} placeholder='Select Video File' />
        <button
          onClick={(e) => {
            this.upload.value = null;
            this.upload.click();
          }}
          loading={this.state.uploading}
        >
          Browse
        </button>
        <button onClick={this.uploadVideo} disabled={this.state.isLoading}>
          {this.state.isLoading ? 'Loading...' : 'Upload Files'}
        </button>
        {!!this.state.response && <div>{this.state.response}</div>}
      </div>
    );
  }
}
export default AddVideo;
