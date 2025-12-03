import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NotebookPen   } from 'lucide-react';
import logo from '/logo.svg';
import logoDark from '/logo-dark.svg';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { theme } = useTheme();
  const location = useLocation();
  const isAppLayout =
    location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  const headerContent = (
    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={theme === 'dark' ? logoDark : logo}
          alt="ملاحظاتي"
          className="h-8 w-auto"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        الرئيسية
        </Link>
        <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          الميزات
        </Link>
        <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          الأسعار
        </Link>
        <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          الأسئلة الشائعة
        </Link>
        <Link to="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          الموارد
        </Link>
        <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        اتصل بنا
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link to="/login">
          <Button variant="ghost" className="hidden sm:inline-flex">تسجيل الدخول</Button>
        </Link>
        <Link to="/pricing">
          <Button 
            className={!isAppLayout 
              ? "rounded-full bg-black dark:bg-white text-white dark:text-black border-0 hover:opacity-90 transition-opacity shadow-lg"
              : "bg-foreground text-background hover:bg-foreground/90"
            }
          >
            ابدأ الآن
          </Button>
        </Link>
      </div>
    </div>
  );

  if (!isAppLayout) {
    return (
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 transition-all duration-300">
        <div className={`backdrop-blur-xl rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-transparent border border-white/10 shadow-lg shadow-black/10'
            : 'bg-transparent border border-black/10 shadow-lg shadow-black/5'
        }`}>
          {headerContent}
        </div>
      </header>
    );
  }

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b border-border/40 ${
        theme === 'dark'
          ? 'bg-background/80 supports-[backdrop-filter]:bg-background/60'
          : 'bg-background/90 supports-[backdrop-filter]:bg-background/70'
      }`}
    >
      <div className="container mx-auto">
        {headerContent}
      </div>
    </header>
  );
}

