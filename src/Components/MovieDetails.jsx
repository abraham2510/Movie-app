import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0E24] flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0F0E24] flex items-center justify-center">
                <div className="text-white text-2xl">Error: {error}</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#0F0E24] flex items-center justify-center">
                <div className="text-white text-2xl">Movie not found</div>
            </div>
        );
    }

    return (
        <main>
            <div className="min-h-screen bg-[#0F0E24] text-white">
                <div className="container mx-auto px-4 py-8">
                    <Link to="/" className="inline-block mb-8 text-white/80 hover:text-white">
                        ← Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="md:w-2/3">
                            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center">
                                    <span className="text-yellow-400 mr-1">⭐</span>
                                    {movie.vote_average.toFixed(1)}
                                </span>
                                <span>•</span>
                                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{movie.runtime} minutes</span>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                                <p className="text-white/80 leading-relaxed">{movie.overview}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map(genre => (
                                            <span key={genre.id} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Language</h3>
                                    <p className="text-white/80">{movie.original_language.toUpperCase()}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Budget</h3>
                                    <p className="text-white/80">
                                        {movie.budget ? `$${movie.budget.toLocaleString()}` : 'Not available'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                                    <p className="text-white/80">
                                        {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'Not available'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MovieDetails;