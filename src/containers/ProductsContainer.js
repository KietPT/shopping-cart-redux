import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from '../components/Products';
import Product from '../components/Product';
import PropTypes from 'prop-types';
import { actionAddToCart, actionChangeMessage } from '../actions'


class ProductsContainer extends Component {
    render() {
        let { products } = this.props;       
        return (
            <Products>
                { this.showProducts(products) }
            </Products>
        );       
    }
    showProducts(products){
        let result = null;
        let { onAddToCart, onChangeMessage } = this.props;
        if(products.length > 0) {
            result = products.map((product, index) => {
                return <Product 
                product = { product } 
                key = { index } 
                onAddToCart = { onAddToCart }
                onChangeMessage = { onChangeMessage }
                />
            })
        }
        return result;
    }
}

ProductsContainer.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.oneOf({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            discription: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            discription: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,

        })
    ).isRequired,
    onChangeMessage: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: (product) => {
            dispatch(actionAddToCart(product, 1));
        },

        onChangeMessage: (message) => {
            dispatch(actionChangeMessage(message));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);