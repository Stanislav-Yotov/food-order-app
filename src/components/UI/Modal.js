import styles from './Modal.module.css';
import { Fragment } from 'react';
import  ReactDOM  from 'react-dom';

function Backdrop(props) {
 return (
    <div className={styles.backdrop} />
 );
};

function Overlay(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

function Modal(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;