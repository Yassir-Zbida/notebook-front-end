import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Notebook, Sparkles, Shield, Zap } from 'lucide-react';

export function Login04() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      setAuth(response.data.user, response.data.tokens);
      toast({
        title: 'مرحبًا بعودتك!',
        description: 'تم تسجيل الدخول بنجاح.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'فشل تسجيل الدخول',
        description: error.response?.data?.error || 'بيانات الدخول غير صحيحة',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10 text-right relative">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
              <Notebook className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">دفتر الملاحظات الذكي</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">مرحبًا بعودتك</h1>
                <p className="text-balance text-muted-foreground">
                  سجّل الدخول إلى حسابك للمتابعة
                </p>
              </div>
              
              <Card className="backdrop-blur-xl bg-background/80 border-border/50 shadow-xl">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                          className="text-right"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">كلمة المرور</Label>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-primary hover:underline underline-offset-2"
                          >
                            نسيت؟
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                          className="text-right"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                      </Button>
                    </div>
                    
                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">ليس لديك حساب؟ </span>
                      <Link to="/register" className="text-primary hover:underline underline-offset-2">
                        سجّل الآن
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Visual/Branding */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-background/60 border-r border-border/50"></div>
        <div className="relative flex h-full flex-col justify-between p-10 text-right">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
              <Notebook className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">دفتر الملاحظات الذكي</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <blockquote className="text-lg">
              &ldquo;منصة قوية لتحويل ملاحظاتك اليدوية إلى نسخ رقمية ذكية مدعومة بالذكاء الاصطناعي&rdquo;
            </blockquote>
            <figcaption className="text-sm text-muted-foreground">
              <div className="font-semibold text-foreground">منصة الملاحظات الذكية</div>
              <div>الحل الأمثل لتنظيم ملاحظاتك</div>
            </figcaption>
          </div>
          
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">ذكاء اصطناعي متقدم</div>
                <div className="text-sm text-muted-foreground">
                  استخراج دقيق للنص وتحسين تلقائي
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">سرعة فائقة</div>
                <div className="text-sm text-muted-foreground">
                  معالجة في ثوانٍ بدلاً من دقائق
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">آمن ومحمي</div>
                <div className="text-sm text-muted-foreground">
                  بياناتك مشفرة ومحمية
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

