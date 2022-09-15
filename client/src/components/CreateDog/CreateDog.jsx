import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { postDog, getTemperaments, getBreeds } from '../../Redux/actions';
import Header from '../Header/Header.jsx';
import styles from './CreateDog.module.css';


const validate = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    } else if (input.name && !/^[A-Za-z\s]+$/g.test(input.name)) {
        errors.name = 'el campo *Nombre no admite números o simbolos'
    } else if (input.name.length > 25) {
        errors.name = 'el campo *Nombre no puede ser mayor a 25 caracteres'
    }
    
    if (!input.alturaMax || !input.alturaMin) {
        errors.height = 'Los campos de *Altura min y max son requeridos';
    } else if (input.alturaMin && !/^[0-9]+$/i.test(input.alturaMin)) {
        errors.height = 'El campo *Altura *Min solo admite números';
    } else if (input.alturaMax && !/^[0-9]+$/i.test(input.alturaMax)) {
        errors.height = 'El campo *Altura *Max solo admite números';
    } else if (parseInt(input.alturaMin) < 0 || parseInt(input.alturaMax) > 120) {
        errors.height = 'La altura no puede ser menor a 0 ni mayor a 120 cms'
    } else if (parseInt(input.alturaMin) >= parseInt(input.alturaMax)) {
        errors.height = 'La altura máxima tiene que ser mayor a la altura minima'
    }  else if (!input.pesoMax || !input.pesoMin) {
        errors.weight = 'Los campos de *Peso min y max son requeridos';
    } else if (input.pesoMax && !/^[0-9]+$/i.test(input.pesoMax)) {
        errors.weight = 'El campo *Peso *Max solo admite números';
    } else if (input.pesoMin && !/^[0-9]+$/i.test(input.pesoMin)) {
        errors.weight = 'El campo *Peso *Min solo admite números';
    } else if (parseInt(input.pesoMin) < 0 || parseInt(input.pesoMax) > 120) {
        errors.weight = 'El peso no puede ser menor a 0 Kg ni mayor a 120 Kg'
    } else if (parseInt(input.pesoMin) >= parseInt(input.pesoMax)) {
        errors.weight = 'El peso máximo tiene que ser mayor al peso minimo'
    } else if (!input.lifeSpan) {
        errors.lifeSpan = 'El campo *Esperanza de vida es requerido'
    } else if (!/^[0-9]+$/i.test(input.lifeSpan)) {
        errors.lifeSpan = 'El campo *Esperanza de vida solo admite números';
    } else if (parseInt(input.lifeSpan) <= 0 || parseInt(input.lifeSpan) > 30) {
        errors.lifeSpan = 'La esperanza de vida debe ser mayor a 0 y máximo de 30 años';
    } else if (input.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        errors.image = 'La URL ingresada en el campo *Imagen es incorrecta'
    } else if (input.image.length > 250) {
        errors.image = 'La URL ingresada debe ser menor a 250 caracteres';
    }

    return errors;
}


