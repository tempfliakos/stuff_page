import {ApiParent} from "../utils/ApiParent";

class AchievementService extends ApiParent {
    constructor() {
        super("achievements");
    }
}

export const achievementService = new AchievementService();