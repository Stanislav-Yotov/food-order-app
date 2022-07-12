import { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id);
    };

    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, amount: 1})
    };

    function orderHandler() {
        setIsCheckout(true);
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

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} />}
            <div className={styles.actions}>
                {!isCheckout && <button className={styles['button--alt']} onClick={props.onClose}>Close</button>}
                {!isCheckout && hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;