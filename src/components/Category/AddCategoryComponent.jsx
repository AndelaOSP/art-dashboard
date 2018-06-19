import * as React from 'react';
import { Form } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';

import '../../_css/AddAssetComponent.css';

class AddCategoryComponent extends React.Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit}>
          <label className='label-style'>Category Name</label>
          <InputFluid
            name="category-name"
            onChange={this.props.onaddCategoryName}
            placeholder="Enter Category Name"
          />
          <br></br>
          <ArtButton buttonName="Save" color="primary" />
          <ArtButton buttonName="Cancel" onClick={this.props.toggleModal} />
        </Form>
      </div>
    );
  }
}
export default AddCategoryComponent;

