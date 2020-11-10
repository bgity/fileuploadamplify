import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

class UploadData extends Component {
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
      progress: 0,
      uploading: false,
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
    this.setState({ uploading: true });
    var randomstring = require('randomstring');
    var createFileName =
      'jsonuploader/jsonFile' + randomstring.generate(7) + '.json';
    let shortDescription = this.state.shortDescription;
    let longDescription = this.state.longDescription;
    let category = this.state.category;
    let subCategory = this.state.subCategory;
    let videoNameVal = this.state.videoNameVal;
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
    Storage.put(`videouploader/${videoName}`, videoFile, {
      contentType: videoType,
    })
      .then((result) => {
        this.setState({ uploading: false });
        window.location.reload();
        this.setState({ response: 'Success uploading file!' });
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
    console.log(videoFile);
  };
  render() {
    return (
      <Container>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              <h6>Short Description</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                name='shortDescription'
                placeholder='Short Description'
                onChange={this.handleChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={2}>
              <h6>Long Description</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                name='longDescription'
                placeholder='Long Description'
                onChange={this.handleChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={2}>
              <h6>Category</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as='select'
                name='category'
                onChange={this.handleChangeValue}
              >
                <option value=''>Select</option>
                <option value='CEO Video'>CEO Video</option>
                <option value='Corporate Video'>Corporate Video</option>
                <option value='Learning Video'>Learning Video</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={2}>
              <h6>Sub Category</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as='select'
                name='subCategory'
                onChange={this.handleChangeValue}
              >
                <option value=''>Select</option>
                <option value='ILP Video'>ILP Video</option>
                <option value='CLP Video'>CLP Video</option>
                <option value='LDP Video'>LDP Video</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalEmail'>
            <Form.Label column sm={2}>
              <h6>Video</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.File
                type='file'
                accept='video/*'
                onChange={this.handleVideoChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            {!this.state.uploading && (
              <Col sm={{ span: 5, offset: 2 }}>
                <Button onClick={this.uploadAssetData}>Submit</Button>
              </Col>
            )}
            {this.state.uploading && (
              <Col sm={{ span: 5, offset: 2 }}>
                <Button variant='primary' disabled>
                  <Spinner
                    as='span'
                    animation='grow'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  Uploading Please Wait...
                </Button>
              </Col>
            )}
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
export default UploadData;
