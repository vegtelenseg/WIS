import React from 'react';
import '../Generated-CSS/WatchedFoods.css';

export default function WatchedFoods(props) {
  const foods = props.watchedFood;
  let foodRows;
  console.log("The props: " + foods);
  if (foods !== undefined && foods !== null) {
  foodRows = foods.map((food, idx) => {
      return (
        <div className="food-parent" key={idx} onClick={() => props.unwatchFood(idx)}>
          <div className="food-container">
            <div className="food-item">
              <span>Product Name: {food.productName}<br/></span>
              <span>Quantity: {food.productQty} left<br/></span>
              <span>Price: R {food.price}<br/></span>
              <span>Checkout Rate: {food.productCheckoutRate} per hour</span>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="watched-food-parent">
      <div className="watched-food-container">
        <div className="watched-food-item">{foodRows}</div>
      </div>
    </div>
  );
}
