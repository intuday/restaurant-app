// 'use client';

// export default function ReservationsPage() {

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">

//       <div className="bg-white shadow-xl rounded-3xl p-10 max-w-xl w-full text-center border border-gray-100">

//         {/* ICON */}
//         <div className="text-6xl mb-5">
//           📅
//         </div>

//         {/* TITLE */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-3">
//           Reservations Management
//         </h1>

//         {/* SUBTITLE */}
//         <p className="text-gray-500 text-lg leading-relaxed">
//           This feature is currently under development and will be available soon.
//         </p>

//         {/* FEATURES */}
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">

//           <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
//             <h2 className="font-semibold text-gray-800">
//               📅 Table Booking
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Accept and manage reservations easily.
//             </p>
//           </div>

//           <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
//             <h2 className="font-semibold text-gray-800">
//               ⏰ Time Scheduling
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Organize bookings with date and time slots.
//             </p>
//           </div>

//           <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//             <h2 className="font-semibold text-gray-800">
//               👥 Guest Management
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Track guests and seating capacity.
//             </p>
//           </div>

//           <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
//             <h2 className="font-semibold text-gray-800">
//               🔔 Notifications
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Send booking confirmations and reminders.
//             </p>
//           </div>

//         </div>

//         {/* COMING SOON */}
//         <div className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide">
//           🚀 Coming Soon
//         </div>

//       </div>

//     </div>
//   );
// }
'use client';

export default function ReservationsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-10 max-w-xl w-full text-center border border-gray-100 dark:border-gray-700">
        
        {/* ICON */}
        <div className="text-6xl mb-5">
          📅
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Reservations Management
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
          This feature is currently under development and will be available soon.
        </p>

        {/* FEATURES */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4">
            <h2 className="font-semibold text-gray-800 dark:text-orange-100">
              📅 Table Booking
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Accept and manage reservations easily.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4">
            <h2 className="font-semibold text-gray-800 dark:text-blue-100">
              ⏰ Time Scheduling
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Organize bookings with date and time slots.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl p-4">
            <h2 className="font-semibold text-gray-800 dark:text-green-100">
              👥 Guest Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track guests and seating capacity.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 rounded-2xl p-4">
            <h2 className="font-semibold text-gray-800 dark:text-purple-100">
              🔔 Notifications
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Send booking confirmations and reminders.
            </p>
          </div>

        </div>

        {/* COMING SOON */}
        <div className="mt-8 inline-block bg-black dark:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide">
          🚀 Coming Soon
        </div>

      </div>
    </div>
  );
}