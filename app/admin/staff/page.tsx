// 'use client';

// import { useState } from 'react';

// type StaffMember = {
//   id: number;
//   name: string;
//   role: string;
//   phone: string;
//   salary: string;
//   joiningDate: string;
// };

// export default function StaffPage() {

//   const [staff, setStaff] = useState<StaffMember[]>([
//     {
//       id: 1,
//       name: 'Amit Kumar',
//       role: 'Chef',
//       phone: '9876543210',
//       salary: '32000',
//       joiningDate: '2025-01-12',
//     },

//     {
//       id: 2,
//       name: 'Sneha Patel',
//       role: 'Waiter',
//       phone: '9876501234',
//       salary: '18000',
//       joiningDate: '2025-02-22',
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);

//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [name, setName] = useState('');
//   const [role, setRole] = useState('');
//   const [phone, setPhone] = useState('');
//   const [salary, setSalary] = useState('');
//   const [joiningDate, setJoiningDate] = useState('');

//   // RESET FORM
//   const resetForm = () => {
//     setName('');
//     setRole('');
//     setPhone('');
//     setSalary('');
//     setJoiningDate('');
//     setEditingId(null);
//   };

//   // ADD / UPDATE STAFF
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !name ||
//       !role ||
//       !phone ||
//       !salary ||
//       !joiningDate
//     ) {
//       alert('Please fill all fields');
//       return;
//     }

//     // UPDATE
//     if (editingId !== null) {

//       setStaff((prev) =>
//         prev.map((item) =>
//           item.id === editingId
//             ? {
//                 ...item,
//                 name,
//                 role,
//                 phone,
//                 salary,
//                 joiningDate,
//               }
//             : item
//         )
//       );

//       alert('Staff updated successfully');

//     } else {

//       // ADD
//       const newStaff: StaffMember = {
//         id: Date.now(),
//         name,
//         role,
//         phone,
//         salary,
//         joiningDate,
//       };

//       setStaff((prev) => [...prev, newStaff]);

//       alert('Staff added successfully');
//     }

//     resetForm();
//     setShowForm(false);
//   };

//   // DELETE
//   const handleDelete = (id: number) => {

//     const confirmDelete = confirm(
//       'Delete this staff member?'
//     );

//     if (!confirmDelete) return;

//     setStaff((prev) =>
//       prev.filter((item) => item.id !== id)
//     );
//   };

//   // EDIT
//   const handleEdit = (member: StaffMember) => {

//     setName(member.name);
//     setRole(member.role);
//     setPhone(member.phone);
//     setSalary(member.salary);
//     setJoiningDate(member.joiningDate);

//     setEditingId(member.id);

//     setShowForm(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             👥 Staff Management
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Manage restaurant staff details
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             resetForm();
//             setShowForm(!showForm);
//           }}
//           className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-medium transition"
//         >
//           {showForm ? 'Close Form' : '+ Add Staff'}
//         </button>

//       </div>

//       {/* FORM */}
//       {showForm && (

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl shadow p-6 mb-6"
//         >

//           <h2 className="text-xl font-bold text-gray-900 mb-5">
//             {editingId !== null
//               ? 'Edit Staff'
//               : 'Add New Staff'}
//           </h2>

//           <div className="grid md:grid-cols-2 gap-4">

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) =>
//                   setName(e.target.value)
//                 }
//                 className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Role
//               </label>

//               <input
//                 type="text"
//                 placeholder="Chef / Manager / Waiter"
//                 value={role}
//                 onChange={(e) =>
//                   setRole(e.target.value)
//                 }
//                 className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 placeholder="9876543210"
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(e.target.value)
//                 }
//                 className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Monthly Salary
//               </label>

//               <input
//                 type="number"
//                 placeholder="25000"
//                 value={salary}
//                 onChange={(e) =>
//                   setSalary(e.target.value)
//                 }
//                 className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Joining Date
//               </label>

//               <input
//                 type="date"
//                 value={joiningDate}
//                 onChange={(e) =>
//                   setJoiningDate(e.target.value)
//                 }
//                 className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//           </div>

//           <button
//             type="submit"
//             className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition"
//           >
//             {editingId !== null
//               ? 'Update Staff'
//               : 'Add Staff'}
//           </button>

//         </form>
//       )}

//       {/* EMPTY STATE */}
//       {staff.length === 0 ? (

//         <div className="bg-white rounded-2xl shadow p-10 text-center">
//           <p className="text-gray-500">
//             No staff members added yet.
//           </p>
//         </div>

//       ) : (

//         <>
//           {/* DESKTOP TABLE */}
//           <div className="hidden lg:block bg-white rounded-2xl shadow overflow-hidden">
//               dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder:text-gray-400
//             <table className="w-full">

//               <thead className="bg-gray-50">

//                 <tr className="text-gray-600 text-sm">

//                   <th className="text-left px-6 py-4">
//                     Name
//                   </th>

//                   <th className="text-left px-6 py-4">
//                     Role
//                   </th>

