// src/pages/ConnCheck.tsx
import React, { useEffect, useState } from 'react';

export default function ConnCheck() {
    const [ok, setOk] = useState('loading...');

    useEffect(() => {
        fetch('/api/menu/')                 // 由 Vite 代理到 8000
            .then(r => r.text())
            .then(t => setOk(`OK, got: ${t.slice(0, 120)}...`))
            .catch(e => setOk('FAIL: ' + e.message));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h1>后端联通检测</h1>
            <p>{ok}</p>
            <p style={{ opacity: .7, fontSize: 12 }}>（就算后端没开，这里也会显示 FAIL 信息，不会是空白。）</p>
        </div>
    );
}

