import React, { Component } from 'react';
import ProductItemComponent from './ProductItem.Component';
class ProductsComponent extends Component {
    render() {
        let productItem = this.props.products.map(product => {
          return(
            <ProductItemComponent key={product._id} products={product}/>
          )
        });
        return (
          <div id="products-parent">
            <div id="products-container">
              <div className="product">
                {productItem}
              </div>
            </div>
          </div>
        );
    }
}

export default ProductsComponent;
