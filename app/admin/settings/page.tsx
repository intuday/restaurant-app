'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('My Restaurant');
  const [email, setEmail] = useState('admin@restaurant.com');
  const [phone, setPhone] = useState('9876543210');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}