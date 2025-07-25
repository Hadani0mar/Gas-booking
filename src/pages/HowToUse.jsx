import React from 'react';
import { 
  UserPlus, 
  LogIn, 
  Plus, 
  Package, 
  CheckCircle,
  Smartphone,
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Truck,
  Star,
  ArrowRight,
  PlayCircle,
  Flame,
  Shield,
  Zap,
  Heart
} from 'lucide-react';

export default function HowToUse() {
  const steps = [
    {
      id: 1,
      title: "إنشاء حساب جديد",
      description: "ابدأ رحلتك معنا بإنشاء حساب شخصي آمن",
      icon: <UserPlus size={32} />,
      color: "from-blue-500 to-blue-600",
      details: [
        "انقر على 'تسجيل الدخول' في الشريط العلوي",
        "اختر 'إنشاء حساب جديد'",
        "املأ بياناتك الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)",
        "اختر كلمة مرور قوية",
        "ارفع صورة شخصية (اختياري)"
      ]
    },
    {
      id: 2,
      title: "تسجيل الدخول",
      description: "ادخل إلى حسابك للوصول لجميع الخدمات",
      icon: <LogIn size={32} />,
      color: "from-green-500 to-green-600",
      details: [
        "أدخل بريدك الإلكتروني",
        "أدخل كلمة المرور",
        "انقر على 'تسجيل الدخول'",
        "ستظهر لك لوحة التحكم الشخصية"
      ]
    },
    {
      id: 3,
      title: "إنشاء طلب جديد",
      description: "اطلب توصيل الغاز بخطوات بسيطة وسريعة",
      icon: <Plus size={32} />,
      color: "from-orange-500 to-red-600",
      details: [
        "انقر على 'إنشاء طلب جديد' من لوحة التحكم",
        "أدخل اسم العميل ورقم الهاتف",
        "أدخل رقم الهوية الوطنية (10 أرقام)",
        "حدد عدد أسطوانات الغاز المطلوبة (1-10)",
        "أدخل عنوان التوصيل التفصيلي",
        "اختر تاريخ ووقت التوصيل المناسب",
        "أضف أي ملاحظات خاصة (اختياري)"
      ]
    },
    {
      id: 4,
      title: "تتبع طلباتك",
      description: "راقب حالة طلباتك وتفاصيلها في أي وقت",
      icon: <Package size={32} />,
      color: "from-purple-500 to-purple-600",
      details: [
        "انقر على 'طلباتي' من لوحة التحكم",
        "استخدم البحث للعثور على طلب معين",
        "صفي الطلبات حسب الحالة",
        "انقر على 'عرض' لرؤية تفاصيل الطلب",
        "تابع حالة الطلب: في الانتظار → قيد التنفيذ → مكتمل"
      ]
    }
  ];

  const features = [
    {
      icon: <Smartphone size={24} />,
      title: "سهولة الاستخدام",
      description: "واجهة بسيطة ومفهومة للجميع"
    },
    {
      icon: <Shield size={24} />,
      title: "آمان وموثوقية",
      description: "حماية كاملة لبياناتك الشخصية"
    },
    {
      icon: <Zap size={24} />,
      title: "سرعة في التوصيل",
      description: "خدمة توصيل سريعة وفي الوقت المحدد"
    },
    {
      icon: <Heart size={24} />,
      title: "خدمة عملاء ممتازة",
      description: "دعم فني متاح على مدار الساعة"
    }
  ];

  const orderStatuses = [
    {
      status: "pending",
      title: "في الانتظار",
      description: "تم استلام طلبك وهو قيد المراجعة",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      icon: <Clock size={20} />
    },
    {
      status: "processing",
      title: "قيد التنفيذ",
      description: "جاري تحضير طلبك للتوصيل",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      icon: <Package size={20} />
    },
    {
      status: "completed",
      title: "مكتمل",
      description: "تم توصيل طلبك بنجاح",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      icon: <CheckCircle size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black py-20 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur-2xl opacity-75"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-3xl shadow-2xl">
              <PlayCircle size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            كيفية استخدام المنصة
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            دليل شامل وسهل لاستخدام منصة حجز الغاز بخطوات بسيطة ومفهومة
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              خطوات الاستخدام
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              اتبع هذه الخطوات البسيطة للحصول على خدمة توصيل الغاز
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-24 w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 transition-colors duration-300 z-0"></div>
                )}
                
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Step Content */}
                  <div className="flex-1 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        {step.id}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3 rtl:space-x-reverse">
                          <ArrowRight size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-lg opacity-75`}></div>
                      <div className={`relative bg-gradient-to-r ${step.color} p-6 rounded-2xl shadow-2xl text-white`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Guide */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              حالات الطلبات
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              تعرف على معنى كل حالة من حالات طلبك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orderStatuses.map((status, index) => (
              <div key={status.status} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full ${status.color} font-medium`}>
                    {status.icon}
                    <span>{status.title}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center transition-colors duration-300">
                  {status.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              مميزات المنصة
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              اكتشف المميزات التي تجعل تجربتك معنا استثنائية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center">
              <Flame size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                أسعار تنافسية وشفافة
              </h2>
              <p className="text-xl mb-6 opacity-90">
                25 ريال سعودي لكل أسطوانة غاز
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">25 ريال</div>
                  <div className="text-sm opacity-90">أسطوانة واحدة</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">125 ريال</div>
                  <div className="text-sm opacity-90">5 أسطوانات</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">250 ريال</div>
                  <div className="text-sm opacity-90">10 أسطوانات</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              نصائح مهمة
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              اتبع هذه النصائح للحصول على أفضل تجربة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 transition-colors duration-300">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Star size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    تأكد من صحة البيانات
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    راجع جميع البيانات المدخلة قبل إرسال الطلب، خاصة رقم الهاتف والعنوان
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 transition-colors duration-300">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                    احجز مسبقاً
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    احجز طلبك قبل 24 ساعة على الأقل لضمان التوصيل في الوقت المحدد
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 transition-colors duration-300">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                    وضح العنوان بالتفصيل
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400 text-sm">
                    اكتب العنوان بوضوح مع ذكر المعالم المهمة لتسهيل عملية التوصيل
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 transition-colors duration-300">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Smartphone size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">
                    كن متاحاً للتواصل
                  </h3>
                  <p className="text-orange-700 dark:text-orange-400 text-sm">
                    تأكد من أن هاتفك متاح وقت التوصيل للتواصل مع فريق التوصيل
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-12 shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              جاهز للبدء؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
              ابدأ تجربتك معنا الآن واحصل على خدمة توصيل الغاز بسهولة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/login"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <UserPlus size={24} />
                <span>إنشاء حساب جديد</span>
              </a>
              <a
                href="/about"
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Star size={24} />
                <span>تعرف على المزيد</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

