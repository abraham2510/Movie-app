import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [deBounnceSearchTerm, setDeBounnceSearchTerm] = useState('')

    const [movieList, setMovieList] = useState([])

    useDebounce(() => {
        setDeBounnceSearchTerm(searchTerm)
    }, 300, [searchTerm])

    const fetchMovies = async (query = '') => {
        try {
            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
                `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            const data = await response.json();
            setMovieList(data.results || []);
            console.log("Fetched Movies:", data);

        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    useEffect(() => {
        fetchMovies(deBounnceSearchTerm);
    }
        , [deBounnceSearchTerm]);

    return (
        <>
            <div className='2xl:container mx-auto'>
                <div className='w-[90%] mx-auto'>
                    <div className='flex justify-center items-center pt-14'>
                        <img src="src/assets/logo.png" alt="logo" />
                    </div>
                    <div className='flex justify-center items-start'>
                        <img className='h-[350px]' src="src/assets/hero-img.png" alt="hero" />
                    </div>
                    <div className='flex flex-col justify-center items-center text-center text-[56px] font-[60px] text-white leading-[60px] '>
                        <h1 className=''>Find <span className='bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent'>Movies</span> You’ll Love</h1>
                        <h1>Without the Hassle</h1>
                    </div>
                    <div className="flex justify-center items-center pt-10">
                        <div className="relative w-1/2">
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                type="text"
                                placeholder="Search through 300+ movies online"
                                className="bg-[#0F0E24] text-white w-full py-4 pl-12 pr-4 rounded-md focus:outline-none"
                            />
                            <img
                                src="src/assets/search.svg"
                                alt="search"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 opacity-60"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="container mx-auto px-4">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {movieList.map((movie) => {
                                    return (
                                        <MovieCard key={movie.id} movie={movie} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header