// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log('Form submitted:', formData);

//     setSubmitted(true);

//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: '',
//     });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-16 relative overflow-hidden">

//       {/* Background Effects */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

//         {/* Header */}
//         <motion.div
//           className="text-center mb-20"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-6xl font-extrabold bg-linear-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6">
//             Contact Us
//           </h1>

//           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             We'd love to hear from you. Whether it’s feedback,
//             reservations, or just saying hello — our team is always ready to connect.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//           {/* Contact Info */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >

//             <h2 className="text-3xl font-bold text-gray-800 mb-8">
//               Get in Touch
//             </h2>

//             <div className="space-y-6 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30">

//               {/* Address */}
//               <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
//                 <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
//                   <span className="text-2xl">📍</span>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Address
//                   </h3>

//                   <p className="text-gray-600">
//                     123 Food Street, Tasty City, TC 12345
//                   </p>
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
//                 <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
//                   <span className="text-2xl">📞</span>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Phone
//                   </h3>

//                   <p className="text-gray-600">
//                     +1 (555) 123-4567
//                   </p>
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
//                 <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
//                   <span className="text-2xl">📧</span>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Email
//                   </h3>

//                   <p className="text-gray-600">
//                     info@tastybites.com
//                   </p>
//                 </div>
//               </div>

//               {/* Hours */}
//               <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
//                 <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
//                   <span className="text-2xl">🕐</span>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Hours
//                   </h3>

//                   <p className="text-gray-600">
//                     Mon - Fri: 11:00 - 22:00
//                     <br />
//                     Sat - Sun: 10:00 - 23:00
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Map */}
//             <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
//               <img
//                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000"
//                 alt="Map"
//                 className="w-full h-64 object-cover"
//               />
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >

//             <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30">

//               <h2 className="text-3xl font-bold text-gray-800 mb-8">
//                 Send us a Message
//               </h2>

//               {submitted ? (
//                 <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">

//                   <div className="text-6xl mb-4">
//                     ✅
//                   </div>

//                   <h3 className="text-2xl font-bold text-green-800 mb-3">
//                     Message Sent!
//                   </h3>

//                   <p className="text-green-600 mb-6">
//                     Thank you for contacting us. We'll get back to you soon!
//                   </p>

//                   <button
//                     onClick={() => setSubmitted(false)}
//                     className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
//                   >
//                     Send Another Message
//                   </button>

//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">

//                   {/* Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name
//                     </label>

//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="John Doe"
//                       className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Email
//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       placeholder="john@example.com"
//                       className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm"
//                     />
//                   </div>

//                   {/* Subject */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Subject
//                     </label>

//                     <select
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm"
//                     >
//                       <option value="">
//                         Select a subject
//                       </option>

//                       <option value="general">
//                         General Inquiry
//                       </option>

//                       <option value="reservation">
//                         Reservation
//                       </option>

//                       <option value="feedback">
//                         Feedback
//                       </option>

//                       <option value="other">
//                         Other
//                       </option>
//                     </select>
//                   </div>

//                   {/* Message */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Message
//                     </label>

//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={5}
//                       placeholder="Tell us how we can help..."
//                       className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm resize-none"
//                     />
//                   </div>

//                   {/* Button */}
//                   <button
//                     type="submit"
//                     className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
//                   >
//                     Send Message 🚀
//                   </button>

//                 </form>
//               )}

//             </div>

//           </motion.div>

//         </div>

//       </div>

//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-red-950/20 py-16 relative overflow-hidden transition-colors">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 dark:bg-orange-900/40 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300 dark:bg-red-900/40 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-extrabold bg-linear-to-r from-orange-600 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether it’s feedback,
            reservations, or just saying hello — our team is always ready to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-zinc-800">

              {/* Address */}
              <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">📍</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Address
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    123 Food Street, Tasty City, TC 12345
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">📞</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Phone
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">📧</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Email
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    info@tastybites.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">🕐</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Hours
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    Mon - Fri: 11:00 - 22:00
                    <br />
                    Sat - Sun: 10:00 - 23:00
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000"
                alt="Map"
                className="w-full h-64 object-cover dark:opacity-80 transition-opacity"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30 dark:border-zinc-800">

              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-2xl p-8 text-center">

                  <div className="text-6xl mb-4">
                    ✅
                  </div>

                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-3">
                    Message Sent!
                  </h3>

                  <p className="text-green-600 dark:text-green-500 mb-6">
                    Thank you for contacting us. We'll get back to you soon!
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                  >
                    Send Another Message
                  </button>

                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-white/70 dark:bg-zinc-800/70 dark:text-white dark:placeholder-zinc-500 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-white/70 dark:bg-zinc-800/70 dark:text-white dark:placeholder-zinc-500 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/70 dark:bg-zinc-800/70 dark:text-white dark:placeholder-zinc-500 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm"
                    >
                      <option value="">
                        Select a subject
                      </option>

                      <option value="general">
                        General Inquiry
                      </option>

                      <option value="reservation">
                        Reservation
                      </option>

                      <option value="feedback">
                        Feedback
                      </option>

                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-5 py-4 bg-white/70 dark:bg-zinc-800/70 dark:text-white dark:placeholder-zinc-500 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-300 shadow-sm resize-none"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    Send Message 🚀
                  </button>

                </form>
              )}

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}