import {useState} from "react";
import {getDataFromEndpoint} from "../../../services/axios";
import {AddGame} from "../../new/AddGame";
import {Button} from "../../abstracts/Button";
import {AddMovie} from "../movie/AddMovie";
import {AddBook} from "../book/AddBook";
import {AddContainer} from "../../components/AddContainer";

export function NewXboxGame({games}) {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleSearch(searchText) {
        if (searchText.length >= 3) {
            setLoading(true);
            getDataFromEndpoint('xbox', searchText).then(
                res => {
                    setResults(res.data);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    function contains(id) {
        const game = games.filter(g => g.game_id.toString() === id.toString())[0];
        return !!game;
    }

    return <AddContainer handleSearch={handleSearch}>
        {
            results ?
                <>
                    {results.map(r =>
                        <AddGame key={r.game_id} game={r} alreadyAdded={contains(r.game_id)}/>
                    )}
                </>
                : null
        }
    </AddContainer>
}