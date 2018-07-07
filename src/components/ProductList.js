import React, { Component } from "react";
import Product from './Product';
import StoreView from './StoreView';

class ProductList extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        products: this.props.products,        // Stores an array of objects which contain id, long and lat of each store
        showProducts: true,
        showMap: false,
        selectedProduct: ''
      }
      this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
      this.setState({products: this.props.products});
      this.props.loading();
    }


    // This will set the state to the chosen product
    handleSelect(product) {
      console.log(product);
      this.setState({selectedProduct: product, showProducts: false, showMap: true});
      console.log(`You have chosen ${product.id}`);
    }
    
    
  
    render() {
      
      return (
          <div>
            { this.state.showProducts
            ? (
              <div className="productsList" >
                <h2 className="centerText">Choose a product to locate:</h2>
                <ul className="productsList">
                  {this.state.products.map(prod => (
                    <Product key={prod.id} product={prod} selector={this.handleSelect} />
                  ))}
                </ul>
              </div>) 
            : (
              <StoreView selectedProduct={this.state.selectedProduct} loading={this.props.loading}/>
            )
            }

          </div>
          
      )
    }
  }
  
  export default ProductList;