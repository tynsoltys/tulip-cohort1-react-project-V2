import React, { Component } from "react";
import Container from "./Container";
import { fetchLcboEndpoint } from "../api/lcbo.js";


class Results extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        productID: this.props.productID,
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
      const style = `
      div.result {
        width: 70vw;
        height: 140px;
        border: 3px solid black;
        margin: 30px auto;
        background: white;
        text-align: center;
        clear:both;
        float:none;
      }
      div.result img {
        float:left;
        margin:20px;
        max-height:100px;
      }
      div.result p {
        float:left;
        display:inline-block;
        max-width: calc(80%-100px);
      }
      `
      return (
        <div className="Results">
          <style>{style}</style>
            <div className="result">
            <img src={this.props.product.image_thumb_url} alt={this.props.product.name}/>
            <p>{this.props.product.name} is available at the following stores:</p>
            </div>
            { this.state.showResults && <Container markers={this.state.stores}/> }
        </div>
      )
    }
  }
  
  export default Results;



