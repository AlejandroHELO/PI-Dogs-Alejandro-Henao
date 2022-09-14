import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function Landing() {
    return(
        <div className={styles.Landing}>
            <h1>The Dog APP 🐶</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
};