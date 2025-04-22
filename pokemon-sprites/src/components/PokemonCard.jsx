import React, { useState } from 'react';

const PokemonCard = () => {
    const [name, setName] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchSprite = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;                                   // no empty searches
        const query = name.trim().toLowerCase();                    // normalize case
        setLoading(true);

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error(`Couldn’t fetch “${query}”. Try again.`);
            const data = await res.json();
            setPokemon(data);
            setErrorMessage('');
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message);
            setPokemon(null);                                         // hide old card on error
        } finally {
            setName('');
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Pokemon Sprites</h1>

            <form className="searchForm" onSubmit={fetchSprite}>
                <input
                    type="text"
                    placeholder="Enter Pokémon name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {loading && <p className="loadingDisplay">Loading…</p>}
            {errorMessage && <p className="errorDisplay">{errorMessage}</p>}

            {pokemon && (
                <div className="card">
                    <h2 className="nameDisplay">{pokemon.name}</h2>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name} sprite`}
                    />
                    <p className="abilityDisplay">
                        Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}
                    </p>
                    <p className="typeDisplay">
                        Type: {pokemon.types.map(t => t.type.name).join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PokemonCard;