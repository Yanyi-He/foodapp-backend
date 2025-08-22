
export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
}

export interface OrderItem {
    item_id: number;
    item_name: string;
    quantity: number;
}

export type OrderStatus = 'ORDERED' | 'PAID' | 'COMPLETED' | 'CANCELLED';

export interface Order {
    id: number;
    status: OrderStatus;
    created_at: string;
    order_items: OrderItem[];
}



