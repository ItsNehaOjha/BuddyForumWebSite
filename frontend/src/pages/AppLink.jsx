import React from 'react';
import Section from '../component/Section';

const AppLink = () => {
  return (
    <Section className="py-20">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-10">Mobile App Coming Soon</h1>
        <div className="max-w-3xl mx-auto bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
          <p className="text-lg text-center mb-8">
            We're currently developing mobile applications for both Android and iOS platforms.
            Stay tuned for updates on our mobile app launch!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
            <div className="flex-1 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 text-center">Android App</h3>
              <p className="text-center mb-4">Coming soon to Google Play Store</p>
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-5xl">🤖</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 text-center">iOS App</h3>
              <p className="text-center mb-4">Coming soon to Apple App Store</p>
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-5xl">🍎</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg">Want to be notified when our app launches?</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AppLink;