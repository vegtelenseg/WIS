import React, { Component } from 'react';
import '../Generated-CSS/Navigation.css';

class NavigationComponent extends Component {
    render() {
        return (
          <div id="nav-parent">
            <div id="nav-container">
              <h1 className="nav">Welcome to {this.props.name}</h1>
            </div>
          </div>
        );
    }
}

export default NavigationComponent;
