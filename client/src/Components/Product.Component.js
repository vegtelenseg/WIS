import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Generated-CSS/Product-page.css';
class ProductComponent extends Component {
  constructor() {
    super();
    this.state = {
      store: this.props,
      prod: ''
    }
  }
  componentWillMount() {
    const store = this.props.location.query;
    if (store !== null && store !== undefined) {
      console.log("It was found defined " + store);
      this.setState({
        prod: <div id="product-page">
                <Link to={'/'} id="back-home"><p>Search for store</p></Link>
                <input id="text-field" placeholder={"Search " + this.props.location.query + "'s products"}/>
              </div>
      });
      return this.state.prod;
    }
    else {
      // Go back, no store was selected.
      this.props.history.push('/');
    }
  }
  render() {
    return (
      this.state.prod || null
    );
  }
}

export default ProductComponent;
