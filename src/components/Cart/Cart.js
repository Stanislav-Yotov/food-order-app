import { Fragment, useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id);
    };

    function cartItemAddHandler(item) {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    function orderHandler() {
        setIsCheckout(true);
    };

    async function submitOrderHandler(userData) {
        setIsSubmiting(true);

        await fetch('https://react-http-2d866-default-rtdb.europe-west1.firebasedatabase.app/Orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmiting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul className={styles['cart-items']}>{cartCtx.items.map((item) => (
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />
    ))}</ul>;

    const cartModalContent = ( <Fragment>{cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout
            onCancel={props.onClose}
            onConfirm={submitOrderHandler}
        />}
        <div className={styles.actions}>
            {!isCheckout && <button className={styles['button--alt']} onClick={props.onClose}>Close</button>}
            {!isCheckout && hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>
    </Fragment> );

    const isSubmitingModalContent = <p>Sending order data...</p>;  
    
    const didSubmitModalContent = (
        <Fragment>
          <p>Order sent successfully!</p>
          <div className={styles.actions}>
          <button className={styles.button} onClick={props.onClose}>
            Close
          </button>
        </div>
        </Fragment>
      );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {!isSubmiting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;