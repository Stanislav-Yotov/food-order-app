import React, { Fragment } from 'react';

import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeadercartButton from './HeaderCartButton';

function Header(props) {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeadercartButton />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt='Nema leb' />
            </div>
        </Fragment>
    );
};

export default Header;