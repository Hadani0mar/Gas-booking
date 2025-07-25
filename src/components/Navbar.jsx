import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Flame, 
  Home, 
  Info, 
  Phone,
  Sparkles,
  LogIn,
  User,
  HelpCircle
} from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // تطبيق الوضع الداكن/الفاتح على الصفحة
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  // تحقق من حالة تسجيل الدخول
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };

    checkLoginStatus();
    
    // استمع لتغييرات localStorage
    window.addEventListener('storage', checkLoginStatus);
    
    // تحقق دوري من حالة تسجيل الدخول
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* الشعار */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur-sm opacity-75"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-xl shadow-lg">
                <Flame size={24} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                GasBooking
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                منصة حجز الغاز
              </span>
            </div>
          </div>

          {/* روابط القائمة للشاشات الكبيرة */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <NavLink to="/" icon={<Home size={18} />} text="الرئيسية" />
            <NavLink to="/about" icon={<Info size={18} />} text="عن الخدمة" />
            <NavLink to="/how-to-use" icon={<HelpCircle size={18} />} text="استخدام المنصة" />
            <NavLink to="/contact" icon={<Phone size={18} />} text="تواصل معنا" />
            <NavLink 
              to="/login" 
              icon={isLoggedIn ? <User size={18} /> : <LogIn size={18} />} 
              text={isLoggedIn ? "حسابي" : "تسجيل الدخول"} 
            />
          </div>

          {/* أزرار التحكم */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            
            {/* زر تبديل الوضع الداكن/الفاتح */}
            <button
              onClick={toggleDarkMode}
              className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              aria-label="تبديل الوضع الداكن/الفاتح"
            >
              <div className="relative w-6 h-6">
                <Sun 
                  size={20} 
                  className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${
                    isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <Moon 
                  size={20} 
                  className={`absolute inset-0 text-blue-400 transition-all duration-300 ${
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* زر القائمة للشاشات الصغيرة */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="فتح/إغلاق القائمة"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={20} 
                  className={`absolute inset-0 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <X 
                  size={20} 
                  className={`absolute inset-0 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للشاشات الصغيرة */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 border-t border-gray-200/20 dark:border-gray-700/20">
            <MobileNavLink to="/" icon={<Home size={20} />} text="الرئيسية" />
            <MobileNavLink to="/about" icon={<Info size={20} />} text="عن الخدمة" />
            <MobileNavLink to="/how-to-use" icon={<HelpCircle size={20} />} text="استخدام المنصة" />
            <MobileNavLink to="/contact" icon={<Phone size={20} />} text="تواصل معنا" />
            <MobileNavLink 
              to="/login" 
              icon={isLoggedIn ? <User size={20} /> : <LogIn size={20} />} 
              text={isLoggedIn ? "حسابي" : "تسجيل الدخول"} 
            />
            
            {/* زر مميز للحجز */}
            <div className="pt-4">
              <Link
                to={isLoggedIn ? "/create-order" : "/login"}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl"
              >
                <Sparkles size={20} />
                <span>احجز الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// مكون رابط التنقل للشاشات الكبيرة
function NavLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
    >
      <span className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  )
}

// مكون رابط التنقل للشاشات الصغيرة
function MobileNavLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
    >
      <span className="text-orange-500">
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  )
}

