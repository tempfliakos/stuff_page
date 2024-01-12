import {Scrollable} from "../components/Scrollable";
import {SWITCH} from "../constants/ConsoleConstants";
import {NewGameComponent} from "../views/game/NewGameComponent";
import {GameComponent} from "../views/game/GameComponent";
import {useDispatch, useSelector} from "react-redux";
import {getGames} from "../../store/game/selectors";
import {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {getGameList, initGameList} from "../../store/game/actions";

export function SwitchList() {

    let defaultFilter = {
        title: '',
        console: SWITCH.gameType,
    };

    const [filter, setFilter] = useState(defaultFilter);
    const [titleFilter, setTitleFilter] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(-1);
    const [scrollable, setScrollable] = useState(true);
    const [addView, setAddView] = useState(false);

    const games = useSelector(getGames);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getGames() {
            if (page === 1) {
                return trackPromise(dispatch(initGameList(SWITCH.gameType, page, titleFilter)));
            } else {
                return trackPromise(dispatch(getGameList(SWITCH.gameType, page, titleFilter)));
            }
        }

        async function setData() {
            await getGames();
        }

        setData().then(() => {
            if(games.length === count) {
                setScrollable(false);
            } else {
                setCount(games.length);
            }
        });
    }, [page, titleFilter]);

    function handleScroll() {
        if (scrollable && (window.scrollY + 1 + window.innerHeight) >= document.documentElement.offsetHeight) {
            setPage(page + 1);
        }
    }

    return <div className="grid-area-main">
        <NewGameComponent games={games} consoleConstant={SWITCH} addView={addView} setAddView={setAddView}/>
        {!addView ?
            <Scrollable scrollFunction={handleScroll}>
                <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
                    {games ? games.map(game => (
                        <GameComponent key={game.game_id} game={game} filter={filter}/>
                    )) : null}
                </div>
            </Scrollable> : null
        }
    </div>
}