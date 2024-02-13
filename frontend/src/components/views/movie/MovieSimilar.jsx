export function MovieSimilar({movie, onClick}) {
    return <div className="d-flex justify-content-center mb-3 hover-opacity-50 cursor-pointer" onClick={onClick}>
        <img className="border-radius-20-px max-height-20" src={movie.poster_path} alt={movie.title}/>
    </div>
}