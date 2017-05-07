import React from 'react';
import '../Generated-CSS/WatchedFoods.css';

export default function WatchedFoods(props) {
  const { foods } = props;
  const foodRows = foods.map((food, idx) => {
    return (
      <div className="food-parent" key={idx} onClick={() => props.onFoodClick(idx)}>
        <div className="food-container">
          <div className="food-item">
            <div>{idx} {food}</div>
          </div>
        </div>
      </div>
  );
  });
  return (
    <div className="watched-food-parent">
      <div className="watched-food-container">
        <div className="watched-food-item">
          <div>{foodRows}</div>
        </div>
      </div>
    </div>
  );
}
