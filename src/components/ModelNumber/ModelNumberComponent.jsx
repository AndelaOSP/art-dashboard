import * as React from 'react';
import ArtButton from '../common/ButtonComponent';
import InputFluid from '../common/TextInputComponent';
import DropdownComponent from '../common/DropdownComponent';

class AddAssetComponent extends React.Component {
  render() {

    const placeMakesInSemanticUIOptions = (props) => {
      return props.map((option, index) => ({
        key: index,
        text: option.make_label,
        value: option.id
      }));
    };

    const onChange = () => {
      console.log('ABCDE');
    };

    return (
      <div>
        <InputFluid />
        <br></br>
        <DropdownComponent
          label="Asset Makes"
          placeholder="Select Asset Makes"
          name="asset-make"
          onChange={this.onChange}
          options={placeMakesInSemanticUIOptions(this.props.assetMakes)}
        />
        <br></br>
        <ArtButton buttonName="Save" color="primary" />
        <ArtButton buttonName="Cancel" />
      </div>
    );
  }
}
export default AddAssetComponent;