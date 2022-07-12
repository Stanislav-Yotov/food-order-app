import { useRef } from 'react';
import styles from './Checkout.module.css';

function Checkout(props) {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    function confirmHandler(event) {
        event.preventDefault();
    };

    return <form className={styles.form} onSubmit={confirmHandler}>
        <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div className={styles.control}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
        </div>
        <div className={styles.control}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalCodeInputRef} />
        </div>
        <div className={styles.control}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
        </div>
        <div className={styles.actions}>
        <button className={styles.submit}>Confirm</button>
        <button type="buton" onClick={props.onCancel}>Cancel</button>
        </div>
    </form>
};

export default Checkout;