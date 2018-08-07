import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  }

  // Fix this. This feels hacky and not right. Removal should be instant when count is 0
  handleReduceOrder = (key) => {
    if(this.props.order[key] > 0) {
      this.props.reduceOrder(key)
    } else {
      this.props.removeFromOrder(key)
    }
  }

  renderOrder = (key) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = fish && fish.status === "available"
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: {enter:500, exit:500}
    }
    // Make sure the fish is loaded before continuing
    if(!fish) return null
    if(!isAvailable) {
      return (
        <CSSTransition {...transitionOptions }>
          <li key={key}> Sorry {fish ? fish.name : "fish"} is no longer available. </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions }>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{enter:250, exit:250}}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            <button onClick={() => this.props.addToOrder(key)}>
              &#43;
            </button>
            <button onClick={() => this.handleReduceOrder(key)}>
              &minus;
            </button>
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      </CSSTransition>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === "available"
      if(isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total: {formatPrice(total)}</strong>
          </li>
        </TransitionGroup>
      </div>
    )
  }
}

export default Order;
