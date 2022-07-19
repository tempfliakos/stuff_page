import {ApiService} from "../utils/api-service";

class AchievementService extends ApiService {
    constructor() {
        super("achievements");
    }
}

export const achievementService = new AchievementService();