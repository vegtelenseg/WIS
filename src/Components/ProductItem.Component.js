import React, { Component } from 'react';
import '../Generated-CSS/ProductItem.css';
class ProductItemComponent extends Component {
    render() {
        return (
          <div className="productItem-parent">
            <div className="productItem-container">
              <h1 className="title">{this.props.products.title}</h1>
              <div className="product">
                <h2 className="manufactured">Date Manufactured: {this.props.products.manufactured}</h2>
                <h2 className="best-before">Best Before: {this.props.products.bestBefore}</h2>
                <h3 className="items-remaining">Remaining: {this.props.products.qty} Items</h3>
                <h3 className="checkout-rate">Approximately {this.props.products.checkoutRate} items bought an hour</h3>
                <h3 className="price">Price: R{this.props.products.price}</h3><br/>
              </div>
            </div>
          </div>
        );
    }
}

export default ProductItemComponent;
