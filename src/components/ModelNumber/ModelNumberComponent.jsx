import * as React from 'react';
import { Form } from 'semantic-ui-react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';

class ModelNumberComponent extends React.Component {
  render() {

    const placeMakesInSemanticUIOptions = (props) => {
      return props.map((option, index) => ({
        key: index,
        text: option.make_label,
        value: option.id
      }));
    };

    return(
      <div>
        <Form onSubmit={this.props.handleSubmit}>
        <InputFluid name="model-number" onChange={this.props.onAddModelNumber} />
        <br></br>
        <DropdownComponent
          label="Asset Makes"
          placeholder="Select Asset Makes"
          name="asset-make"
          onChange={this.props.onSelectAssetMake}
          options={placeMakesInSemanticUIOptions(this.props.assetMakes)}
        />
        <br></br>
        <ArtButton buttonName="Save" color="primary" />
        </Form>
      </div>
    );
  }
}
export default ModelNumberComponent;
