import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Upload, 
  Camera, 
  Flame,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Plus,
  ShoppingBag,
  Clock,
  Package
} from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  // تحقق من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('userData');
    if (loginStatus === 'true' && userData) {
      setIsLoggedIn(true);
      const user = JSON.parse(userData);
      setFormData(user);
      setProfileImage(user.profileImage || null);
      
      // تحميل طلبات المستخدم
      const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      setUserOrders(orders);
    }
  }, []);

  // معالجة تغيير البيانات في النموذج
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

  // معالجة رفع الصورة
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'الاسم مطلوب';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'رقم الهاتف مطلوب';
      } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
        newErrors.phone = 'رقم الهاتف غير صحيح';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة تسجيل الدخول/التسجيل
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLogin) {
      // تسجيل الدخول
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.email === formData.email && userData.password === formData.password) {
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          setFormData(userData);
          setProfileImage(userData.profileImage || null);
          
          // تحميل طلبات المستخدم
          const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          setUserOrders(orders);
        } else {
          setErrors({ general: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }
      } else {
        setErrors({ general: 'لا يوجد حساب مسجل بهذا البريد الإلكتروني' });
      }
    } else {
      // إنشاء حساب جديد
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profileImage: profileImage,
        registrationDate: new Date().toISOString()
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setUserOrders([]);
    }
  };

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setProfileImage(null);
    setErrors({});
    setUserOrders([]);
  };

  // الحصول على إحصائيات الطلبات
  const getOrderStats = () => {
    const pending = userOrders.filter(order => order.status === 'pending').length;
    const processing = userOrders.filter(order => order.status === 'processing').length;
    const completed = userOrders.filter(order => order.status === 'completed').length;
    
    return { pending, processing, completed, total: userOrders.length };
  };

  // إذا كان المستخدم مسجل الدخول، عرض لوحة التحكم
  if (isLoggedIn) {
    const orderStats = getOrderStats();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black py-20 px-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* بطاقة الملف الشخصي */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl transition-all duration-300 mb-8">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                    <User size={40} className="text-white" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle size={16} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                مرحباً، {formData.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                تم تسجيل دخولك بنجاح
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                <Mail size={20} className="text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{formData.email}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                <Phone size={20} className="text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{formData.phone}</span>
              </div>
            </div>

            {/* إحصائيات الطلبات */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl text-center shadow-lg">
                <div className="text-2xl font-bold">{orderStats.total}</div>
                <div className="text-sm opacity-90">إجمالي الطلبات</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl text-center shadow-lg">
                <div className="text-2xl font-bold">{orderStats.pending}</div>
                <div className="text-sm opacity-90">في الانتظار</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl text-center shadow-lg">
                <div className="text-2xl font-bold">{orderStats.processing}</div>
                <div className="text-sm opacity-90">قيد التنفيذ</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-center shadow-lg">
                <div className="text-2xl font-bold">{orderStats.completed}</div>
                <div className="text-sm opacity-90">مكتملة</div>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link
                to="/create-order"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 rtl:space-x-reverse group"
              >
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                <span>إنشاء طلب جديد</span>
              </Link>
              
              <Link
                to="/my-orders"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 rtl:space-x-reverse group"
              >
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform duration-300" />
                <span>طلباتي</span>
              </Link>
            </div>

            {/* آخر الطلبات */}
            {userOrders.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  آخر الطلبات
                </h3>
                <div className="space-y-3">
                  {userOrders.slice(-3).reverse().map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <Package size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                            طلب #{order.id.slice(-6)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            {order.gasQuantity} أسطوانة غاز
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          order.status === 'processing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {order.status === 'pending' ? 'في الانتظار' :
                           order.status === 'processing' ? 'قيد التنفيذ' : 'مكتمل'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-gray-900 dark:to-black flex items-center justify-center py-20 px-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-lg opacity-75"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl shadow-2xl">
              <Flame size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {isLogin ? 'مرحباً بعودتك إلى منصة حجز الغاز' : 'انضم إلى منصة حجز الغاز'}
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
            {/* Profile Image Upload - للتسجيل فقط */}
            {!isLogin && (
              <div className="text-center">
                <div className="relative inline-block">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile Preview" 
                      className="w-20 h-20 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-lg transition-colors duration-300">
                      <Camera size={24} className="text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                  <label className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors duration-300">
                    <Upload size={14} className="text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
                  اختر صورة شخصية
                </p>
              </div>
            )}

            {/* Name Field - للتسجيل فقط */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Phone Field - للتسجيل فقط */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pr-12 pl-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field - للتسجيل فقط */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="أعد إدخال كلمة المرور"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <Sparkles size={20} />
              <span>{isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}</span>
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="mr-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
              >
                {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

