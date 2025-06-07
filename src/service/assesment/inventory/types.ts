

export interface IInventoryAssessment {
    increaseQuantity(id:string,quantity:number):Promise<void>
    decreaseQuantity(id:string,quantity:number):Promise<void>
}