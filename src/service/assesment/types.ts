

export interface IChefAssessmentService {
    assignedChefToOrder(orderId:string):Promise<void>;
    assignPendingChefToOrder():Promise<void>
}