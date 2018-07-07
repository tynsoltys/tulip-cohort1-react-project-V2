import React, { Component } from "react";
import MapContainer from "./MapContainer";
import { fetchLcboEndpoint } from "../api/lcbo.js";


class StoreView extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        productID: this.props.selectedProduct.id,
        selectedProduct: this.props.selectedProduct,
        stores: [],
        showResults: false
      }
 
    }

    componentDidMount() {
      fetchLcboEndpoint("stores", "product_id", {
        q: this.state.productID
      }).then(data => {
        console.log("STORE",data)
        this.setState({
          stores: data.result,
          showResults: true
        })
      });
    }

    componentDidUpdate() {

    }
    
    
  
    render() {
      return (
        <div className="Results StoreView">
            <div className="result">
            <img src={this.state.selectedProduct.image_thumb_url} alt={this.state.selectedProduct.name}/>
            <p>{this.state.selectedProduct.name} is available at the following stores:</p>
            </div>
            { this.state.showResults && <MapContainer markers={this.state.stores}/> }
        </div>
      )
    }
  }
  
  export default StoreView;



