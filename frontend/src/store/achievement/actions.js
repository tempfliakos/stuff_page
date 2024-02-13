import {achievementService} from "../../services/achievement-service";

export const SET_ACHIEVEMENTS = "SET_ACHIEVEMENTS"
export const UPDATE_ACHIEVEMENT = "UPDATE_ACHIEVEMENTS";

export function setAchievements(achievements) {
    return {type: SET_ACHIEVEMENTS, achievements};
}

export function updateAchievement(achievement) {
    return {type: UPDATE_ACHIEVEMENT, achievement};
}

export function getAchievementList(game) {
    console.log(game)
    return async (dispatch) => {
        const achievements = await achievementService.find({game: game.id});
        dispatch(setAchievements(achievements));
        return achievements;
    }
}

export function setDone(achievement) {
    return async (dispatch) => {
        await achievementService.update(achievement.id, achievement);
        dispatch(updateAchievement(achievement));
    }
}