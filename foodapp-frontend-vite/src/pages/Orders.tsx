
import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api';
import { type Order, type OrderStatus } from '../types';

const statusClass = (s: OrderStatus) =>
    s === 'ORDERED' ? 'chip warn' :
        s === 'PAID' ? 'chip ok' :
            s === 'COMPLETED' ? 'chip good' : 'chip cancel';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders().then((data: any) => setOrders(data)).catch(e => console.error('fail to get orders', e));
    }, []);

    const setStatus = async (id: number, status: OrderStatus) => {
        try {
            const updated: any = await updateOrderStatus(id, status); // PATCH 更新状态
            setOrders(prev => prev.map(o => o.id === id ? updated : o));
            // 成功后不需要刷新；状态直接在本地替换
        } catch (e: any) {
            alert('fail to renew：' + e.message);
        }
    };

    return (
        <>
            <header className="hero" style={{ padding: '40px 0' }}>
                <div className="container">
                    <h1>My Orders</h1>
                    <p>Order details are available here and you can "Pay/cancel" orders that are "placed".</p>
                </div>
            </header>

            <section className="section">
                <div className="container" style={{ display: 'grid', gap: 12 }}>
                    {orders.length === 0 ? (
                        <div className="card"><p style={{ color: 'var(--muted)' }}>No order.</p></div>
                    ) : orders.map(o => (
                        <div className="card" key={o.id}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <strong>Orders #{o.id}</strong>
                                <span className={statusClass(o.status)}>{o.status}</span>
                                <span style={{ color: 'var(--muted)' }}>
                                    {new Date(o.created_at).toLocaleString()}
                                </span>
                            </div>
                            <ul style={{ paddingLeft: 16, marginTop: 8 }}>
                                {o.order_items.map((it, idx) => (
                                    <li key={idx}>{it.item_name} × {it.quantity}</li>
                                ))}
                            </ul>
                            {o.status === 'ORDERED' && (
                                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                                    <button className="btn btn-primary" onClick={() => setStatus(o.id, 'PAID')}>Pay</button>
                                    <button className="btn btn-outline" onClick={() => setStatus(o.id, 'CANCELLED')}>Cancel</button>
                                </div>
                            )}
                            {o.status === 'PAID' && <p style={{ color: 'var(--muted)' }}>Already paid, wait for completement</p>}
                            {o.status === 'COMPLETED' && <p style={{ color: '#15803d' }}>Completed</p>}
                            {o.status === 'CANCELLED' && <p style={{ color: '#b91c1c' }}>Cancelled</p>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Orders;