export default function CreateDog (){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const temperamentos = useSelector((state) => state.temperaments);
    const breeds = useSelector((state) => state.breeds);
    const [errors, setErrors] = useState({});


    useEffect (() => {
        if (!temperamentos.length || !breeds.length) {
            dispatch(getTemperaments())
            dispatch(getBreeds())
        }
    },[dispatch, temperamentos, breeds]);

    const [input, setInput] = useState({
        name: "",
        height: "",
        alturaMin: "",
        alturaMax: "",
        weight: "",
        pesoMin: "",
        pesoMax: "",
        breedGroup: "",
        lifeSpan: "",
        image: "",
        creadoEnDb: true,
        temperaments: []
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value, 
        height: `${e.target.name === "alturaMin" ? e.target.value : input.alturaMin} - ${e.target.name === "alturaMax" ? e.target.value : input.alturaMax}`,
        weight: `${e.target.name === "pesoMin" ? e.target.value : input.pesoMin} - ${e.target.name === "pesoMax" ? e.target.value : input.pesoMax}`,
        }))
        setErrors(() => (validate({
            ...input,
            [e.target.name]: e.target.value
        })));
       
    }

    const handleSelect = (e) => {
        if (input.temperaments.length >= 10) {
            setInput((prev) => ({
                ...prev,
                temperaments: [...input.temperaments]
            }))
        } else {
            setInput((prev) => ({
                ...prev,
                temperaments: [...input.temperaments, e.target.value]
            }))
        } 
    };

    const handleSelectBreed = (e) => {
        e.preventDefault();
        setInput((prev) => ({
            ...prev,
            breedGroup: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.entries(errors).length > 0 || input.pesoMin === "") {
            alert("Falta completar los campos obligatorios *. Intenta de nuevo.")
        } else {
            dispatch(postDog(input))
            alert("El dog ha sido creado exitosamente")
            setInput(() => ({
                name: "",
                height: "",
                alturaMin: 0,
                alturaMax: 0,
                weight: "",
                pesoMin: 0,
                pesoMax: 0,
                breedGroup: "",
                lifeSpan: "",
                image: "",
                creadoEnDb: true,
                temperaments: []
            }))
            history.push("/home");
        }
    }

    const handleDelete = (temp) => {
        setInput((prev) => ({
            ...prev,
            temperaments: input.temperaments.filter(t => t !== temp)
        }))
    }

    return (
        <div className={styles.CreateDog}>
            <Header />
            <h1>Crea un Dog!</h1>
            <div className={styles.divContainerForm}>
                <span className={styles.CreatoDogSpan}>Los campos con * son obligatorios</span>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.DivNombre}>
                        <label>*Nombre:</label>
                        <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.name && (
                                <p className={styles.danger}>{errors.name}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivAltura}>
                        <label className={styles.LabelAltura}>*Altura (centimetros):</label>
                        <label>*Min </label><input
                        className={styles.InputAltura}
                        type="text"
                        value={input.alturaMin}
                        name="alturaMin"
                        onChange={(e) => handleChange(e)}/>
                        <label>*Max </label><input
                        className={styles.InputAltura} 
                        type="text"
                        value={input.alturaMax}
                        name="alturaMax"
                        onChange={(e) => handleChange(e)}/>
                        {
                            errors.height && (
                                <p className={styles.danger}>{errors.height}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivPeso}>
                        <label className={styles.LabelPeso}>*Peso (KG):</label>
                        <label>*Min </label><input
                        className={styles.InputPeso}
                        type="text"
                        value={input.pesoMin}
                        name="pesoMin"
                        onChange={(e) => handleChange(e)}/>
                        <label>*Max </label><input
                        className={styles.InputPeso} 
                        type="text"
                        value={input.pesoMax}
                        name="pesoMax"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.weight && (
                                <p className={styles.danger}>{errors.weight}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivSelectGrupoDeRaza}>
                        <label>Grupo de Raza: </label>
                        <select onChange={(e) => handleSelectBreed(e)}>
                            <option value="">Select</option>
                            {  
                                breeds && breeds.map(breed => (
                                <option name={breed} value={breed} key={breed}>{breed}</option>  
                                )) 
                            }
                        </select>
                    </div>
                    <div className={styles.DivEsperanzaVida}>
                        <label>*Esperanza de vida: </label>
                        <input 
                        type="text"
                        value={input.lifeSpan}
                        name="lifeSpan"
                        onChange={(e) => handleChange(e)}
                        /><span> (Años)</span>
                        {
                            errors.lifeSpan && (
                                <p className={styles.danger}>{errors.lifeSpan}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivImagen}>
                        <label>Imagen:</label>
                        <input 
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.image && ( <p className={styles.danger}>{errors.image}</p>)
                        }
                    </div>
                    <div className={styles.DivTemperamentos1}>
                        <label>Temperamentos:</label>
                        <select multiple onChange={(e) => handleSelect(e)}>
                            {temperamentos && temperamentos.map(t => (
                            <option name={t.name} value={t.name} key={t.name}>{t.name}</option>  
                            ))}
                        </select>
                    </div>
                    <button className={Object.entries(errors).length > 0 ? styles.ButtonCreateOff : styles.ButtonCreateOn } type="submit">Crear Dog</button>
                </form>
                {
                    input.temperaments.length > 0 && <p>(Recuerda que puedes agregar hasta 10 temperamentos)</p>
                }
                {
                    input.temperaments && input.temperaments.map(temp => (
                        <div className={styles.divButtonTemps} key={`${temp} a`}>
                            <button className={styles.ButtonTemperaments}onClick={() => handleDelete(temp)}>{temp} </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};