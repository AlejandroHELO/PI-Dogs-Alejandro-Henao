import React from 'react';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, detailsClean, DeleteDog } from '../../Redux/actions';
import img from '../../img/dogmeme.jpg';
import Header from '../Header/Header';
import styles from './DetailedCard.module.css';

export default function Detail() {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.dogDetail);
    const {id} = useParams();
    const history = useHistory();

    const handleDelete = (id) => {
        dispatch(DeleteDog(id))
        dispatch(detailsClean())
        alert("Dog eliminado exitosamente");
        history.push("/home");
    };

    useEffect (() => {
        dispatch(getDetails(id))
    },[dispatch, id]);
    
    return (
        <div className={styles.Detail}>
            <Header/>
            {/* <div className={styles.DivH1Dog}>
                <h1>Dog detail</h1>
            </div> */}
            <div className={styles.DivContainer}>
                { details.length > 0 ? 
                    <div className={styles.DetailDivContainer}>
                        <h1>{details[0].name}</h1>
                        <img className={styles.DetailImg} src={details[0].image ? details[0].image : img} alt='img' width="500px" height="300px" />
                        <div className={styles.DivContainerResto}>
                            <div className={styles.DivWeight}>
                            <h2>Weight:</h2>
                            <h3>{details[0].weight}</h3>
                            </div>
                            <div className={styles.DivHeight}>
                            <h2>Height:</h2>
                            <h3>{details[0].height}</h3>
                            </div>
                            <div className={styles.DivLifeExpectancy}>
                            <h2>Life expectancy:</h2>
                            <h3>{details[0].lifeSpan}</h3>
                            </div>
                            <div className={styles.DivTemperaments}>
                            <h2>Temperaments:</h2>
                            <h3>{!details[0].creadoEnDb ? details[0].temperament : details[0].temperament.map(el => " " + el.name).toString().slice(1)}</h3>
                            </div>
                        </div>
                    </div> : <p>Loading...</p>
                }
                { details.length > 0 && details[0].creadoEnDb && 
                    <div>
                        <button className={styles.ButtonEliminar} onClick={() => handleDelete(id)}>Eliminar</button>
                        <button className={styles.ButtonEditar}>Editar</button>
                    </div> 
                }
            </div>
        </div>
    )
};