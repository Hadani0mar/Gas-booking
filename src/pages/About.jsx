import React from 'react';
import { 
  Shield, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  Phone,
  CheckCircle,
  Star
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black py-20 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            عن منصة حجز الغاز
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            نحن الرواد في مجال توصيل الغاز المنزلي في المملكة العربية السعودية، نقدم خدمات موثوقة وسريعة لجميع عملائنا
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <StatCard 
            icon={<Users size={40} />}
            number="50,000+"
            title="عميل راضٍ"
            color="text-blue-500"
          />
          <StatCard 
            icon={<Clock size={40} />}
            number="24/7"
            title="خدمة متواصلة"
            color="text-green-500"
          />
          <StatCard 
            icon={<MapPin size={40} />}
            number="100+"
            title="نقطة توزيع"
            color="text-orange-500"
          />
          <StatCard 
            icon={<Award size={40} />}
            number="5"
            title="سنوات خبرة"
            color="text-purple-500"
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
              لماذا تختار منصتنا؟
            </h2>
            
            <FeatureItem 
              icon={<Shield size={24} />}
              title="أمان وجودة مضمونة"
              description="جميع أسطوانات الغاز مفحوصة ومعتمدة من الجهات المختصة"
            />
            
            <FeatureItem 
              icon={<Clock size={24} />}
              title="توصيل سريع"
              description="نضمن وصول طلبك في أسرع وقت ممكن"
            />
            
            <FeatureItem 
              icon={<Star size={24} />}
              title="خدمة عملاء متميزة"
              description="فريق دعم متاح على مدار الساعة لمساعدتك"
            />
          </div>

          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              رؤيتنا ورسالتنا
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  رؤيتنا
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  أن نكون الخيار الأول والأكثر ثقة في مجال توصيل الغاز المنزلي في المملكة
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  رسالتنا
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  تقديم خدمة توصيل غاز آمنة وموثوقة وسريعة لجميع المنازل في المملكة مع الحفاظ على أعلى معايير الجودة والأمان
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 transition-colors duration-300">
            قيمنا الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield size={32} />}
              title="الأمان"
              description="نضع سلامة عملائنا في المقدمة دائماً"
            />
            <ValueCard 
              icon={<CheckCircle size={32} />}
              title="الجودة"
              description="نلتزم بأعلى معايير الجودة في جميع خدماتنا"
            />
            <ValueCard 
              icon={<Users size={32} />}
              title="رضا العملاء"
              description="هدفنا الأول هو تحقيق رضا عملائنا الكامل"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, number, title, color }) {
  return (
    <div className="text-center bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105">
      <div className={`inline-flex items-center justify-center w-16 h-16 ${color} mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
        {title}
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4 rtl:space-x-reverse">
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow-lg flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-300 hover:scale-105">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}

