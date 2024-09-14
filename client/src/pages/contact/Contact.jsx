import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required.');
      return;
    }

    // Here you would typically handle form submission, e.g., sending data to an API
    console.log('Form data submitted:', formData);

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setError('');
  };

  return (
    <div className="h-[352px] w-full p-6 flex items-center justify-center text-white shadow-black shadow-md">
      <div className="h-full w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-cyan-aqua-400 text-center mb-6">CONTACT</h1>

        {submitted ? (
          <div className="p-4 bg-green-800 rounded-lg text-center text-white">
            <h2 className="text-xl font-bold">Thank you!</h2>
            <p>Your message has been sent successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-4">
              {error && <p className="text-red-950 text-center">{error}</p>}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-3 border-b border-gray-300 bg-transparent text-center text-white outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="p-3 border-b border-gray-300 bg-transparent text-center text-white outline-none"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="p-3 border-b  border-gray-300 bg-transparent text-center text-white outline-none"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="p-3 rounded-lg border h-48 w-full scrollbar-custom border-gray-300 bg-transparent text-white outline-none"
              />
              <button
                type="submit"
                className="bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white py-2 rounded-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
