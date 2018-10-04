import React from 'react';

import FileUploader from '../common/FileUploader';

import '../../_css/ModalComponent.css';
import '../../_css/ImportAssetComponent.css';

const ImportAssetComponent = () => (
  <div className="modal-container">
    <FileUploader />
  </div>
);

export default ImportAssetComponent;
