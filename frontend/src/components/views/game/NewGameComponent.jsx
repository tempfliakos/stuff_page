import {useState} from "react";
import {getDataFromEndpoint} from "../../../services/axios";
import {AddGame} from "../../new/AddGame";
import {AddContainer} from "../../components/AddContainer";

export function NewGameComponent({games, platformConstant, addView, setAddView, wish}) {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleSearch(searchText) {
        if (searchText.length >= 3) {
            setLoading(true);
            if(wish) {
                getDataFromEndpoint("wish", searchText).then(
                    res => {
                        setResults(res.data);
                        setLoading(false);
                    });
            } else {
                getDataFromEndpoint(platformConstant.addEndpoint, searchText).then(
                    res => {
                        setResults(res.data);
                        setLoading(false);
                    });
            }
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    function contains(id) {
        const game = games.filter(g => g.game_id.toString() === id.toString())[0];
        return game !== undefined;
    }

    return <AddContainer handleSearch={handleSearch} addView={addView} setAddView={setAddView}>
        {
            results ?
                <>
                    {results.map(r =>
                        <AddGame key={r.game_id} game={r} alreadyAdded={contains(r.game_id)} wish={wish}/>
                    )}
                </>
                : null
        }
    </AddContainer>
}