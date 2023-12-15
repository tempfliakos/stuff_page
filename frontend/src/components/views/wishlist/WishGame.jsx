import {useDispatch} from "react-redux";
import {removeGame} from "../../../store/game/actions";

export function WishGame({game}) {

    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(removeGame(game));
    }

    return <div>WishGame</div>
    // <Card as="a" className={getHover()}>
    //     <Image src={game.picture} ui={false} wrapped/>
    //     <Card.Content className={styles.textContent}>
    //         <Card.Header>{game.title}</Card.Header>
    //         <Button animated='vertical' color="red" size="tiny"
    //                 onClick={handleDelete} fluid>
    //             <Button.Content hidden>Törlés</Button.Content>
    //             <Button.Content visible>
    //                 <Icon name='trash'/>
    //             </Button.Content>
    //         </Button>
    //     </Card.Content>
    // </Card>
}