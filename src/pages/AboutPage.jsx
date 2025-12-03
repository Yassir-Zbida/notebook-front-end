import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightCard from '@/components/SpotlightCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Target, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="gradient-text-animated text-center">من نحن</span>
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              فريق صغير شغوف بالتقنية والذكاء الاصطناعي، هدفه تبسيط تدوين الملاحظات وتحويل الدفاتر
              الورقية إلى معرفة رقمية سهلة الوصول.
            </p>
          </div>

          <div className="space-y-6 text-muted-foreground text-base leading-relaxed mb-12 text-right" dir="rtl">
            <p>
              بدأنا ملاحظاتي من احتياج بسيط: كيف يمكن أن نحافظ على قيمة الملاحظات المكتوبة بخط اليد دون أن
              تضيع في الدفاتر والملفات؟ مع تطور تقنيات الرؤية الحاسوبية والذكاء الاصطناعي، أصبح بالإمكان
              تحويل هذه الملاحظات إلى بيانات رقمية قابلة للبحث والتنظيم والتحليل.
            </p>
            <p>
              اليوم، نقدم منصة تساعد الطلاب، الباحثين، والمحترفين على تنظيم أفكارهم وملاحظاتهم في مساحة
              واحدة، مع أدوات ذكية للملخصات، إعادة الصياغة، والبحث المتقدم داخل المحتوى.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 rounded-xl" dir="rtl">
            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">رؤيتنا</CardTitle>
                  <CardDescription className="text-base text-right">
                    أن تصبح عملية تدوين وتنظيم الملاحظات ممتعة وسريعة، وأن يكون الوصول للمعلومة مسألة ثوانٍ
                    فقط.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">من نخدم</CardTitle>
                  <CardDescription className="text-base text-right">
                    طلاب الجامعات، المدرسون، الباحثون، وكل من يعتمد على الملاحظات اليومية في تعلمه أو عمله.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <HeartHandshake className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">قيمنا</CardTitle>
                  <CardDescription className="text-base text-right">
                    البساطة، الخصوصية، والجودة. نبني ميزات حقيقية، ونحافظ على خصوصية بياناتك كأولوية أساسية.
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


