
import React, { useState } from 'react';
import axios from 'axios';

function TwoFactorAuth() {
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [token, setToken] = useState('');

    const generate2FA = async () => {
        try {
            const response = await axios.post('/api/2fa/generate');
            setQrCode(response.data.qrCode);
            setSecret(response.data.secret);
        } catch (error) {
            alert('Failed to generate 2FA');
        }
    };

    const verify2FA = async () => {
        try {
            await axios.post('/api/2fa/verify', { token, secret });
            alert('2FA Verified');
        } catch (error) {
            alert('Invalid 2FA token');
        }
    };

    return (
        <div>
            <h2>Two-Factor Authentication (2FA)</h2>
            <button onClick={generate2FA}>Generate 2FA QR Code</button>
            {qrCode && <img src={qrCode} alt="2FA QR Code" />}
            <input
                type="text"
                placeholder="Enter 2FA Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <button onClick={verify2FA}>Verify 2FA</button>
        </div>
    );
}

export default TwoFactorAuth;
