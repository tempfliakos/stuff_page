import React, {useState} from "react";
import {Card, Form, Input, Modal} from "semantic-ui-react";
import {AddMovie} from "../AddMovie";
import {makeGetRequest} from "../../services/axios";

export function NewMovieModal({trigger, movies}) {

    const [results, setResults] = useState([]);
    const [isOpen, setOpen] = useState(false);

    function handleSearch(event) {
        if(event.target.value) {
            makeGetRequest(process.env.REACT_APP_TMDB_LINK,{query: event.target.value}).then(
                res => {
                    if (res) {
                        setResults(res.data.results)
                    }
                }
            )
        }
        setResults([]);

    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setResults([]);
        setOpen(false);
    }

    function contains(id) {
        const list = movies.map(m => m.movie_id.toString());
        return list.includes(id.toString());
    }

    return (
        <Modal open={isOpen} trigger={trigger} onOpen={handleOpen} onClose={handleClose} basic>
            <Form inverted>
                <Form.Field>
                    <label>Film címe</label>
                    <Input placeholder="Film keresése..." onChange={handleSearch} />
                </Form.Field>
                {results ?
                    <Card.Group relaxed="very" columns="equal" padded="vertically" centered itemsPerRow={window.screen.width > 800 ? 4 : 1}>
                        {results.map(r =>
                            <AddMovie key={r.id} movie={r} alreadyAdded={contains(r.id.toString())}/>
                        )}
                    </Card.Group> : null}
            </Form>
        </Modal>
    )
}