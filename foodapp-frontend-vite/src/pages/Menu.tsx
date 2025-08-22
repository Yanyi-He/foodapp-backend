
import React, { useEffect, useState } from 'react';
import { createOrder, getMenu } from '../api';
import { type MenuItem } from '../types';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [cart, setCart] = useState<Record<number, number>>({});
    const navigate = useNavigate();

    useEffect(() => {
        getMenu()
            .then((data: any[]) => setItems(data.map(d => ({ ...d, price: Number(d.price) }))))
            .catch(e => console.error('Fail to get menu', e));
    }, []);

    const add = (id: number) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const sub = (id: number) => setCart(prev => {
        const next = { ...prev }; if (!next[id]) return next;
        next[id] -= 1; if (next[id] <= 0) delete next[id]; return next;
    });

    const submit = async () => {
        const entries = Object.entries(cart);
        if (entries.length === 0) return alert('Please choose a dish');
        const payload = entries.map(([id, qty]) => ({ id: Number(id), quantity: qty }));
        try {
            const order: any = await createOrder(payload);    // 下单
            setCart({});
            alert(`Order successfully! Order Number #${order.id}`);
            navigate('/orders');
        } catch (e: any) {
            alert('Fail to order：' + e.message);
        }
    };

    return (
        <>
            <header className="hero" style={{ padding: '40px 0' }}>
                <div className="container">
                    <h1>Menu</h1>
                    <p>Select your favorite items and add them to the shopping cart. Click "Submit Order" to create a new order.</p>
                </div>
            </header>


            <section className="section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
                    <div>
                        <div className="grid">
                            {items.map(it => (
                                <div className="card" key={it.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <strong>{it.name}</strong>
                                        <span>￥{it.price.toFixed(2)}</span>
                                    </div>
                                    <p style={{ color: 'var(--muted)', margin: '8px 0 12px' }}>{it.description || '— No description —'}</p>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-primary" onClick={() => add(it.id)}>Add</button>
                                        {cart[it.id] ? (
                                            <>
                                                <span className="chip ok">× {cart[it.id]}</span>
                                                <button className="btn btn-outline" onClick={() => sub(it.id)}>Delect</button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside>
                        <div className="card">
                            <h3>My choice</h3>
                            {Object.keys(cart).length === 0 ? <p style={{ color: 'var(--muted)' }}>Shopping Cart is empty</p> : (
                                <ul style={{ paddingLeft: 16 }}>
                                    {Object.entries(cart).map(([id, qty]) => {
                                        const item = items.find(i => i.id === Number(id));
                                        return item ? <li key={id}>{item.name} × {qty}</li> : null;
                                    })}
                                </ul>
                            )}
                            <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
                                <button className="btn btn-primary" onClick={submit}>Submit Your order</button>
                                <button className="btn btn-outline" onClick={() => setCart({})}>Empty</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </>
    );
};

export default Menu;

