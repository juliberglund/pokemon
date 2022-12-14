import React, { useState, useEffect } from "react";
import axios from "axios";
import {row, Col, Row} from 'react-bootstrap';

//components
import Pokemon from '../components/Pokemon';
import Loader from "../components/Loader";

const Homepage = () => {
 
    const [pokemon, setPokemon ] = useState([]);
    const [loading, setLoading ] = useState(true);

    const getPokemonList = async () => {
        let pokemonArray = [];
        for ( let i= 1; i< 151; i++){
            pokemonArray.push(await getPokemonData (i));
        }
        // Det kommer ladda tills pokemonen sets tills den är klar är setLoading true
        console.log(pokemonArray);
        setPokemon(pokemonArray);
        setLoading(false);
    }

    const getPokemonData = async (id) => {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {

        getPokemonList();

    },[]);
    
    
    return(

        <>
        {/* Om det laddar ser det ut "fetching pokemon" annars ser det ut rad 47*/}
        {loading ? (
            <Loader/>
        ) : (

            <Row>
                {pokemon.map(p => (

                    <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Pokemon pokemon={p.data}/>

                    </Col>

                ))}
            </Row>


        )}

        </>
    )


}

export default Homepage;