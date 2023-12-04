import {useState} from "react";
import styles from "../../styles/movie.module.css";
import {filterGame} from "../../../utils/FilterUtil";
import defaultGamePicture from "../../../resources/gamer_default_icon.svg";
import {TrophyModal} from "../../modals/TrophyModal";
import {useDispatch} from "react-redux";
import {update} from "../../../store/game/actions";
import gameStyles from "../../styles/game.module.css";

export function PsGameMobile({game, filter}) {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    function getAchievementData() {
        return game.earned + "/" + game.sum;
    }

    function isDone() {
        return game.earned === game.sum;
    }

    function isStar() {
        return game.star;
    }

    function cardClick() {
        setOpen(true);
    }

    function starClicked() {
        game.star = !game.star;
        dispatch(update(game));
    }

    function picture() {
        if(game.picture && game.picture !== "null") {
            return game.picture;
        }
        return defaultGamePicture;
    }

    const trigger = (
        // <Grid.Row>
        //     <Grid.Column className={styles.movieMobile}>
        //         {
        //             isDone() ?
        //                 <Label corner="right" color="blue"  onClick={cardClick}>
        //                     <Icon name="trophy"/>
        //                 </Label> : null
        //         }
        //
        //         {
        //             <Label corner="left" size="huge" className={styles.labelAdded}
        //                    onClick={starClicked}>
        //                 <Icon name="star" color={isStar() ? "yellow" : "grey"} className={gameStyles.iconClick}/>
        //             </Label>
        //         }
        //         <Image src={picture()} size='small' verticalAlign='middle' onClick={cardClick}/>{' '}
        //         <span className={styles.movieMobileText} onClick={cardClick}>
        //                         {game.title}
        //                     </span>
        //         <div style={{display: "flex", padding: "25px"}} onClick={cardClick}>
        //             {getAchievementData()}
        //             <Icon name="trophy"/>
        //         </div>
        //     </Grid.Column>
        // </Grid.Row>
        <div>PsGameMobile</div>
    )
    return <>
        {
            filterGame(game, filter, isDone()) ?
                <TrophyModal key={game.game_id} trigger={trigger} game={game} open={open} setOpen={setOpen}/>
                : null
        }
    </>
}