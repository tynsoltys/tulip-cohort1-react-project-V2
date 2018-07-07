import React, { Component } from "react";
import ProductList from './ProductList';
import Loading from './Loading';

import { fetchLcboEndpoint } from "../api/lcbo.js";

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        // Stores the initial search query
        query: '',
        // We are just going to get products here
        products: [],
        showResults: false,
        isLoading: false, 
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLoading = this.handleLoading.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
      }
    
    handleSubmit(event) {
      event.preventDefault();
      this.setState({isLoading: true})
      fetchLcboEndpoint("products", {
          q: this.state.query
        }).then(data => {
          console.log(data);
          if (data.result.length > 0 ) {
            this.setState({
              products: data.result,
              showResults: true
            })
          } else {
            alert (`Try ${data.suggestion} `);
          }
          
        })
        .catch(error => alert(error.message));
    }

    handleLoading() {
      this.setState({
        isLoading: false
      })
    }

  
    render() {
      const { query, showResults, products, isLoading } = this.state;
      return (
        
        <div className="Form" >
            <form onSubmit={this.handleSubmit} >
                <label>
                QUERY:
                <input type="text" value={query} onChange={this.handleChange} />
                </label>
                <br />
                <input className="buttonizer" type="submit" value="GET TIPSY" />
            </form>
            { isLoading ? <Loading message={'GETTING LOADED'}/> : null }
            { showResults && <ProductList loading={this.handleLoading} products={products}/> }
        </div>
      )
    }
  }
  
  export default Form;