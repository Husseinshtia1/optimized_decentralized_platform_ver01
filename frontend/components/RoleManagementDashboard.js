
// frontend/components/RoleManagementDashboard.js
import React, { useState, useEffect } from 'react';

const RoleManagementDashboard = () => {
  const [roles, setRoles] = useState([]);
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  // Fetch all assigned roles from the backend
  const fetchRoles = async () => {
    const response = await fetch('/api/governance/roles');
    const data = await response.json();
    setRoles(data);
  };

  // Assign a role to a user
  const assignRole = async () => {
    const response = await fetch('/api/governance/roles/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, role }),
    });
    const data = await response.json();
    setStatus(`Role ${role} assigned to ${address}: ${data.txHash}`);
    fetchRoles();
  };

  // Revoke a role from a user
  const revokeRole = async (roleAddress, roleName) => {
    const response = await fetch('/api/governance/roles/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: roleAddress, role: roleName }),
    });
    const data = await response.json();
    setStatus(`Role ${roleName} revoked from ${roleAddress}: ${data.txHash}`);
    fetchRoles();
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="role-management-dashboard">
      <h2>Governance Role Management</h2>

      <div className="assign-role">
        <h3>Assign Role</h3>
        <input
          type="text"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Role (e.g., admin)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={assignRole}>Assign Role</button>
      </div>

      <div className="roles-list">
        <h3>Assigned Roles</h3>
        <ul>
          {roles.map(({ address, role }) => (
            <li key={`${address}-${role}`}>
              <p>
                {role} - {address}
              </p>
              <button onClick={() => revokeRole(address, role)}>Revoke Role</button>
            </li>
          ))}
        </ul>
      </div>

      <p>{status}</p>
    </div>
  );
};

export default RoleManagementDashboard;
