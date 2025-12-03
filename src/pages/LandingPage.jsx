import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiquidEther from '@/components/LiquidEther';
import SpotlightCard from '@/components/SpotlightCard';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Notebook, 
  Sparkles, 
  FileText, 
  Folder, 
  Download, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Star,
  ChevronRight,
  Brain,
  Shield,
  Clock,
  Search,
  Layers,
  Wand2,
  Crown
} from 'lucide-react';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { theme } = useTheme();

  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
  
  // Animated feature words
  const featureWords = ['نسخ ذكية', 'نسخ رقمية', 'نسخ احترافية', 'ملخصات منظمة', 'مستندات محسّنة'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % featureWords.length);
        setIsChanging(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [featureWords.length]);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Scroll-in animation for AI partner cards
  useEffect(() => {
    const cards = document.querySelectorAll('.ai-partner-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ai-partner-card-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background antialiased">
      {/* Hero Section with LiquidEther */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-right">
        <Header />
        {/* LiquidEther Background */}
        <div className="absolute inset-0 w-full h-full">
          <LiquidEther
            colors={['#7182ff', '#3cff52', '#7182ff']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        
        {/* Gradient Overlay for better text readability - adjusts based on theme */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-background/40 via-background/30 to-background/50' 
              : 'bg-gradient-to-b from-background/50 via-background/40 to-background/60'
          }`}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.2]">
              <span className="block pb-3 overflow-visible">
                حوّل ملاحظاتك اليدوية إلى{' '}
                <span 
                  className={`gradient-text-animated inline-block transition-all duration-500 ${
                    isChanging ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                  style={{ 
                    minWidth: '200px', 
                    display: 'inline-block',
                    textAlign: 'right',
                    direction: 'rtl',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    lineHeight: '1.3',
                    verticalAlign: 'middle'
                  }}
                >
                  {featureWords[currentWordIndex]}
                </span>
              </span>
              <span className="block">في ثوانٍ معدودة</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              استخدم قوة الذكاء الاصطناعي لاستخراج النص من صور ملاحظاتك المكتوبة بخط اليد، 
              واحصل على ملخصات ذكية، وتحسينات تلقائية، وتنظيم احترافي — كل ذلك في مكان واحد
            </p>
            
            
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/pricing">
                <Button 
                  size="lg" 
                  className="rounded-full gradient-bg-animated text-white h-14 px-8 text-base md:text-lg font-semibold relative overflow-hidden group shadow-lg border-0 hover:opacity-90 hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative text-white z-10 flex items-center mr-2 gap-2"> ابدأ الآن
                    <ArrowLeft className="h-5 w-5 group-hover:translate-x-[-4px] transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full h-14 px-8 text-base md:text-lg font-semibold border-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:scale-105 hover:border-foreground/30 hover:shadow-lg transition-all duration-300"
                >
                  عرض الأسعار
                </Button>
              </Link>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* قسم المميزات */}
      <section className="py-24 md:py-32 border-t border-border/40 relative text-right">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold px-4 py-2 rounded-full bg-muted/50 border border-border/50">
                المميزات
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              مميزات قوية
              <br />
              <span className="gradient-text-animated">تطوّر طريقة عملك مع الملاحظات</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              كل ما تحتاجه لتحويل ملاحظاتك اليدوية إلى محتوى رقمي منظم وجاهز للدراسة أو العمل، مدعوم بأحدث تقنيات الذكاء الاصطناعي.
            </p>
          </div>
          
          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">تقنية التعرف على الكتابة بالذكاء الاصطناعي</CardTitle>
                  <CardDescription className="text-base">
                    تقنية متقدمة لاستخراج النص من خط اليد، حتى لو كان غير واضح، بدقة عالية جدًا.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">ملخصات ذكية</CardTitle>
                  <CardDescription className="text-base">
                    احصل على ملخصات قصيرة ونقاط رئيسية مستخرجة تلقائيًا، حيث يحدد الذكاء الاصطناعي أهم ما في ملاحظاتك.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">إعادة صياغة وتحسين بالنموذج الذكي</CardTitle>
                  <CardDescription className="text-base">
                    حوّل ملاحظاتك إلى مستندات احترافية أو ملخصات دراسية، مع تحسين الأسلوب والتنظيم بضغطة واحدة.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Wand2 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">عناوين ووسوم تلقائية</CardTitle>
                  <CardDescription className="text-base">
                    الذكاء الاصطناعي ينشئ عناوين ذكية ويقترح وسومًا مناسبة لملاحظاتك تلقائيًا، حتى لا تضيع أي فكرة.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Folder className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">تنظيم ذكي</CardTitle>
                  <CardDescription className="text-base">
                    مجلدات ووسوم واقتراحات تنظيم مدعومة بالذكاء الاصطناعي، لتبقى كل ملاحظاتك مرتبة وسهلة الوصول.
          
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">تصدير بصيغ متعددة</CardTitle>
                  <CardDescription className="text-base">
                    صدّر ملاحظاتك كملفات PDF أو TXT أو Markdown، وشاركها بالشكل الذي يناسبك في أي وقت.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>
          </div>

          
        </div>
      </section>

      {/* قسم شريك البحث بالذكاء الاصطناعي */}
      <section className="py-24 md:py-32 border-t border-border/40 relative text-right">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold px-4 py-2 rounded-full bg-muted/50 border border-border/50">
                البحث الذكي
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text-animated">شريكك في البحث المدعوم بالذكاء الاصطناعي</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              استكشف قوة البحث الذكي مع أدوات متقدمة تجمع بين الذكاء الاصطناعي والبحث المتقدم
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {/* Card 1: Media Left */}
            <div className="ai-partner-card flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 relative">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted/30">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/video_placeholder_2_replacement.png"
                  >
                    <source src="/upload_your_sources.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  استيراد مصادرك
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-7">
                  استورد ملفات PDF، مواقع الويب، فيديوهات YouTube، الملفات الصوتية، مستندات Google Docs، عروض Google Slides والمزيد، ودع منصّتنا الذكية تتولى تلخيص المحتوى واستخراج أهم النقاط وبناء روابط عميقة بين المواضيع تلقائيًا.
                </p>
              </div>
            </div>

            {/* Card 2: Media Right */}
            <div className="ai-partner-card flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 relative">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted/30">
                  <img
                    src="/video_placeholder_2_replacement.png"
                    alt="رؤى فورية"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  رؤى فورية
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-7">
                  بمجرد إضافة مصادرك، تحلل منصّتنا كل شيء في الخلفية وتتحول إلى خبير ذكاء اصطناعي مخصص في المجالات التي تهمك. تحصل على رؤى فورية ومقترحات عملية تستند مباشرة إلى محتواك، مع تحليل عميق للعلاقات بين المواضيع واكتشاف الأنماط المخفية التي قد تفوتك. كل هذا يحدث تلقائيًا لتمنحك فهمًا أعمق وأسرع لمحتواك.
                </p>
              </div>
            </div>

            {/* Card 3: Media Left */}
            <div className="ai-partner-card flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 relative">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted/30">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/video_placeholder_2_replacement.png"
                  >
                    <source src="/see_the_source_not_just_the_answer.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  راجع المصدر، وليس فقط الإجابة
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-7">
                  كن واثقًا من كل إجابة. تعرض لك منصّتنا دائمًا المقتطفات الدقيقة من مصادرك مع كل رد، مع إبراز الأجزاء المهمة وتوضيح السياق الكامل. يمكنك النقر مباشرة على أي اقتباس للعودة إلى المصدر الأصلي، مما يمنحك الشفافية الكاملة والقدرة على التحقق من كل معلومة بنفسك. بهذه الطريقة، تتعلم من مصادرك الأصلية وليس فقط من الملخصات.
                </p>
              </div>
            </div>

            {/* Card 4: Media Right */}
            <div className="ai-partner-card flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 relative">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted/30">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/video_placeholder_2_replacement.png"
                  >
                    <source src="/listen_and_learn_on_the_go.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  استمع وتعلم أينما كنت
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-7">
                  مع ميزة الملخص الصوتي الجديدة، حوّل مصادرك إلى مناقشات متعمقة وجذابة بنقرة واحدة. استمع إلى ملخصات صوتية عالية الجودة أثناء التنقل أو ممارسة الرياضة أو القيادة. يمكنك التحكم في سرعة التشغيل، تخطي الأقسام، وحتى حفظ المقاطع المفضلة للاستماع إليها لاحقًا. هذه الطريقة تجعل التعلم أكثر مرونة وتناسب نمط حياتك المزدحم.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الأسعار على الصفحة الرئيسية */}
      <section className="py-16 md:py-32 relative text-right">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section (متناغم مع صفحة التسعير) */}
          <div className="text-center mb-16">
           
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text-animated">خطط الأسعار</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              اختر الخطة التي تناسب احتياجاتك. ابدأ مجانًا أو اختر خطة مدفوعة للحصول على مزايا أكثر.
            </p>

            {/* Billing Toggle (نفس الموجود في صفحة التسعير) */}
            <div className="inline-flex items-center gap-4 p-1 bg-muted/50 rounded-lg border border-border/50 mt-8">
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

          {/* Pricing Cards (منسوخة من صفحة التسعير وتستخدم نفس بيانات الخطط) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-32 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
              const savings =
                billingCycle === 'annual'
                  ? Math.round(plan.monthlyPrice * 12 - plan.annualPrice * 12)
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
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20" />
                    )}
                    <CardHeader className="text-right pb-4">
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

                      <Link to="/pricing">
                        <Button
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
                          {plan.name === 'الأساسية' ? 'شاهد التفاصيل' : 'شاهد التفاصيل'}
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {/* نداء أخير لاتخاذ الإجراء */}
          <div className="max-w-6xl mx-auto relative overflow-hidden rounded-2xl border-2 border-border/50 mt-32">
            {/* LiquidEther Background */}
            <div className="absolute inset-0 w-full h-full">
              <LiquidEther
                colors={['#7182ff', '#3cff52', '#7182ff']}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
              />
            </div>
            
            {/* Gradient Overlay for better text readability - adjusts based on theme */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-b from-background/60 via-background/50 to-background/60' 
                  : 'bg-gradient-to-b from-background/70 via-background/60 to-background/70'
              }`}
            />
            
            {/* CTA Content */}
            <div className="relative z-10 text-center p-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                جاهز لتحويل ملاحظاتك إلى نسخة رقمية ذكية؟
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                انضم إلى مئات المستخدمين الذين يبسطون طريقة تدوين وتنظيم الملاحظات باستخدام الذكاء الاصطناعي.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing">
                  <Button size="lg" className="rounded-full gradient-bg-animated text-white h-12 px-8 text-base relative overflow-hidden group shadow-lg border-0 hover:opacity-90 hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <span className="relative text-white z-10 flex items-center mr-2 gap-2">
                     شاهد خطط الأسعار
                      <ArrowLeft className=" h-4 w-4" />
                    </span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:scale-105 hover:border-foreground/30 hover:shadow-lg transition-all duration-300">
                    تواصل مع فريق المبيعات
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
