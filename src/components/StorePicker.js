import React from 'react';
import PropTypes from "prop-types";
import { getFunName } from '../helpers';

// Every component is going to be its own class
class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }

  myInput = React.createRef()

  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault()
    // 2. get the text from input
    const storeName = this.myInput.value.value
    // 3. change the page to /store/:whatever
    this.props.history.push(`/store/${storeName}`)
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2> HELLO WORLD </h2>
        <input 
          type="text"
          ref={this.myInput}
          required placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -> </button>
      </form>
    );
  }
}

export default StorePicker;
