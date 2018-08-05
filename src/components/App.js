import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import base from "../base";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    const { params } = this.props.match
    // Reinstate the localstorage first
    const localStorageRef = localStorage.getItem(params.storeId)
    // Take that local storage ref and set to state
    if (localStorageRef) { this.setState({ order: JSON.parse(localStorageRef) })}
    // Different from input ref. Firebase reference to database
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId, 
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = {...this.state.fishes }
    // 2. Update that state
    fishes[key] = updatedFish
    // 3. Set to state
    this.setState({ fishes })
  };

  deleteFish = (key) => {
    // 1. Take a copy of state
    const fishes = {...this.state.fishes }
    // 2. Update state of the fish
    fishes[key] = null
    // 3. Update state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  };

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = {...this.state.order}
    // 2. Either add to the order or update the number in the order
    order[key] = order[key] + 1 || 1; // If the object exists add 1 or if it does not exist yet add just 1
    // 3. Call setState to update our state
    this.setState({ order })
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = {...this.state.order}
    // 2. Remove the item from the list 
    delete order[key]// If the object exists add 1 or if it does not exist yet add just 1
    // 3. Call setState to update our state
    this.setState({ order })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => ( 
              <Fish 
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          removeFromOrder = {this.removeFromOrder}
          addToOrder = {this.addToOrder}
        />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
