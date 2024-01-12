import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGames} from "../../store/game/selectors";
import {getWishlist} from "../../store/game/actions";
import {WishGame} from "../views/wishlist/WishGame";
import {trackPromise} from "react-promise-tracker";
import {Card} from "../abstracts/Card";
import {PLAYSTATION, XBOX} from "../constants/ConsoleConstants";

export function Wishlist() {

    const [console, setConsole] = useState(null);

    const games = useSelector(getGames);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getGames() {
            return trackPromise(dispatch(getWishlist()));
        }

        async function setData() {
            await getGames();
        }

        setData();
    }, [dispatch]);

    function getList() {
        return games.filter(g => g.console === console && g.wish === true);
    }

    function getGameList() {
        let result = [];
        console.log("asd");
        for (let game of getList()) {
            result.push(<WishGame key={game.game_id} game={game}/>);
        }
        return result;
    }

    return <div className="grid-area-main">
        <div className="d-flex gap-3">
            {console ? <div>
                    { getGameList() }
                </div> :
                <>
                    <Card title={XBOX.gameType} onClick={() => setConsole(XBOX.addEndpoint)}/>
                    <Card title={PLAYSTATION.gameType} onClick={() => setConsole(PLAYSTATION.addEndpoint)}/>
                </>
            }

        </div>
    </div>
}