//                   <th className="text-left px-6 py-4">
//                     Phone
//                   </th>

//                   <th className="text-left px-6 py-4">
//                     Salary
//                   </th>

//                   <th className="text-left px-6 py-4">
//                     Joining Date
//                   </th>

//                   <th className="text-left px-6 py-4">
//                     Actions
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {staff.map((member) => (

//                   <tr
//                     key={member.id}
//                     className="border-t hover:bg-gray-50 transition"
//                   >

//                     <td className="px-6 py-4 font-semibold text-gray-900">
//                       {member.name}
//                     </td>

//                     <td className="px-6 py-4">
//                       {member.role}
//                     </td>

//                     <td className="px-6 py-4">
//                       {member.phone}
//                     </td>

//                     <td className="px-6 py-4 text-green-600 font-semibold">
//                       ₹{member.salary}
//                     </td>

//                     <td className="px-6 py-4">
//                       {member.joiningDate}
//                     </td>

//                     <td className="px-6 py-4">

//                       <button
//                         onClick={() =>
//                           handleEdit(member)
//                         }
//                         className="text-blue-600 hover:underline mr-4"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(member.id)
//                         }
//                         className="text-red-600 hover:underline"
//                       >
//                         Remove
//                       </button>

//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>

//           {/* MOBILE CARDS */}
//           <div className="grid gap-4 lg:hidden">

//             {staff.map((member) => (

//               <div
//                 key={member.id}
//                 className="bg-white rounded-2xl shadow p-5"
//               >

//                 <div className="flex items-start justify-between">

//                   <div>

//                     <h2 className="text-lg font-bold text-gray-900">
//                       {member.name}
//                     </h2>

//                     <p className="text-gray-500 text-sm mt-1">
//                       {member.role}
//                     </p>

//                   </div>

//                   <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
//                     ₹{member.salary}
//                   </div>

//                 </div>

//                 <div className="mt-4 space-y-2 text-sm text-gray-600">

//                   <p>
//                     📞 {member.phone}
//                   </p>

//                   <p>
//                     📅 {member.joiningDate}
//                   </p>

//                 </div>

//                 <div className="flex gap-3 mt-5">

//                   <button
//                     onClick={() =>
//                       handleEdit(member)
//                     }
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleDelete(member.id)
//                     }
//                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
//                   >
//                     Remove
//                   </button>

//                 </div>

//               </div>
//             ))}

//           </div>
//         </>
//       )}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';

type StaffMember = {
  id: number;
  name: string;
  role: string;
  phone: string;
  salary: string;
  joiningDate: string;
};

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: 'Amit Kumar',
      role: 'Chef',
      phone: '9876543210',
      salary: '32000',
      joiningDate: '2025-01-12',
    },
    {
      id: 2,
      name: 'Sneha Patel',
      role: 'Waiter',
      phone: '9876501234',
      salary: '18000',
      joiningDate: '2025-02-22',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [joiningDate, setJoiningDate] = useState('');

  const resetForm = () => {
    setName('');
    setRole('');
    setPhone('');
    setSalary('');
    setJoiningDate('');
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !phone || !salary || !joiningDate) {
      alert('Please fill all fields');
      return;
    }

    if (editingId !== null) {
      setStaff((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, name, role, phone, salary, joiningDate }
            : item
        )
      );
      alert('Staff updated successfully');
    } else {
      const newStaff: StaffMember = {
        id: Date.now(),
        name,
        role,
        phone,
        salary,
        joiningDate,
      };
      setStaff((prev) => [...prev, newStaff]);
      alert('Staff added successfully');
    }
    resetForm();
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm('Delete this staff member?');
    if (!confirmDelete) return;
    setStaff((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (member: StaffMember) => {
    setName(member.name);
    setRole(member.role);
    setPhone(member.phone);
    setSalary(member.salary);
    setJoiningDate(member.joiningDate);
    setEditingId(member.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            👥 Staff Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage restaurant staff details
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          {showForm ? 'Close Form' : '+ Add Staff'}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
            {editingId !== null ? 'Edit Staff' : 'Add New Staff'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <input
                type="text"
                placeholder="Chef / Manager / Waiter"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Salary
              </label>
              <input
                type="number"
                placeholder="25000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Joining Date
              </label>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-black dark:bg-orange-600 hover:bg-gray-800 dark:hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            {editingId !== null ? 'Update Staff' : 'Add Staff'}
          </button>
        </form>
      )}

      {/* EMPTY STATE */}
      {staff.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No staff members added yet.
          </p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-gray-600 dark:text-gray-300 text-sm">
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-left px-6 py-4">Phone</th>
                  <th className="text-left px-6 py-4">Salary</th>
                  <th className="text-left px-6 py-4">Joining Date</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {staff.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{member.role}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{member.phone}</td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                      ₹{member.salary}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{member.joiningDate}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 dark:text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-4 lg:hidden">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {member.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {member.role}
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                    ₹{member.salary}
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>📞 {member.phone}</p>
                  <p>📅 {member.joiningDate}</p>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}