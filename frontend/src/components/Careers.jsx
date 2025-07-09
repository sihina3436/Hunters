import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Careers = () => {
  return (
    <div className="text-gray-800 bg-white min-h-screen">
        <Navbar />
      {/* Hero Section */}
      <div className="bg-gray-50 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-pink-800 mb-4">Join Our Team</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We’re always on the lookout for people passionate about fashion, tech, and customer delight.
        </p>
      </div>

      {/* Why Join Us */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-pink-700 mb-6">Why Work With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: 'ri-lightbulb-line', label: 'Creative Culture' },
            { icon: 'ri-rocket-2-line', label: 'Career Growth' },
            { icon: 'ri-macbook-line', label: 'Flexible Work' },
            { icon: 'ri-book-read-line', label: 'Learning Support' },
            { icon: 'ri-team-line', label: 'Inclusive Team' },
            { icon: 'ri-focus-3-line', label: 'Purpose-Driven' },
          ].map((item, i) => (
            <div key={i} className="bg-pink-50 rounded-lg p-6 shadow hover:shadow-md transition text-center">
              <i className={`${item.icon} text-3xl text-pink-700 mb-3`}></i>
              <p className="text-gray-700 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-pink-800 text-center mb-10">Open Positions</h2>

          <div className="space-y-6">
            {[
              {
                title: 'Fashion Product Photographer',
                location: 'Colombo – On-site',
                type: 'Full-time',
                description:
                  'Capture high-quality visuals for our products. Experience with fashion/product photography required.',
              },
              {
                title: 'Customer Support Executive',
                location: 'Remote (Sri Lanka)',
                type: 'Part-time',
                description:
                  'Assist customers via live chat & email. Strong communication skills and empathy needed.',
              },
              {
                title: 'Marketing Manager',
                location: 'Remote or Colombo',
                type: 'Part-Time',
                description:
                  'Lead and execute marketing strategies across digital and offline channels. Manage campaigns, analyze performance, and grow brand presence.',
              },
            ].map((job, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-pink-700">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <i className="ri-map-pin-line mr-1"></i> {job.location} &nbsp;|&nbsp;
                  <i className="ri-time-line mr-1"></i> {job.type}
                </p>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <a
                  href="mailto:zerozclothes@gmail.com ?subject=Job Application: {job.title}"
                  className="inline-block bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Don’t see your role listed?</h2>
        <p className="text-gray-600 mb-6">
          We’re always open to new talent. Email us your resume at <strong>zerozclothes@gmail.com </strong>.
        </p>
        <a
          href="mailto:zerozclothes@gmail.com?subject=Job Application"
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-md transition"
        >
          Send Resume
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default Careers;6
