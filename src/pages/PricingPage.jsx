import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Sparkles, Zap, Crown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handlePlanSelect = (planName) => {
    let planType = 'PRO';
    if (planName === 'الأساسية') planType = 'BASIC';
    else if (planName === 'الاحترافية') planType = 'PRO';
    else if (planName === 'المميزة') planType = 'PREMIUM';

    // Always redirect to checkout - payment required before account creation
    navigate(`/checkout?plan=${planType}&cycle=${billingCycle}`);
  };

  const plans = [
    {
      name: 'الأساسية',
      description: 'مثالية للبدء',
      icon: Sparkles,
      monthlyPrice: 87,
      annualPrice: 70, // ~20% discount
      features: [
        '٥٠ تحويل بالذكاء الاصطناعي شهريًا',
        'حفظ حتى ١٠٠ ملاحظة',
        'استخراج نص دقيق من الصور',
        'ملخصات ذكية تلقائية',
        'مجلدات ووسوم أساسية',
        'تصدير بصيغة TXT',
        'دعم عبر البريد الإلكتروني',
      ],
      popular: false,
      color: 'border-border/50',
    },
    {
      name: 'الاحترافية',
      description: 'الأكثر شعبية',
      icon: Zap,
      monthlyPrice: 117,
      annualPrice: 94, // ~20% discount
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
      popular: true,
      color: 'border-primary border-2',
    },
    {
      name: 'المميزة',
      description: 'للمستخدمين المتقدمين',
      icon: Crown,
      monthlyPrice: 147,
      annualPrice: 118, // ~20% discount
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
      popular: false,
      color: 'border-border/50',
    },
  ];

  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-animated">خطط الأسعار</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              اختر الخطة التي تناسب احتياجاتك. ابدأ مجانًا أو اختر خطة مدفوعة للحصول على مزايا أكثر.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-muted/50 rounded-lg border border-border/50">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                شهريًا
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                  billingCycle === 'annual'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                سنويًا
                
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
              const savings = billingCycle === 'annual' 
                ? Math.round((plan.monthlyPrice * 12) - (plan.annualPrice * 12))
                : 0;

              const isPro = plan.name === 'الاحترافية';

              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${
                    isPro
                      ? 'border-0 p-[2px] rounded-2xl bg-[linear-gradient(90deg,#7182ff_0%,#3cff52_50%,#7182ff_100%)]'
                      : plan.color
                  } ${plan.popular ? 'shadow-lg scale-105' : ''} transition-all hover:shadow-xl`}
                >
                  <div
                    className={`relative h-full w-full ${
                      isPro ? 'bg-background rounded-[1rem]' : ''
                    }`}
                  >
                  {plan.popular && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                      
                    </div>
                  )}
                  <CardHeader className="text-right pb-4">
                    {/* عنوان الخطة + الأيقونة بمحاذاة يمين بالكامل */}
                    <div className="flex items-center justify-end gap-3 mb-4 flex-row-reverse">
                      <Icon className="h-7 w-7 gradient-text-animated flex-shrink-0" />
                      <div className="text-right">
                        <CardTitle className="text-2xl mb-1">{plan.name}</CardTitle>
                        <CardDescription className="text-sm">{plan.description}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline gap-2 justify-start">
                        <span className="text-5xl font-bold">{price}</span>
                        <span className="text-muted-foreground text-lg">ر.س</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 text-right">
                        {billingCycle === 'monthly' ? 'شهريًا' : 'سنويًا'}
                        {billingCycle === 'annual' && (
                          <span className="block mt-1 text-primary font-medium">
                            وفر {savings} ر.س سنويًا
                          </span>
                        )}
                      </p>
                      {billingCycle === 'annual' && (
                        <p className="text-xs text-muted-foreground mt-1 line-through text-right">
                          {plan.monthlyPrice * 12} ر.س/سنة
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="text-right">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 flex-row">
                          <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 gradient-text-animated" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handlePlanSelect(plan.name)}
                      className={`w-full ${
                        isPro
                          ? 'border-0 text-white bg-[length:200%_200%] bg-[linear-gradient(90deg,#7182ff_0%,#3cff52_50%,#7182ff_100%)] hover:brightness-110'
                          : plan.popular
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                    >
                      {plan.name === 'الأساسية' ? 'ابدأ الآن' : 'اختر هذه الخطة'}
                    </Button>
                  </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>

          
        </div>
      </div>
      <Footer />
    </div>
  );
}

