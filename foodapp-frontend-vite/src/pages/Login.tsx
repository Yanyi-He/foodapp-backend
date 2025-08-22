
import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState<string | null>(null);
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            await login(username, password);               // 成功会 setTokens
            navigate('/menu');                             // 回到主流程
        } catch (e: any) {
            setErr('fail to log in：' + e.message);
        }
    };

    return (
        <section className="section">
            <div className="container" style={{ maxWidth: 520 }}>
                <div className="card">
                    <h2>Log In</h2>
                    <form onSubmit={submit}>
                        <div className="form-row">
                            <label>username</label>
                            <input className="input" value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-row">
                            <label>password</label>
                            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button className="btn btn-primary" type="submit">Log In</button>
                            <button className="btn btn-outline" type="button" onClick={() => navigate('/register')}>No account? Go to register</button>
                        </div>
                    </form>
                    {err && <p style={{ color: '#b91c1c', marginTop: 12 }}>{err}</p>}
                </div>
            </div>
        </section>
    );
};

export default Login;

