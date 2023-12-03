import classes from './Pokemon.module.css'
import LifeBar from './UI/LifeBar'

const Pokemon = ({ user, pokemon }) => {
    return (
        <div className={user === "user" ? `${classes.userPokemonWrapper} ${classes.pokemonWrapper}` : `${classes.enemyPokemonWrapper} ${classes.pokemonWrapper}`}>
            <LifeBar currentHP={pokemon.currentHP} maxHP={pokemon.maxHP}></LifeBar>
            <div className={user === "user" ? classes.userPokemon : classes.enemyPokemon}>
                <img src={user === "user" ? './assets/img/pokemon2.png' : './assets/img/pokemon.png'} className={classes.pokemonImage} />
            </div>
        </div>
    )
}

export default Pokemon