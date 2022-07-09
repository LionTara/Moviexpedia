import {useEffect, useState} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

// c412c5f1

const API_URL = 'http://www.omdbapi.com?apikey=c412c5f1';

const App = () => {

    const [movies, setMovies] = useState();

    const [searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&S=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() =>{
        searchMovie('The Stranger');
    }, []);

    return (
        <div className="app">
            <h1>Moviexpedia</h1>

            <div className="search">
                <input
                    placeholder = "Search movie"
                    value={searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt = "search"
                    onClick = {() => searchMovie(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                    <div className="container">
                       { movies.map((movie) => (
                        <MovieCard movie={movie} />
                        )
                       )}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }



        </div>
    );
}

export default App;