import defaultGamePicture from "../resources/gamer_default_icon.svg";

export function gamePicture(game) {
	if (game.picture) {
		return game.picture;
	}
	return defaultGamePicture;
}