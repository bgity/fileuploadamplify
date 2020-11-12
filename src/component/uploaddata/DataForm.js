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
      //error
      shortDescriptionError: false,
      longDescriptionError: false,
      categoryError: false,
      subCategoryError: false,
      videoNameError: false,
    };
  }

  handleChangeValue = (event) => {
    const value = event.target.value;
    if (event.target.name === 'shortDescription') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          shortDescriptionError: true,
        });
      } else {
        this.setState({
          shortDescriptionError: false,
          shortDescription: event.target.value,
        });
      }
    }
    if (event.target.name === 'longDescription') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          longDescriptionError: true,
        });
      } else {
        this.setState({
          longDescriptionError: false,
          longDescription: event.target.value,
        });
      }
    }
    if (event.target.name === 'category') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          categoryError: true,
        });
      } else {
        this.setState({
          categoryError: false,
          category: event.target.value,
        });
      }
    }
    if (event.target.name === 'subCategory') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          subCategoryError: true,
        });
      } else {
        this.setState({
          subCategoryError: false,
          subCategory: event.target.value,
        });
      }
    }
    /* this.setState({
      ...this.state,
      [event.target.name]: value,
    }); */
  };
  handleVideoChangeValue = (event) => {
    const fileValue = event.target.files[0];

    if (fileValue === '' || fileValue === null) {
      this.setState({
        videoNameError: true,
      });
    } else {
      this.setState({
        videoNameError: false,
        videoFile: fileValue,
        videoName: fileValue.name,
        videoType: fileValue.type,
      });
    }

    /*  this.setState({
      videoFile: fileValue,
      videoName: fileValue.name,
      videoType: fileValue.type,
    }); */
  };
  uploadAssetData = (e) => {
    const {
      shortDescription,
      longDescription,
      category,
      subCategory,
      videoName,
      videoFile,
      videoType,
    } = this.state;

    if (shortDescription === '') {
      this.setState({ shortDescriptionError: true });
    }
    if (longDescription === '') {
      this.setState({ longDescriptionError: true });
    }
    if (category === '') {
      this.setState({ categoryError: true });
    }
    if (subCategory === '') {
      this.setState({ subCategoryError: true });
    }
    if (videoName === '') {
      this.setState({ videoNameError: true });
    }
    if (
      shortDescription === '' &&
      subCategory === '' &&
      longDescription === '' &&
      category === ''
    ) {
      return false;
    } else {
      let videoNameStr = videoName.split('.')[0];
      this.setState({ uploading: true });
      var createFileName = 'jsonuploader/jsonFile-' + videoNameStr + '.json';
      let jsonData = JSON.stringify({
        shortDescription: shortDescription,
        longDescription: longDescription,
        category: category,
        subCategory: subCategory,
        videoName: videoName,
      });
      console.log(jsonData);
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
    }
  };
  render() {
    return (
      <div className='container'>
        <div className='outer'>
          <div className='inner'>
            <h3>TCS VIDEO CHANNEL</h3>
            <Form
              validated={this.state.validated}
              onSubmit={this.uploadAssetData}
            >
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
                  {this.state.shortDescriptionError ? (
                    <span style={{ color: 'red' }}>
                      Please Enter short Description
                    </span>
                  ) : (
                    ''
                  )}
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
                  {this.state.longDescriptionError ? (
                    <span style={{ color: 'red' }}>
                      Please Enter Long Description
                    </span>
                  ) : (
                    ''
                  )}
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
                  {this.state.categoryError ? (
                    <span style={{ color: 'red' }}>Please Select Category</span>
                  ) : (
                    ''
                  )}
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
                  {this.state.subCategoryError ? (
                    <span style={{ color: 'red' }}>
                      Please Select SubCategory
                    </span>
                  ) : (
                    ''
                  )}
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
                />
                {this.state.videoNameError ? (
                  <span style={{ color: 'red' }}>
                    Please Choose File For Upload
                  </span>
                ) : (
                  ''
                )}
              </Form.Group>
              <Button variant='primary' onClick={this.uploadAssetData}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default DataForm;
