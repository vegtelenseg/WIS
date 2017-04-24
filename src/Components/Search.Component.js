import React, { Component } from 'react';

class SearchComponent extends Component {
    search(e) {
      e.preventDefault();
      console.log(e);
    }
    render() {
        return (
          <div>
            <form>
              <input type="text" placeholder={this.props.placeHolder}/>
              <input type="submit" value="Search"/>
            </form>
          </div>
        );
    }
}

export default SearchComponent;
