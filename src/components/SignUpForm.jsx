import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import logo from "/logo.svg";
import logoDark from "/logo-dark.svg";

export function SignUpForm({ className, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuthStore();
  const { toast } = useToast();
  const { theme } = useTheme();

  const sessionId = searchParams.get('session_id');
  const emailParam = searchParams.get('email');

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerData = { name, email, password };
      if (sessionId) {
        registerData.sessionId = sessionId;
      }
      
      const response = await api.post("/auth/register", registerData);
      setAuth(response.data.user, response.data.tokens);
      toast({
        title: "تم إنشاء الحساب بنجاح!",
        description: sessionId 
          ? "تم ربط اشتراكك بنجاح. مرحبًا بك!" 
          : "مرحبًا بك في دفتر الملاحظات الذكي.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "فشل إنشاء الحساب",
        description: error.response?.data?.error || "تعذر إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 text-right", className)}
      dir="rtl"
      {...props}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={theme === "dark" ? logoDark : logo}
              alt="ملاحظاتي"
              className="h-9 w-auto"
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            {sessionId 
              ? "أكمل إنشاء حسابك للوصول إلى اشتراكك" 
              : "ابدأ استخدام دفتر الملاحظات الذكي الآن خلال ثوانٍ."}
          </p>
          {sessionId && (
            <div className="w-full p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xs text-primary text-center">
                ✓ تم تأكيد دفعتك. أكمل إنشاء حسابك للبدء
              </p>
            </div>
          )}
          <div className="text-sm">
            لديك حساب بالفعل؟{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline underline-offset-4"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">الاسم الكامل</Label>
            <Input
              id="name"
              type="text"
              placeholder="محمد أحمد"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!!emailParam}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full font-semibold"
          disabled={loading}
        >
          {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </Button>
      </form>

      <p className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        بالضغط على إنشاء الحساب، أنت توافق على{" "}
        <Link to="/terms">شروط الخدمة</Link> و{" "}
        <Link to="/privacy">سياسة الخصوصية</Link>.
      </p>
    </div>
  );
}

