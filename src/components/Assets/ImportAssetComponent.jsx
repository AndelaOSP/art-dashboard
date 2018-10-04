import React from 'react';
import { Button } from 'semantic-ui-react';

import '../../_css/ModalComponent.css';
import '../../_css/ImportAssetComponent.css';

const ImportAssetComponent = () => (
  <div className="modal-container">
    <p className="import-para">Drag files to upload, or</p>
    <Button primary size="massive" className="import-button">Choose File</Button>
  </div>
);

export default ImportAssetComponent;
