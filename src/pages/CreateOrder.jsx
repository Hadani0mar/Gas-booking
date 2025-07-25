import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  CreditCard, 
  Package, 
  MapPin, 
  Calendar,
  Clock,
  Flame,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    nationalId: '',
    gasQuantity: 1,
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);

  // تحقق من تسجيل الدخول وتحميل بيانات المستخدم
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    
    if (loginStatus !== 'true' || !storedUserData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUserData);
    setUserData(user);
    
    // ملء البيانات الأساسية من ملف المستخدم
    setFormData(prev => ({
      ...prev,
      customerName: user.name || '',
      phoneNumber: user.phone || ''
    }));
  }, [navigate]);

  // معالجة تغيير البيانات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // إزالة الخطأ عند بدء الكتابة
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // تغيير كمية الغاز
  const handleQuantityChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      gasQuantity: Math.max(1, Math.min(10, prev.gasQuantity + increment))
    }));
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'اسم العميل مطلوب';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'رقم الهاتف مطلوب';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'رقم الهاتف غير صحيح';
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'رقم الهوية الوطنية مطلوب';
    } else if (!/^[0-9]{10}$/.test(formData.nationalId.replace(/\s/g, ''))) {
      newErrors.nationalId = 'رقم الهوية الوطنية يجب أن يكون 10 أرقام';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب';
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'تاريخ التوصيل مطلوب';
    } else {
      const selectedDate = new Date(formData.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deliveryDate = 'لا يمكن اختيار تاريخ في الماضي';
      }
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = 'وقت التوصيل مطلوب';
    }

    if (formData.gasQuantity < 1 || formData.gasQuantity > 10) {
      newErrors.gasQuantity = 'كمية الغاز يجب أن تكون بين 1 و 10 أسطوانات';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة إرسال الطلب
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // إنشاء الطلب
      const newOrder = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'pending',
        orderDate: new Date().toISOString(),
        estimatedPrice: formData.gasQuantity * 25, // 25 ريال للأسطوانة الواحدة
        userEmail: userData.email
      };

      // حفظ الطلب في Local Storage
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));

      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1500));

      // إعادة توجيه إلى صفحة الطلبات
      navigate('/my-orders');
    } catch (error) {
      setErrors({ general: 'حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // الحصول على التاريخ الأدنى (اليوم)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black py-20 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-lg opacity-75"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl shadow-2xl">
              <Plus size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            إنشاء طلب جديد
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            املأ البيانات التالية لإنشاء طلب توصيل الغاز
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl transition-all duration-300">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3 rtl:space-x-reverse">
              <AlertCircle size={20} className="text-red-500" />
              <span className="text-red-700 dark:text-red-400">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                اسم العميل
              </label>
              <div className="relative">
                <User size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.customerName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="أدخل اسم العميل"
                />
              </div>
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                رقم الهاتف
              </label>
              <div className="relative">
                <Phone size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phoneNumber}</p>
              )}
            </div>

            {/* National ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                رقم الهوية الوطنية
              </label>
              <div className="relative">
                <CreditCard size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.nationalId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="أدخل رقم الهوية الوطنية (10 أرقام)"
                  maxLength="10"
                />
              </div>
              {errors.nationalId && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nationalId}</p>
              )}
            </div>

            {/* Gas Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                عدد أسطوانات الغاز المطلوبة
              </label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={formData.gasQuantity <= 1}
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <Minus size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                
                <div className="flex-1 relative">
                  <Package size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="gasQuantity"
                    value={formData.gasQuantity}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center font-semibold ${
                      errors.gasQuantity ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={formData.gasQuantity >= 10}
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <Plus size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                السعر المقدر: {formData.gasQuantity * 25} ريال سعودي
              </p>
              {errors.gasQuantity && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gasQuantity}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                عنوان التوصيل
              </label>
              <div className="relative">
                <MapPin size={20} className="absolute right-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="أدخل العنوان التفصيلي للتوصيل"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
              )}
            </div>

            {/* Delivery Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  تاريخ التوصيل
                </label>
                <div className="relative">
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.deliveryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                {errors.deliveryDate && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deliveryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  وقت التوصيل
                </label>
                <div className="relative">
                  <Clock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.deliveryTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">اختر وقت التوصيل</option>
                    <option value="09:00-12:00">9:00 ص - 12:00 م</option>
                    <option value="12:00-15:00">12:00 م - 3:00 م</option>
                    <option value="15:00-18:00">3:00 م - 6:00 م</option>
                    <option value="18:00-21:00">6:00 م - 9:00 م</option>
                  </select>
                </div>
                {errors.deliveryTime && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deliveryTime}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <ArrowLeft size={20} />
                <span>العودة</span>
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>إنشاء الطلب</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

