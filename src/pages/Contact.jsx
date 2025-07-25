import React from 'react';
import {
  Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black py-20 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            نحن هنا لمساعدتك! لا تتردد في التواصل معنا عبر أي من القنوات التالية.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ContactCard 
            icon={<Phone size={32} />}
            title="اتصل بنا"
            content="+966 50 123 4567"
            link="tel:+966501234567"
          />
          <ContactCard 
            icon={<Mail size={32} />}
            title="البريد الإلكتروني"
            content="info@gasbooking.sa"
            link="mailto:info@gasbooking.sa"
          />
          <ContactCard 
            icon={<MapPin size={32} />}
            title="عنواننا"
            content="الرياض، المملكة العربية السعودية"
            link="https://maps.google.com/?q=الرياض"
          />
        </div>

        {/* Working Hours & Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              ساعات العمل
            </h3>
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-600 dark:text-gray-300 transition-colors duration-300">
              <Clock size={24} />
              <span>السبت - الخميس: 9:00 صباحًا - 6:00 مساءً</span>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-600 dark:text-gray-300 mt-4 transition-colors duration-300">
              <Clock size={24} />
              <span>الجمعة: مغلق</span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              تابعنا على وسائل التواصل الاجتماعي
            </h3>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <SocialLink icon={<Facebook size={32} />} href="#" />
              <SocialLink icon={<Twitter size={32} />} href="#" />
              <SocialLink icon={<Instagram size={32} />} href="#" />
              <SocialLink icon={<Linkedin size={32} />} href="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, content, link }) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
        {content}
      </p>
    </a>
  );
}

function SocialLink({ icon, href }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-300"
    >
      {icon}
    </a>
  );
}

