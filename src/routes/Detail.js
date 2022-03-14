import { useEffect, useState, useCallback } from "react";
import {useParams} from "react-router-dom"

function Detail(){
    const {id} = useParams();
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)

    const getMovie = useCallback(async() => {
        const json = await
        (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie)
        console.log(json.data.movie)
        setLoading(false)
    }, [id])

    useEffect(() => {
        getMovie();
    }, [getMovie])

    return (
    <div>
        {loading ? (<h1>Loading...</h1>)
            :(<div>
            <img src={movie.background_image} alt={movie.title}/>
            <h1>{movie.title_long}</h1>
            <p>Rating : {movie.rating} Runtime: {movie.runtime} min</p>
            <p>{movie.description_full}</p>
            <ul>
            {movie.genres.map((g) => (
                <li key={g}>{g}</li>
            ))}
            </ul>
        </div>)}
    </div>
    )

}

export default Detail;