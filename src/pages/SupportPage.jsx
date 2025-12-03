import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightCard from '@/components/SpotlightCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, LifeBuoy } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12" dir="rtl">
            <h1 className="text-4xl text-center md:text-5xl font-bold mb-4">
              <span className="gradient-text-animated">الدعم</span>
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              هنا لمساعدتك في كل ما يتعلق بالمنصة — من المشاكل التقنية إلى اقتراحات التحسين.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" dir="rtl">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <LifeBuoy className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">قاعدة المعرفة</CardTitle>
                  <CardDescription className="text-base text-right">
                    مقالات وأدلة لحل أكثر المشاكل شيوعًا وخطوات تفصيلية للاستخدام اليومي.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button asChild variant="outline" className="rounded-full">
                    <a href="/faq">زيارة الأسئلة الشائعة</a>
                  </Button>
                </CardContent>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">البريد الإلكتروني</CardTitle>
                  <CardDescription className="text-base text-right">
                    راسلنا لأي استفسار أو مشكلة تقنية عبر البريد، وسنرد عليك خلال ٢٤ ساعة.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button asChild variant="outline" className="rounded-full">
                    <a href="mailto:support@notebooklistai.com">إرسال بريد للدعم</a>
                  </Button>
                </CardContent>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">التواصل المباشر</CardTitle>
                  <CardDescription className="text-base text-right">
                    تواصل مع فريقنا عبر نموذج التواصل إذا احتجت لمساعدة تفصيلية أو مكالمة.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button asChild className="rounded-full">
                    <a href="/contact">فتح صفحة اتصل بنا</a>
                  </Button>
                </CardContent>
              </Card>
            </SpotlightCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


