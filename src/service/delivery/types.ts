
export interface deliveryDto {
    id : string ,
    deliveryAgentId: string,
    orderId: string,
    deliveryDate: string,
    createdAt: Date,
    updatedAt:Date 
}

export interface deliveryCreateRequest {
    orderId: string,
}

export interface IDeliveryService {
    getAllDelivery():Promise<deliveryDto[]>
    getAllDeliveryByUserId(userId:string): Promise<deliveryDto[]>
    getDeliveryById(deliveryId: string): Promise<deliveryDto>
    createDelivery(deliveryInstance:deliveryCreateRequest): Promise<deliveryDto>
}