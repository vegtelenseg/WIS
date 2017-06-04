import React, { Component } from 'react';

class SideNavComponent extends Component {
  constructor() {
    super();
    this.state = {
      watchedFoods: []
    }
  }
  componentWillMount = () => {
      this.setState({
        watchedFoods: this.props.watched
      });
  }
  render = () => {
    console.log("Watched foods are: " + JSON.stringify(this.state.watchedFoods));
    return (
      <div>
      <h2>Side Navigation</h2>
      </div>
    );
  }
}

export default SideNavComponent;
