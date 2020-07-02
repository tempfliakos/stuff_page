import React, {useEffect, useState} from "react";
import {NewMovie} from "../NewMovie";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../../store/movie/selectors";
import {Card, Checkbox, Dropdown, Grid, Input} from "semantic-ui-react";
import {getMovieList} from "../../store/movie/actions";
import {Movie} from "../Movie";
import {genres} from "../../store/genres/selectors";
import styles from '../movie.module.css';
import Cookies from "universal-cookie/lib";

export function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(getMovies);
    const [filter, setFilter] = useState(initGenres());
    const [titleFilter, setTitleFilter] = useState("");
    const [releaseFilter, setReleaseFilter] = useState(false);
    const cookie = new Cookies();

    useEffect(() => {
        dispatch(getMovieList(cookie.get("id")));
    }, [dispatch])

    function initGenres() {
        return genres.map(g => g.text);
    }

    function handleSelect(event, data) {
        setFilter(data.value.length > 0 ? data.value : initGenres());
    }

    function handleSearch(event, data) {
        setTitleFilter(data.value);
    }

    function handleToggle(event, data) {
        setReleaseFilter(data.checked);
    }

    return (
        <Grid columns="equal" className="gridFull">
            <Grid.Row>
                <Grid.Column>
                    <Input placeholder='Film címe...' fluid onChange={handleSearch}/>
                </Grid.Column>
                <Grid.Column>
                    <Dropdown placeholder='Műfaj' fluid multiple search selection options={genres} clearable basic
                              onChange={handleSelect}/>
                </Grid.Column>

                <Grid.Column>
                        <Checkbox toggle onChange={handleToggle} label={{children: "Jövőbeni filmek"}} className={styles.toggleButton}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Card.Group relaxed="very" columns="equal" padded="vertically" centered
                            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
                    {movies ? movies.map(movie => (
                        <Movie key={movie.movie_id} movie={movie} selectedGenres={filter} titleFilter={titleFilter}
                               releaseFilter={releaseFilter}/>
                    )) : null}
                    <NewMovie movies={movies}/>
                </Card.Group>

            </Grid.Row>
        </Grid>
    )
}