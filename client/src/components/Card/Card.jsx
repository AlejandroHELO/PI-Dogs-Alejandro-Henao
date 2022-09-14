import React from 'react';
import img from '../../img/dogmeme.jpg';
import styles from './Card.module.css';


export default function Card({ name, image, weight, temperaments, breedGroup}) {

    return (
        <div className={styles.Card}>
            <div>
            <img src={image ? image : img} alt="img not found" width="250px" height="250px" />
            </div>
            <h3 className={styles.CardNombre}>{name}</h3>
            <h5 className={styles.Cardh}>{breedGroup}</h5>
            <span className={styles.Cardspan}>Temperament: </span><h5 className={styles.CardTemp}>{temperaments}</h5>
            <span className={styles.Cardspan}>Weight: </span><h5 className={styles.CardH5Weight}>{weight}</h5>
        </div>
    )
};