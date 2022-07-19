import {SET_ACHIEVEMENTS, UPDATE_ACHIEVEMENT} from "./actions";

export function achievementReducer(state = [], action) {
    const {type} = action;
    switch (type) {
        case SET_ACHIEVEMENTS: {
            const {achievements} = action;
            return achievements;
        }
        case UPDATE_ACHIEVEMENT: {
            const {achievement} = action;
            let array = state.filter(s => s.id !== achievement.id);
            array.push(achievement)
            return array;
        }
        default:
            return state;
    }


}