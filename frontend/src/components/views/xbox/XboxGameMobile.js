import React, {useState} from "react";
import styles from "../../styles/movie.module.css";
import gameStyles from "../../styles/game.module.css";
import {filterGame} from "../../../utils/FilterUtil";
import {AchievementModal} from "../../modals/AchievementModal";
import {update} from "../../../store/game/actions";
import {useDispatch} from "react-redux";
export function XboxGameMobile({game, filter}) {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    function getAchievementData() {
        return Math.floor(game.earned / game.sum * 100) + "%";
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

    const trigger = (
        // <Grid.Row>
        //     <Grid.Column className={styles.movieMobile}>
        //         {
        //             isDone() ?
        //                 <Label corner="right" color="green" onClick={cardClick}>
        //                     <Icon name="trophy"/>
        //                 </Label> : null
        //         }
        //         {
        //             <Label corner="left" size="huge" className={styles.labelAdded}
        //                    onClick={starClicked}>
        //                 <Icon name="star" color={isStar() ? "yellow" : "grey"} className={gameStyles.iconClick}/>
        //             </Label>
        //         }
        //         <Image src={game.picture} size='small' verticalAlign='middle' onClick={cardClick}/>{' '}
        //         <span className={styles.movieMobileText} onClick={cardClick}>
        //                         {game.title}
        //                     </span>
        //         <div style={{display: "flex", padding: "25px"}} onClick={cardClick}>
        //             {getAchievementData()}
        //         </div>
        //     </Grid.Column>
        // </Grid.Row>
        <div>XboxGameMobile</div>
    )
    return <>
        {
            filterGame(game, filter, isDone()) ?
                <AchievementModal key={game.game_id} trigger={trigger} game={game} open={open} setOpen={setOpen}/>
                : null
        }
    </>
}