export interface IChefAssessmentStrategy {
  selectChef(chefs: ChefDto[]): ChefDto | null;
}
