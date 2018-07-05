import React, { Component } from "react";
import Results from './Results';

import { fetchLcboEndpoint } from "../api/lcbo.js";

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        // Stores the initial search query
        query: '',
        // Stores an array of product ids related to the search query
        products: [],
        productID: 0,
        product: {},
        // Stores an array of objects which contain id, long and lat of each store
        stores: [],
        showResults: false 
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
      }
    
    handleSubmit(event) {
      // alert('A name was submitted: ' + this.state.query);
      event.preventDefault();
      fetchLcboEndpoint("products", {
          q: this.state.query
        }).then(data => {
          console.log(data)
          this.setState({
            products: data.result,
            productID: data.result[0].id,
            product: data.result[0],
            showResults: true
          })
        });
    }

  
    render() {
      const style = `
      * {box-sizing: borderbox}
      body { background:silver; font-family: sans-serif; }
      form {
        width: 70vw;
        height: 65px;
        border: 3px solid black;
        margin: auto;
        background: gold;
        text-align: center;
        padding: 20px 0px;
      }
      input {
        border: 2px solid black;
        margin:10px;
        height:35px;
        font-size:30px;
        line-height:30px;
        outline:0px;
      }
      input[type=submit] {
        background: hotpink;
        height: 45px;
        padding: 5px 20px;
      }
      label {
        font-size:30px;
        line-height:30px;
        text-transform: uppercase;
      }
      
      `
      return (
        
        <div className="Form" >
        <style>{style}</style>
            <form onSubmit={this.handleSubmit} >
                <label>
                QUERY: 
                <input type="text" value={this.state.query} onChange={this.handleChange} />
                </label>
                <input type="submit" value="GET TIPSY" />
            </form>
            { this.state.showResults && <Results product={this.state.product} productID={this.state.productID} stores={this.state.stores}/> }
        </div>
      )
    }
  }
  
  export default Form;