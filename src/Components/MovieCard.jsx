import { Link } from "react-router-dom";

const MovieCard = ({ movie: { id, title, overview, poster_path, release_date, vote_average, original_language } }) => {
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : 'src/assets/No-Poster.png';

    return (
        <Link to={`/movie/${id}`}>
            <div className="bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <div className="relative">
                    <img
                        src={imageUrl}
                        className="w-full h-[400px] object-cover"
                        alt={title}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                        <div className="flex items-center gap-2 text-white/80">
                            <span className="flex items-center">
                                <span className="text-yellow-400 mr-1">⭐</span>
                                {vote_average.toFixed(1)}
                            </span>
                            <span>•</span>
                            <span className="uppercase">{original_language}</span>
                            <span>•</span>
                            <span>{new Date(release_date).getFullYear()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard