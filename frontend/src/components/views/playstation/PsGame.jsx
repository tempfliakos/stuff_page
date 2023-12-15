import {useState} from "react";
import {filterGame} from "../../../utils/FilterUtil";
import defaultGamePicture from "../../../resources/gamer_default_icon.svg";
import {TrophyModal} from "../../modals/TrophyModal";
import {useDispatch} from "react-redux";
import {update} from "../../../store/game/actions";

export function PsGame({game, filter}) {

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
        // <Card as="a" className={styles.pscard}>
        //     {
        //         isDone() ?
        //             <Label corner="right" color="blue" size="huge" className={styles.labelAdded} onClick={cardClick}>
        //                 <Icon name="trophy"/>
        //             </Label> : null
        //     }
        //
        //     {
        //         <Label corner="left" size="huge" className={styles.labelAdded}
        //                onClick={starClicked}>
        //             <Icon name="star" color={isStar() ? "yellow" : "grey"} className={styles.iconClick}/>
        //         </Label>
        //     }
        //
        //     <Image src={picture()} ui={false} wrapped onClick={cardClick}/>
        //     <Card.Content className={styles.textContent}>
        //         <Card.Header onClick={cardClick}>{game.title}</Card.Header>
        //
        //         <Card.Description textAlign="right" className={styles.xboxcardDescription}>
        //             <div style={{display: "flex"}}>
        //                 <p onClick={cardClick}>
        //                     {getAchievementData()}
        //                     <Icon name="trophy"/>
        //                 </p>
        //             </div>
        //         </Card.Description>
        //     </Card.Content>
        // </Card>
        <div>PsGame</div>
    )
    return <>{
        filterGame(game, filter, isDone()) ?
            <TrophyModal key={game.game_id} trigger={trigger} game={game} open={open} setOpen={setOpen}/>
            : null
    }
    </>
}