import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cart from '../components/Cart';
import CartItem from '../components/CartItem';
import * as message from '../constants/Message';
import CartResult from '../components/CartResult';

import { actionRemoveProductInCart, actionChangeMessage, actionUpdateProductInCart } from '../actions';


class CartContainer extends Component {   
    render() {
        let { cart } = this.props;

        return (
            <Cart>
                { this.showCartItem(cart) }
                { this.showTotalAmount(cart)}
            </Cart>
        );       
    }

    showCartItem = (cart) => {
        let result = <tr>
            <td>{message.MSG_CART_EMPTY} </td>
        </tr>
        let { onDeleteProductInCart, onChangeMessage, onUpdateProductInCart } = this.props;
        if(cart.length > 0) {
            result = cart.map((item, index) => {
                return (
                    <CartItem 
                        key = { index }
                        item = { item }
                        onDeleteProductInCart = { onDeleteProductInCart }
                        onChangeMessage = { onChangeMessage }
                        onUpdateProductInCart = { onUpdateProductInCart }
                    />
                )
            })
        }
        return result
    }

    showTotalAmount = (cart) => {
        let result = null;
        if(cart.length > 0) {
            result = <CartResult cart={ cart } />
        }
        return result;
    }
}

CartContainer.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            discription: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            // discription: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    onDeleteProductInCart: PropTypes.func.isRequired,
    onChangeMessage: PropTypes.func.isRequired,
    onUpdateProductInCart: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actionRemoveProductInCart(product));
        },

        onChangeMessage: (message) => {
            dispatch(actionChangeMessage(message))
        },

        onUpdateProductInCart: (product, quantity) => {
            dispatch(actionUpdateProductInCart(product, quantity));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);