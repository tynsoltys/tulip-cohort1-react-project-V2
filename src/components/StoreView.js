import React, { Component } from "react";
import Container from "./Container";
import Loading from "./Loading";
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
      fetchLcboEndpoint("stores", {
        product_id: this.state.productID,
        per_page: 40
      }).then(data => {
        console.log("ALL STORES", data.result)
        const storesWithProduct = [];
        // For whatever reason cannot get spread operator syntax to work here. I'm just gonna roll with it.
  
        data.result.map(store => store.quantity !== 0 ? storesWithProduct.push(store) : storesWithProduct)
        this.setState({
          stores: storesWithProduct,
          showResults: true
        })
        console.log("WITH PRODUCT", this.state.stores);
      });
    }  
  
    render() {
      const { image_thumb_url, name } = this.state.selectedProduct;
      return (
        this.state.showResults 
        ? (
        <div>

            <div className="Results StoreView">
              <div className="result">
                <img src={image_thumb_url} alt={name}/>
                <p>{name} is available at the following {this.state.stores.length} stores:</p>
              </div>
            </div>
            <Container selectedProduct={this.state.selectedProduct} storesWithProduct={this.state.stores}/> 

        </div>
        )
        : (
          <div>
            <Loading message={"TURNING UP!!"}/>
          </div>
        )

      )
    }
  }
  
  export default StoreView;



