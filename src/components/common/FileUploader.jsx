import React, { PureComponent } from 'react';
import ReactDropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';


export default class FileUploader extends PureComponent {
  onDrop = (files) => {
    files.forEach((file) => {
      console.log(file.name, file);
    });
  }

  render() {
    const uploaderStyle = {
      display: 'inline',
      width: '100%',
      borderStyle: 'dashed',
      borderColor: 'grey',
      borderRadius: 3,
      padding: 20,
      cursor: 'pointer',
      textAlign: 'center'
    };

    return (
      <React.Fragment>
        <ReactDropzone
          accept="text/*"
          onDrop={this.onDrop}
          style={uploaderStyle}
        >
          <span>Drop or click to choose a file...</span> <br />
          <Button primary size="massive" className="import-button">Choose File</Button>
        </ReactDropzone>
      </React.Fragment>
    );
  }
}
