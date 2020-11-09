import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class UploadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: '',
      videoFile: '',
      response: '',
      isLoading: false,
      shortDescription: '',
      longDescription: '',
      category: '',
      subCategory: '',
      videoNameVal: '',
      file: '',
    };
  }

  handleChangeValue = (event) => {
    const value = event.target.value;
    const fileValue = event.target.files[0];
    console.log(fileValue);
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  /* handleChange = (e) => {
    e.preventDefault();
    this.setState({ shortDescription: e.target.value });
    this.setState({ [e.target.shortDescription]: [e.target.value] });
      this.setState({ longDescription: e.target.value });
    this.setState({ category: e.target.value });
    this.setState({ subCategory: e.target.value });
    this.setState({ videoNameVal: e.target.value });
  }; */

  uploadAssetData = (e) => {
    console.log(this.state);
    var randomstring = require('randomstring');
    var createFileName =
      'jsonuploader/uploader' + randomstring.generate(7) + '.json';
    let shortDescription = this.state.shortDescription;
    let longDescription = this.state.longDescription;
    let category = this.state.category;
    let subCategory = this.state.subCategory;
    let videoNameVal = this.state.videoNameVal;
    let jsonData = JSON.stringify({
      shortDescription: shortDescription,
      longDescription: longDescription,
      category: category,
      subCategory: subCategory,
      videoNameVal: videoNameVal,
    });

    Storage.put(`${createFileName}`, `${jsonData}`)
      .then((result) => {
        console.log('result: ', result);
      })
      .catch((err) => console.log('error: ', err));
    //let file = editJsonFile(`jsonuploader.json`);
    // console.log(file.toObject());
    //file.set('shortDescription', 'Earth');
    /*  console.log(
      JSON.stringify({
        shortDescription: shortDescription,
        longDescription: longDescription,
        category: category,
        subCategory: subCategory,
        videoNameVal: videoNameVal,
      })
    ); */

    /*  this.setState({ shortDescription: e.target.value });
    this.setState({ longDescription: e.target.value });
    this.setState({ category: e.target.value });
    this.setState({ subCategory: e.target.value });
    this.setState({ videoNameVal: e.target.value });
    this.setState({ isLoading: true });
    console.log(
      JSON.stringify({
        user: this.state.shortDescription,
        pass: this.state.shortDescription,
      })
    ); */
    Storage.put(`videouploader/${this.state.file.name}`, this.state.file.size, {
      contentType: this.state.file.type,
    })
      .then((result) => {
        this.upload = null;
        this.setState({ isLoading: false });
        this.setState({ response: 'Success uploading file!' });
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
  }; //handleChange = () => {};
  render() {
    return (
      <div className='App'>
        <Container>
          <Form>
            <Form.Group as={Row} controlId='formHorizontalEmail'>
              <Form.Label column sm={2}>
                <h6>Short Description</h6>
              </Form.Label>
              <Col sm={6}>
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
              <Col sm={6}>
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
              <Col sm={6}>
                <Form.Control
                  as='select'
                  name='category'
                  onChange={this.handleChangeValue}
                >
                  <option value='CEO Video'>CEO Video</option>
                  <option value='Corporate Video' selected='selected'>
                    Corporate Video
                  </option>
                  <option value='Learning Video'>Learning Video</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formHorizontalPassword'>
              <Form.Label column sm={2}>
                <h6>Sub Category</h6>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  as='select'
                  name='subCategory'
                  onChange={this.handleChangeValue}
                >
                  <option value='ILP Video'>ILP Video</option>
                  <option value='CLP Video' selected='selected'>
                    CLP Video
                  </option>
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
                  onChange={this.handleChangeValue}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 5, offset: 2 }}>
                <Button onClick={this.uploadAssetData}>Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}
export default UploadData;
