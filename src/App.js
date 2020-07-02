import React, {useEffect, useState} from 'react';
import {MovieList} from "./components/pages/MovieList";
import {NavBar} from "./navigation/NavBar";
import {Grid} from "semantic-ui-react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login";
import Cookies from 'universal-cookie';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const cookies = new Cookies();
        if(cookies.get("id")) {
            setLoggedIn(true);
        }
        console.log("asd")
    }, [loggedIn])
    return (
        <>

            {loggedIn ?
                <>
                    <NavBar logged = {setLoggedIn}/>
                    <Grid container columns="equal">
                        <Redirect exact from="/" to="movies"/>
                        <Switch>
                            <Route default path="/movies">
                                <MovieList/>
                            </Route>
                            <Route path="/books">

                            </Route>
                            <Route path="/games">

                            </Route>
                        </Switch>
                    </Grid>
                </>
                : <Login logged = {setLoggedIn}/>}
        </>
    );
}

export default App;
