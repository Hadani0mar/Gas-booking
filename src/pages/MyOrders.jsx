import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Phone,
  CreditCard,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2
} from 'lucide-react';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // تحقق من تسجيل الدخول وتحميل الطلبات
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    
    if (loginStatus !== 'true' || !storedUserData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUserData);
    setUserData(user);
    
    // تحميل الطلبات
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(userOrders);
    setFilteredOrders(userOrders);
  }, [navigate]);

  // تصفية الطلبات
  useEffect(() => {
    let filtered = orders;

    // تصفية حسب النص
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phoneNumber.includes(searchTerm)
      );
    }

    // تصفية حسب الحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // حذف طلب
  const handleDeleteOrder = (orderId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    }
  };

  // عرض تفاصيل الطلب
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // الحصول على لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // الحصول على نص الحالة
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'processing':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return 'غير محدد';
    }
  };

  // الحصول على أيقونة الحالة
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Package size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <AlertCircle size={16} />;
      default:
        return <Package size={16} />;
    }
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-2xl">
              <Package size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            طلباتي
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            تتبع جميع طلبات توصيل الغاز الخاصة بك
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg transition-all duration-300 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="البحث في الطلبات..."
                className="w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pr-12 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">جميع الطلبات</option>
                <option value="pending">في الانتظار</option>
                <option value="processing">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
                <option value="cancelled">ملغية</option>
              </select>
            </div>

            {/* New Order Button */}
            <button
              onClick={() => navigate('/create-order')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Plus size={20} />
              <span>طلب جديد</span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 shadow-lg transition-all duration-300 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              {searchTerm || statusFilter !== 'all' ? 'لا توجد طلبات مطابقة' : 'لا توجد طلبات بعد'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
              {searchTerm || statusFilter !== 'all' 
                ? 'جرب تغيير معايير البحث أو التصفية'
                : 'ابدأ بإنشاء طلب توصيل الغاز الأول'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button
                onClick={() => navigate('/create-order')}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                إنشاء طلب جديد
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Package size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                        طلب #{order.id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {new Date(order.orderDate).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 rtl:space-x-reverse ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{getStatusText(order.status)}</span>
                  </span>
                </div>

                {/* Order Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      {order.customerName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                    <Package size={16} className="text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      {order.gasQuantity} أسطوانة غاز
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      {order.deliveryDate} - {order.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      {order.estimatedPrice} ريال سعودي
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <Eye size={16} />
                    <span>عرض</span>
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse mx-auto"
          >
            <ArrowLeft size={20} />
            <span>العودة إلى حسابي</span>
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                تفاصيل الطلب #{selectedOrder.id.slice(-6)}
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      اسم العميل
                    </label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{selectedOrder.customerName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      رقم الهاتف
                    </label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{selectedOrder.phoneNumber}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      رقم الهوية الوطنية
                    </label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <CreditCard size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{selectedOrder.nationalId}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      عدد الأسطوانات
                    </label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Package size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{selectedOrder.gasQuantity} أسطوانة</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      تاريخ التوصيل
                    </label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{selectedOrder.deliveryDate}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      وقت التوصيل
                    </label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{selectedOrder.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  عنوان التوصيل
                </label>
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <MapPin size={16} className="text-gray-400 mt-1" />
                  <span className="text-gray-900 dark:text-white">{selectedOrder.address}</span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ملاحظات
                  </label>
                  <div className="flex items-start space-x-2 rtl:space-x-reverse">
                    <FileText size={16} className="text-gray-400 mt-1" />
                    <span className="text-gray-900 dark:text-white">{selectedOrder.notes}</span>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    السعر المقدر:
                  </span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {selectedOrder.estimatedPrice} ريال سعودي
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 rtl:space-x-reverse ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span>{getStatusText(selectedOrder.status)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

