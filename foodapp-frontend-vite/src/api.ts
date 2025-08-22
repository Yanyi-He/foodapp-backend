

const BASE_URL = '';

export function setTokens(access: string, refresh?: string) {
    localStorage.setItem('access', access);
    if (refresh) localStorage.setItem('refresh', refresh);
}
export function getAccessToken() { return localStorage.getItem('access'); }
export function clearTokens() { localStorage.removeItem('access'); localStorage.removeItem('refresh'); }

async function api<T>(path: string, options: RequestInit = {}, needAuth = false): Promise<T> {
    const token = getAccessToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(needAuth && token ? { Authorization: `Bearer ${token}` } : {})
    };
    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    if (res.status === 204) return null as T;
    if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try { msg += ' ' + JSON.stringify(await res.json()); } catch { msg += ' ' + (await res.text()); }
        throw new Error(msg);
    }
    return res.json();
}

// 具体 API
export const register = (username: string, password: string) =>
    api<{ id: number; username: string }>('/api/users/register/', { method: 'POST', body: JSON.stringify({ username, password }) });

export const login = async (username: string, password: string) => {
    const data = await api<{ access: string; refresh: string }>('/api/users/token/', { method: 'POST', body: JSON.stringify({ username, password }) });
    setTokens(data.access, data.refresh);
    return data;
};

export const getMenu = () => api<any[]>('/api/menu/');
export const createOrder = (items: { id: number; quantity: number }[]) =>
    api('/api/orders/', { method: 'POST', body: JSON.stringify({ items }) }, true);
export const getOrders = () => api('/api/orders/', { method: 'GET' }, true);
export const updateOrderStatus = (id: number, status: string) =>
    api(`/api/orders/${id}/`, { method: 'PATCH', body: JSON.stringify({ status }) }, true);
