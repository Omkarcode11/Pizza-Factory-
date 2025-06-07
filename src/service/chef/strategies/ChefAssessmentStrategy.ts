import { IChefAssessmentStrategy } from "./types";

export class ChefAssessmentStrategy implements IChefAssessmentStrategy {
  public selectChef(chefs: ChefDto[]): ChefDto | null {
    return chefs.sort((a, b) => b.performance_score - a.performance_score)[0];
  }
}
