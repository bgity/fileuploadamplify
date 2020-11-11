import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import { Button, Col, Form } from 'react-bootstrap';

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: '',
      videoFile: '',
      videoType: '',
      response: '',
      isLoading: false,
      shortDescription: '',
      longDescription: '',
      category: '',
      subCategory: '',
      videoNameVal: '',
      uploadProgress: 0,
      uploading: false,
      validated: false,
    };
  }

  handleChangeValue = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  handleVideoChangeValue = (event) => {
    const fileValue = event.target.files[0];
    this.setState({
      videoFile: fileValue,
      videoName: fileValue.name,
      videoType: fileValue.type,
    });
  };
  uploadAssetData = (e) => {
    let videoStr = this.state.videoName;
    videoStr = videoStr.split('.')[0];
    this.setState({ uploading: true });
    var createFileName = 'jsonuploader/jsonFile-' + videoStr + '.json';
    let shortDescription = this.state.shortDescription;
    let longDescription = this.state.longDescription;
    let category = this.state.category;
    let subCategory = this.state.subCategory;
    let videoName = this.state.videoName;
    let videoFile = this.state.videoFile;
    let videoType = this.state.videoType;
    let jsonData = JSON.stringify({
      shortDescription: shortDescription,
      longDescription: longDescription,
      category: category,
      subCategory: subCategory,
      videoName: videoName,
    });
    //Json upload
    Storage.put(`${createFileName}`, `${jsonData}`)
      .then((result) => {
        console.log('result: ', result);
      })
      .catch((err) => console.log('error: ', err));
    //Video Upload
    const foo = this;
    Storage.put(`videouploader/${videoName}`, videoFile, {
      progressCallback(progress) {
        let prog = parseInt((progress.loaded / progress.total) * 100);
        console.log(prog + '%');
        foo.setState({ uploadProgress: prog + '%' });
      },
      contentType: videoType,
    })
      .then((result) => {
        this.setState({ uploading: false });
        window.location.href = '/';
        this.setState({ response: 'Success uploading file!' });
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
    //console.log(videoFile);
  };
  render() {
    return (
      <div className='outer'>
        <div className='inner'>
          <h3>TCS VIDEO CHANNEL</h3>
          <Form noValidate validated={this.state.validated}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>short Description</Form.Label>
                <Form.Control
                  type='text'
                  name='shortDescription'
                  placeholder='Short Description'
                  onChange={this.handleChangeValue}
                  autoComplete='off'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide Short Description.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Long Description</Form.Label>
                <Form.Control
                  type='text'
                  name='longDescription'
                  placeholder='Long Description'
                  onChange={this.handleChangeValue}
                  autoComplete='off'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide Short Description.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as='select'
                  name='category'
                  onChange={this.handleChangeValue}
                  required
                >
                  <option value=''>Select</option>
                  <option value='CEO Video'>CEO Video</option>
                  <option value='Corporate Video'>Corporate Video</option>
                  <option value='Learning Video'>Learning Video</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please provide Category.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId='formGridPassword'>
                <Form.Label>Sub Category</Form.Label>
                <Form.Control
                  as='select'
                  name='subCategory'
                  onChange={this.handleChangeValue}
                  required
                >
                  <option value=''>Select</option>
                  <option value='ILP Video'>ILP Video</option>
                  <option value='CLP Video'>CLP Video</option>
                  <option value='LDP Video'>LDP Video</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please provide Sub Category.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Video</Form.Label>
              {this.state.uploading && (
                <div className='progress' style={{ marginBottom: '10px' }}>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    style={{ width: this.state.uploadProgress }}
                    aria-valuenow={this.state.uploadProgress}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  >
                    {this.state.uploadProgress}
                  </div>
                </div>
              )}
              <Form.File
                type='file'
                accept='video/*'
                onChange={this.handleVideoChangeValue}
                required
                feedback='You must agree before submitting.'
              />
            </Form.Group>
            <Button variant='primary' onClick={this.uploadAssetData}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default DataForm;
