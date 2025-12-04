import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import logo from "/logo.svg";
import logoDark from "/logo-dark.svg";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { toast } = useToast();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const data = res.data;

      if (data?.user && data?.tokens) {
        setAuth(data.user, data.tokens);
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك إلى ملاحظاتك الذكية.",
      });
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.";
      toast({
        title: "فشل تسجيل الدخول",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          <h1 className="text-2xl font-bold tracking-tight"></h1>
          <p className="text-sm text-muted-foreground">
            سجّل الدخول للوصول إلى ملاحظاتك الذكية وتنظيم دفاترك بسهولة.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@mail.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>

      <p className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        بالنقر على تسجيل الدخول، فإنك توافق على{" "}
        <Link to="/terms">شروط الخدمة</Link> و{" "}
        <Link to="/privacy">سياسة الخصوصية</Link>.
      </p>
    </div>
  );
}
