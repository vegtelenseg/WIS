import React, { Component } from 'react';
import '../Generated-CSS/grid.css';

class FoundFoods extends Component {
  render() {
    return (
      <div className="found-foods">{
        this.props.found.map((food, id) =>{
          if (food) {
            return (
              <div id={food.productId} key={id} onClick={() => this.props.watcher(food)}>
              <h2>Item: {food.productName}</h2>
              <h4>Brand: {food.productBrand}</h4>
              <p>{food.productBestBefore}</p>
              <p>In Stock: {food.productQty}</p>
              <p>{food.productCheckoutRate} items bought every hour</p>
              </div>
            );
          }
        })
      }
      </div>
    );
  }
}

export default FoundFoods;
