import React from 'react';
import img from '../../img/dogmeme.jpg';
import styles from './Card.module.css';


export default function Card(props) {

    return (
        <div className={styles.Card}>
            <div>
            <img src={props.image ? props.image : img} alt="img not found" width="250px" height="250px" />
            </div>
            <h3 className={styles.CardNombre}>{props.name}</h3>
            <h5 className={styles.Cardh}>{props.breedGroup}</h5>
            <span className={styles.Cardspan}>Temperament: </span><h5 className={styles.CardTemp}>{props.temperaments}</h5>
            <span className={styles.Cardspan}>Weight: </span><h5 className={styles.CardH5Weight}>{props.weight}</h5>
        </div>
    )
}