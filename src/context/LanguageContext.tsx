import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.overview': 'Overview',
    'nav.analytics': 'Analytics',
    'nav.customers': 'Customers',
    'nav.orders': 'Orders',
    'nav.products': 'Products',
    'nav.transactions': 'Transactions',
    'nav.invoices': 'Invoices',
    'nav.settings': 'Settings',
    'nav.apikeys': 'API Keys',
    'nav.support': 'Help & Docs',
    'nav.mainMenu': 'Main Menu',
    'nav.financeSales': 'Finance & Sales',
    'nav.preferences': 'Preferences',

    // Header & User
    'header.searchPlaceholder': 'Search orders, clients, invoices, pages...',
    'header.newAction': 'New Action',
    'header.notifications': 'Notifications',
    'header.markAllRead': 'Mark all as read',
    'header.myProfile': 'My Profile & Account',
    'header.billing': 'Billing & Statements',
    'header.signOut': 'Sign Out',

    // Sidebar Cloud Card
    'sidebar.plan': 'Cloud Pro Plan',
    'sidebar.quota': 'You are using 78% of your monthly API compute quota.',
    'sidebar.upgrade': 'Upgrade Storage',

    // Banner
    'banner.welcome': 'Welcome back',
    'banner.liveFeed': 'Live Feed Active',
    'banner.subtitle': 'Everything looks healthy. Your revenue increased by +14.8% this month with 12 new customer subscriptions pending verification.',
    'banner.export': 'Export Report (PDF)',
    'banner.newTx': 'New Transaction',

    // Footer
    'footer.rights': '© 2026 ApexDash Analytics Inc. All rights reserved.',
    'footer.operational': 'All Systems Operational',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.status': 'Status v2.4',

    // Common
    'common.save': 'Save Changes',
    'common.saved': 'Changes saved successfully!',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.download': 'Download',
    'common.pdf': 'PDF',
  },
  ar: {
    // Navigation
    'nav.overview': 'نظرة عامة',
    'nav.analytics': 'التحليلات',
    'nav.customers': 'العملاء',
    'nav.orders': 'الطلبات',
    'nav.products': 'المنتجات',
    'nav.transactions': 'المعاملات',
    'nav.invoices': 'الفواتير',
    'nav.settings': 'الإعدادات',
    'nav.apikeys': 'المفاتيح البرمجية',
    'nav.support': 'المساعدة والدعم',
    'nav.mainMenu': 'القائمة الرئيسية',
    'nav.financeSales': 'المالية والمبيعات',
    'nav.preferences': 'التفضيلات',

    // Header & User
    'header.searchPlaceholder': 'ابحث في الطلبات، العملاء، الفواتير، الصفحات...',
    'header.newAction': 'إجراء جديد',
    'header.notifications': 'الإشعارات',
    'header.markAllRead': 'تحديد الكل كمقروء',
    'header.myProfile': 'الملف الشخصي والحساب',
    'header.billing': 'الفوترة والبيانات',
    'header.signOut': 'تسجيل الخروج',

    // Sidebar Cloud Card
    'sidebar.plan': 'خطة كلاود برو',
    'sidebar.quota': 'أنت تستخدم 78% من حصة التخزين والـ API الشهرية.',
    'sidebar.upgrade': 'ترقية المساحة التخزينية',

    // Banner
    'banner.welcome': 'مرحباً بك مجدداً',
    'banner.liveFeed': 'البث المباشر نشط',
    'banner.subtitle': 'كل المؤشرات ممتازة. ارتفعت إيراداتك بنسبة +14.8% هذا الشهر مع 12 اشتراك عميل جديد قيد التحقق.',
    'banner.export': 'تصدير التقرير (PDF)',
    'banner.newTx': 'معاملة جديدة',

    // Footer
    'footer.rights': '© 2026 شركة ApexDash للتحليلات. جميع الحقوق محفوظة.',
    'footer.operational': 'جميع الأنظمة تعمل بكفاءة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.status': 'حالة النظام v2.4',

    // Common
    'common.save': 'حفظ التعديلات',
    'common.saved': 'تم حفظ التعديلات بنجاح!',
    'common.cancel': 'إلغاء',
    'common.close': 'إغلاق',
    'common.download': 'تحميل',
    'common.pdf': 'PDF',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('apex_language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('apex_language', language);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
