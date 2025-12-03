import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiquidEther from '@/components/LiquidEther';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Notebook, Sparkles, Brain, Folder, Shield, Clock } from 'lucide-react';

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden text-right">
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

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl ml-auto text-right">
            <p className="text-sm font-semibold mb-4 inline-flex items-center rounded-full border border-border/40 bg-background/70 px-4 py-1">
              المنصة
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.2]">
              منصة ملاحظات ذكية
              <span className="block gradient-text-animated mt-2">
                من الدفتر الورقي إلى مساحة عمل رقمية متكاملة
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              واجهة واحدة تجمع بين رفع صور دفترك، تحويلها إلى نص رقمي، تنظيم الملاحظات، البحث الذكي،
              وإدارة كل ما يهمك في الدراسة أو العمل — في تجربة سلسة وسريعة.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-border/40 text-right">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-border/50 hover:border-border transition-colors bg-background/60 backdrop-blur-sm">
              <CardHeader className="flex flex-col items-end text-right">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 bg-black">
                  <Notebook className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-1">مساحة عمل موحدة</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  كل ملاحظاتك ومصادرك في مكان واحد، مع مجلدات ووسوم وسجل كامل للتحويلات والملخصات.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-border transition-colors bg-background/60 backdrop-blur-sm">
              <CardHeader className="flex flex-col items-end text-right">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 bg-black">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-1">تجربة مدعومة بالذكاء الاصطناعي</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  المنصة مصممة لتستفيد من الذكاء الاصطناعي في كل خطوة: من التعرف على الخط، إلى الملخصات
                  والتنظيم والبحث.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-border transition-colors bg-background/60 backdrop-blur-sm">
              <CardHeader className="flex flex-col items-end text-right">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 bg-black">
                  <Folder className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-1">تنظيم يناسب أسلوبك</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  أنشئ مجلدات للدورات أو المشاريع، وأضف وسومًا ذكية لتجميع الأفكار والموضوعات في ثوانٍ.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="border-border/50 bg-muted/40">
              <CardHeader className="text-right">
                <CardTitle className="text-2xl mb-2">رحلة المستخدم داخل المنصة</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  من أول صورة تلتقطها للدفتر وحتى آخر ملخص منظم، كل شيء مصمم ليكون بديهياً.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>١. ارفع صورة لصفحة من دفترك أو عدة صفحات دفعة واحدة.</p>
                <p>٢. يتولى الذكاء الاصطناعي استخراج النص وترتيبه في ملاحظة نظيفة.</p>
                <p>٣. يمكنك طلب ملخص، إعادة صياغة، أو تحويل الملاحظة إلى نقاط مرتبة.</p>
                <p>٤. نظّم الملاحظات في مجلدات، وأضف وسومًا وارتباطات بين المواضيع.</p>
                <p>٥. استخدم البحث الذكي للعثور على أي فكرة أو تعريف في ثوانٍ.</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/80">
              <CardHeader className="text-right">
                <CardTitle className="text-2xl mb-2">بنية آمنة وموثوقة</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  المنصة مبنية لتكون جاهزة للاستخدام اليومي المكثف مع الحفاظ على خصوصيتك.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3 flex-row">
                  <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p>تشفير للبيانات أثناء النقل والتخزين، مع تحكم كامل لك في حذف بياناتك.</p>
                </div>
                <div className="flex items-start gap-3 flex-row">
                  <Brain className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p>نماذج ذكاء اصطناعي محدثة باستمرار للحصول على أفضل دقة وجودة.</p>
                </div>
                <div className="flex items-start gap-3 flex-row">
                  <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p>منصة سحابية جاهزة للعمل في أي وقت ومن أي جهاز متصل بالإنترنت.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


