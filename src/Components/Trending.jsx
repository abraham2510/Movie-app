import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTrendingMovies } from '../appwrite'
import one from '../assets/Number/1.svg'
import two from '../assets/Number/2.svg'
import three from '../assets/Number/3.svg'
import four from '../assets/Number/4.png'
import five from '../assets/Number/5.svg'
import noPoster from '../assets/No-Poster.png'
import { Link } from 'react-router-dom'

const Trending = ({ movie }) => {
    const {
        id,
        title = 'Untitled',
        overview = '',
        poster_path = '',
        release_date = '',
        vote_average = 0,
        original_language = 'en'
    } = movie || {};

    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : noPoster;

    const [trendingMovies, setTrendingMovies] = useState([]);

    const numberImages = [one, two, three, four, five];

    useEffect(() => {
        loadTrendingMovies()
    }, [])

    const loadTrendingMovies = async () => {
        try {
            const movie = await getTrendingMovies();
            setTrendingMovies(movie);
            console.log("Trending Movies:", movie);
        } catch (error) {
            console.error("Error loading trending movies:", error);
        }
    }
    return (
        <div className="p-4 lg:w-[85%] mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Top Searches</h2>
            <div className="flex items-center overflow-x-auto scrollbar-hide space-x-6 cursor-pointer">
                {trendingMovies?.map((movie, index) => (
                    <Link key={movie.$id} to={`/movie/${movie.movie_id}`}>
                        <div
                            key={movie.$id}
                            className="group flex-shrink-0 w-[180px] h-[270px] bg-cover bg-center rounded-lg relative transition-transform duration-300 hover:scale-105 cursor-pointer"
                            style={{
                                backgroundImage: `url(${movie.poster_url || noPoster})`,
                            }}
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                            {/* Movie title */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                            </div>

                            {/* Rank number */}
                            {index < numberImages.length && (
                                <img
                                    src={numberImages[index]}
                                    alt={`Rank ${index + 1}`}
                                    className="h-[100px] object-contain absolute bottom-2 left-2 z-10"
                                />
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Trending