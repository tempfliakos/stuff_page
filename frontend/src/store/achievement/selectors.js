import {sortByTitle} from "../../utils/SortUtil";

export const getAchievements = (state) => sortAchievements(state.achievements);

function sortAchievements(achievements) {
    if (achievements) {
        return achievements.sort((a, b) => sortByTitle(a, b));
    }
}