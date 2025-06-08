
export interface DeliveryDto {
    id : string ,
    delivery_agent_id: string,
    order_id: string,
    delivery_at: Date,
    createdAt: Date,
    updatedAt:Date 
}

export interface DeliveryCreateRequest {
    orderId: string,
}

export interface IDeliveryService {
    getAllDeliveries():Promise<DeliveryDto[]>
    getAllDeliveryByUserId(userId:string): Promise<DeliveryDto[]>
    getDeliveryById(deliveryId: string): Promise<DeliveryDto | null>
    createDelivery(deliveryInstance:DeliveryCreateRequest): Promise<DeliveryDto>
    getDeliveryByOrderId(orderId:string): Promise<DeliveryDto | null>
}