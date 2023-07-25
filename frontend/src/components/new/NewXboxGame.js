import React, {useState} from "react";
import {getDataFromEndpoint} from "../../services/axios";
import {AddGame} from "./AddGame";
import {AddGameMobile} from "./AddGameMobile";
import {Button} from "../abstracts/Button";
import {AddMovie} from "./AddMovie";

export function NewXboxGame({games}) {

    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleSearch() {
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

    return <div>
        <div class="d-flex align-items-center justify-content-center">
            <input placeholder="Játék hozzáadása" class="bg-dark-grey c-white w-100"
                   onChange={(event) => setSearchText(event.target.value)}/>
            <Button onClick={handleSearch} classNames="add" icon="icon-search"/>
        </div>
        <div class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
            {
                results ?
                    <>
                        {results.map(r =>
                            <AddGame key={r.game_id} game={r} alreadyAdded={contains(r.game_id)}/>
                        )}
                    </>
                    : null
            }
        </div>
    </div>

        // <Form inverted>
        //     <Form.Field>
        //         <Input placeholder="Játék hozzáadása..." onChange={handleSearchInputChange} value={searchInput}
        //                action={<Button onClick={handleSearch} content="Keresés" color="green" icon="search"
        //                                loading={loading} disabled={loading}/>}/>
        //     </Form.Field>
        //     {results ?
        //         <>
        //             <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        //                 <Card.Group relaxed="very" columns="equal" padded="vertically" centered
        //                             itemsPerRow={window.screen.width > 800 ? 4 : 1} style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
        //                     {results.map(r =>
        //                         <AddGame key={r.game_id} game={r} alreadyAdded={contains(r.game_id)}/>
        //                     )}
        //                 </Card.Group>
        //             </Responsive>
        //
        //             <Responsive as={Grid} {...Responsive.onlyMobile}>
        //                 <Grid columns="equal" style={{backgroundColor: '#6f6f6f', borderRadius: '21px'}}>
        //                     {results.map(r =>
        //                         <AddGameMobile key={r.game_id} game={r} alreadyAdded={contains(r.game_id)}/>
        //                     )}
        //                 </Grid>
        //             </Responsive>
        //         </>
        //         : null}
        // </Form>
}