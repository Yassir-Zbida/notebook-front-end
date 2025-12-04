import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Lock, ArrowRight, Sparkles, Zap, Crown, X, ArrowLeft } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const PLAN_INFO = {
  BASIC: {
    name: 'الأساسية',
    nameEn: 'Basic',
    icon: Sparkles,
    monthlyPrice: 87,
    annualPrice: 70,
    features: [
      '٥٠ تحويل بالذكاء الاصطناعي شهريًا',
      'حفظ حتى ١٠٠ ملاحظة',
      'استخراج نص دقيق من الصور',
      'ملخصات ذكية تلقائية',
      'مجلدات ووسوم أساسية',
      'تصدير بصيغة TXT',
      'دعم عبر البريد الإلكتروني',
    ],
  },
  PRO: {
    name: 'الاحترافية',
    nameEn: 'Pro',
    icon: Zap,
    monthlyPrice: 117,
    annualPrice: 94,
    features: [
      'تحويلات غير محدودة بالذكاء الاصطناعي',
      'حفظ ملاحظات غير محدود',
      'جميع مزايا الذكاء الاصطناعي',
      'إعادة صياغة وتحسين النصوص',
      'مجلدات ووسوم غير محدودة',
      'تصدير PDF وTXT وMarkdown',
      'أولوية في المعالجة',
      'دعم فني مخصص',
    ],
  },
  PREMIUM: {
    name: 'المميزة',
    nameEn: 'Premium',
    icon: Crown,
    monthlyPrice: 147,
    annualPrice: 118,
    features: [
      'كل ما في الخطة الاحترافية',
      'معالجة فائقة السرعة',
      'دعم أولوية ٢٤/٧',
      'تصدير متقدم بصيغ متعددة',
      'تحليلات وإحصائيات متقدمة',
      'تكامل مع أدوات خارجية',
      'حسابات فرعية للفريق',
      'إدارة متقدمة للمجلدات',
    ],
  },
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuthStore();

  const planType = searchParams.get('plan') || 'PRO';
  const billingCycle = searchParams.get('cycle') || 'monthly';
  const planInfo = PLAN_INFO[planType] || PLAN_INFO.PRO;

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const emailToUse = email || user?.email;
      if (!emailToUse) {
        throw new Error('البريد الإلكتروني مطلوب');
      }
      const res = await api.post('/billing/checkout-guest', {
        planType: planType === 'PRO' ? 'PRO' : 'PRO',
        billingCycle,
        email: emailToUse,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      const errorMessage = error.message || error.response?.data?.error || 'فشل في إنشاء جلسة الدفع';
      toast({
        title: 'حدث خطأ',
        description: errorMessage,
        variant: 'destructive',
      });
      setLoading(false);
    },
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    const emailToUse = email || user?.email;
    if (!emailToUse) {
      toast({
        title: 'البريد الإلكتروني مطلوب',
        description: 'يرجى إدخال بريدك الإلكتروني',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    checkoutMutation.mutate();
  };

  const Icon = planInfo.icon;
  const price = billingCycle === 'monthly' ? planInfo.monthlyPrice : planInfo.annualPrice;
  const annualSavings = billingCycle === 'annual' 
    ? (planInfo.monthlyPrice * 12) - (planInfo.annualPrice * 12)
    : 0;
  const totalAmount = billingCycle === 'monthly' ? price : planInfo.annualPrice * 12;

  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user, email]);

  return (
    <div className="min-h-screen bg-muted/30 antialiased" dir="rtl">
      {/* Minimal Top Bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 inline ml-1" />
              العودة إلى الموقع
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="text-sm font-medium hover:underline">
                تسجيل الدخول
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-medium hover:underline">
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Order Details */}
          <div className="lg:order-2">
            <div className="mb-8">
              <Link to="/pricing" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4 ml-1" />
                تغيير الخطة
              </Link>
              <h1 className="text-2xl font-bold mb-2">
                <span className="gradient-text-animated">اشترك في {planInfo.name}</span>
              </h1>
              <p className="text-muted-foreground">
                {billingCycle === 'monthly' ? 'فاتورة شهرية' : 'فاتورة سنوية'}
              </p>
            </div>

            {/* Plan Selection */}
            <div className="bg-background border border-border/50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{planInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {billingCycle === 'monthly' 
                      ? `فاتورة شهرية - ${price} ر.س/شهر`
                      : `فاتورة سنوية - ${price} ر.س/سنة`}
                  </p>
                </div>
              </div>

              {billingCycle === 'annual' && annualSavings > 0 && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                  <p className="text-sm text-primary font-medium text-right">
                    ✓ وفر {annualSavings} ر.س سنويًا
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="space-y-2.5 mt-6 pt-6 border-t border-border/50">
                {planInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>مدفوعات آمنة ومشفرة عبر Stripe</span>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="lg:order-1">
            <div className="bg-background border border-border/50 rounded-xl p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-6">معلومات الدفع</h2>
              
              <form onSubmit={handleCheckout} className="space-y-5">
                {/* Contact Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email || user?.email || ''}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={!!user?.email}
                      className="h-11"
                    />
                    {!user?.email && (
                      <p className="text-xs text-muted-foreground mt-1.5">
                        سيتم إنشاء حسابك بعد إتمام الدفع
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="pt-6 border-t border-border/50">
                  <h3 className="text-sm font-semibold mb-4">ملخص الطلب</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {planInfo.name} ({billingCycle === 'monthly' ? 'شهري' : 'سنوي'})
                      </span>
                      <span className="font-medium">
                        {billingCycle === 'monthly' 
                          ? `${price} ر.س/شهر`
                          : `${planInfo.annualPrice} ر.س/سنة`}
                      </span>
                    </div>

                    {billingCycle === 'annual' && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">المدة</span>
                        <span className="font-medium">12 شهر</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm pt-3 border-t border-border/50">
                      <span className="font-semibold">الإجمالي</span>
                      <span className="text-xl font-bold">{totalAmount} ر.س</span>
                    </div>

                    {billingCycle === 'annual' && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        يتم تجديد الاشتراك تلقائيًا بعد {billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold mt-6"
                  disabled={loading || checkoutMutation.isPending}
                  size="lg"
                >
                  {loading || checkoutMutation.isPending ? (
                    'جاري المعالجة...'
                  ) : (
                    <>
                      اكمل الدفع
                      <Lock className="h-4 w-4 mr-2" />
                    </>
                  )}
                </Button>

                {/* Terms */}
                <p className="text-xs text-center text-muted-foreground pt-4 border-t border-border/50">
                  بالنقر على "اكمل الدفع"، فإنك توافق على{' '}
                  <Link to="/terms" className="underline hover:text-foreground">
                    شروط الخدمة
                  </Link>{' '}
                  و{' '}
                  <Link to="/privacy" className="underline hover:text-foreground">
                    سياسة الخصوصية
                  </Link>
                </p>

                {/* Guarantee */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">ضمان استرداد الأموال لمدة 30 يوم</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
