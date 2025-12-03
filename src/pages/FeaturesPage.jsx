import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiquidEther from '@/components/LiquidEther';
import SpotlightCard from '@/components/SpotlightCard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Brain, Wand2, Folder, Search, Zap } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Sparkles,
      title: 'تحويل ذكي للكتابة اليدوية',
      description:
        'استخدم أفضل تقنيات التعرف على الكتابة بالذكاء الاصطناعي لتحويل صفحات دفترك إلى نص رقمي مرتب خلال ثوانٍ.',
    },
    {
      icon: Brain,
      title: 'ملخصات مدعومة بالذكاء الاصطناعي',
      description:
        'احصل على ملخصات قصيرة، نقاط رئيسية، وأسئلة مراجعة تلقائية تساعدك على تثبيت المعلومة بسرعة.',
    },
    {
      icon: Wand2,
      title: 'إعادة صياغة وتحسين الأسلوب',
      description:
        'حوّل ملاحظاتك الأولية إلى نصوص احترافية، رسائل بريد، أو ملخصات دراسية جاهزة للمشاركة.',
    },
    {
      icon: Folder,
      title: 'تنظيم ذكي للملاحظات',
      description:
        'مجلدات ووسوم واقتراحات تلقائية لتنظيم الملاحظات حسب المادة أو المشروع أو الموضوع.',
    },
    {
      icon: Search,
      title: 'بحث عميق داخل ملاحظاتك',
      description:
        'ابحث عن أي مصطلح، فكرة، أو تعريف في كل ملاحظاتك وملخصاتك بضغطة واحدة، حتى لو كان من صورة قديمة.',
    },
    
    {
      icon: Zap,
      title: 'أتمتة المهام المتكررة',
      description:
        'حوّل العمليات المملة إلى خطوات تلقائية: إنشاء ملخصات، تحديث الملاحظات، أو تجهيز ملاحظات للمذاكرة اليومية.',
    },
  ];

  return (
    <div className="min-h-screen bg-background antialiased">
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden text-right">
        <Header />

        <div className="absolute inset-0 w-full h-full">
          <LiquidEther
            colors={['#7182ff', '#3cff52', '#7182ff']}
            mouseForce={15}
            cursorSize={80}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.6}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={1.8}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="max-w-3xl mx-auto text-center" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.2] text-center">
              مميزات المنصة
              <span className="block gradient-text-animated mt-2 text-center">
                كل ما تحتاجه لتحويل الملاحظات إلى معرفة قابلة للاستخدام
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-center max-w-xl mx-auto leading-relaxed">
              صممنا مجموعة متكاملة من الأدوات لتساعدك على جمع وتنظيم وفهم ملاحظاتك بسهولة، سواء كنت طالبًا
              أو باحثًا أو محترفًا.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-border/40 text-right">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <SpotlightCard
                  key={index}
                  className="custom-spotlight-card"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <Card className="border-border/50 hover:border-border transition-colors bg-transparent border-0 shadow-none">
                    <CardHeader className="flex flex-row-reverse items-start gap-4 text-right p-6">
                      <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-black flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg text-right">{feature.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed text-right">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


