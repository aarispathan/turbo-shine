// src/pages/ResetPassword.tsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handle = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email);
        setMsg('Check your inbox!');
    };

    return (
        <form onSubmit={handle}>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <button>Send reset link</button>
            {msg && <p>{msg}</p>}
        </form>
    );
}
