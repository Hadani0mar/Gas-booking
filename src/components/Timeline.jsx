import React from "react";
import { 
  Flame, 
  CalendarClock, 
  MapPin, 
  PhoneCall, 
  Shield, 
  Truck, 
  Clock, 
  Star,
  CheckCircle,
  Zap
} from "lucide-react";

export default function Timeline() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-8 transition-colors duration-300">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6 shadow-2xl">
            <Flame size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            مرحباً بك في منصة حجز الغاز
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            احجز أسطوانتك من أقرب نقطة توزيع بسهولة وسرعة مع أفضل خدمة في المملكة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Feature 
            icon={<Zap size={32} />} 
            title="حجز سريع" 
            desc="حدد الكمية والموقع واطلب فوراً خلال دقائق معدودة"
            gradient="from-blue-500 to-cyan-500"
          />
          <Feature 
            icon={<MapPin size={32} />} 
            title="نقاط توزيع قريبة" 
            desc="اختيار ذكي لأقرب مركز توزيع في منطقتك"
            gradient="from-green-500 to-emerald-500"
          />
          <Feature 
            icon={<CalendarClock size={32} />} 
            title="مواعيد مرنة" 
            desc="اختر الوقت المناسب لك على مدار الساعة"
            gradient="from-purple-500 to-violet-500"
          />
          <Feature 
            icon={<Shield size={32} />} 
            title="أمان مضمون" 
            desc="جميع الأسطوانات مفحوصة ومعتمدة للاستخدام الآمن"
            gradient="from-red-500 to-pink-500"
          />
          <Feature 
            icon={<Truck size={32} />} 
            title="توصيل سريع" 
            desc="خدمة توصيل مجانية لجميع أنحاء المدينة"
            gradient="from-yellow-500 to-orange-500"
          />
          <Feature 
            icon={<PhoneCall size={32} />} 
            title="دعم مباشر" 
            desc="خدمة عملاء متوفرة دائماً لمساعدتك"
            gradient="from-indigo-500 to-blue-500"
          />
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AdditionalFeature 
            icon={<Clock size={28} />}
            title="خدمة 24/7"
            desc="متوفرون لخدمتك في أي وقت من اليوم"
          />
          <AdditionalFeature 
            icon={<Star size={28} />}
            title="تقييم عالي"
            desc="أكثر من 50,000 عميل راضٍ عن خدماتنا"
          />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc, gradient }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
           style={{background: `linear-gradient(to right, var(--tw-gradient-stops))`}}></div>
      <div className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 text-right hover:bg-white/90 dark:hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {desc}
        </p>
      </div>
    </div>
  );
}

function AdditionalFeature({ icon, title, desc }) {
  return (
    <div className="flex items-start space-x-4 rtl:space-x-reverse text-right bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-xl p-6 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-all duration-300">
      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 text-white rounded-lg shadow-lg flex-shrink-0 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{desc}</p>
      </div>
    </div>
  );
}


