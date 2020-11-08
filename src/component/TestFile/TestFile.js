import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
class TestFile extends Component {
  state = {
    imageName: '',
    imageFile: '',
    response: '',
  };
  onChange(e) {
    const file = e.target.files[0];
    Storage.put('example.png', file, {
      contentType: 'image/png',
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  uploadImage = () => {
    Storage.put(
      `userimages/${this.upload.files[0].name}`,
      this.upload.files[0],
      { contentType: this.upload.files[0].type }
    )
      .then((result) => {
        this.upload = null;
        this.setState({ response: 'Success uploading file!' });
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
  };
  render() {
    return (
      <div>
        {/*  <input
          type='file'
          accept='image/png'
          onChange={(e) => this.onChange(e)}
        /> */}

        <input
          type='file'
          accept='image/png, image/jpeg'
          style={{ display: 'none' }}
          ref={(ref) => (this.upload = ref)}
          onChange={(e) =>
            this.setState({
              imageFile: this.upload.files[0],
              imageName: this.upload.files[0].name,
            })
          }
        />
        <input value={this.state.imageName} placeholder='Select file' />
        <button
          onClick={(e) => {
            this.upload.value = null;
            this.upload.click();
          }}
          loading={this.state.uploading}
        >
          Browse
        </button>
        <button onClick={this.uploadImage}> Upload File </button>
        {!!this.state.response && <div>{this.state.response}</div>}
      </div>
    );
  }
}
export default TestFile;
