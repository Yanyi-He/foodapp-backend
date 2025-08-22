
import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        try {
            await register(username, password);         // 调注册 API
            setMsg('Register successfully, please log in');
            setTimeout(() => navigate('/login'), 600);
        } catch (e: any) {
            setMsg('register failed：' + e.message);
        }
    };

    return (
        <section className="section">
            <div className="container" style={{ maxWidth: 520 }}>
                <div className="card">
                    <h2>Register</h2>
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
                            <button className="btn btn-primary" type="submit">Register</button>
                            <button className="btn btn-outline" type="button" onClick={() => navigate('/login')}>Already have an account? Go to log in</button>
                        </div>
                    </form>
                    {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
                </div>
            </div>
        </section>
    );
};

export default Register;

