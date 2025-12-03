import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightCard from '@/components/SpotlightCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, HelpCircle, MessageSquare } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="gradient-text-animated text-center">الموارد</span>
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              دليل متكامل لمساعدتك على البدء بسرعة، واستغلال كل إمكانيات المنصة<br /> عبر التوثيق، الشروحات،
              والدعم.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12" dir="rtl">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="flex flex-row-reverse items-start gap-4 text-right p-6">
                  <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-xl text-right">التوثيق</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-right">
                      شرح تفصيلي لكيفية استخدام المنصة، إعداد الحساب، إدارة الملاحظات، وربط مصادر خارجية.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full"
                  >
                    <a
                      href="https://docs.notebooklistai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      فتح التوثيق
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </SpotlightCard>

            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="flex flex-row-reverse items-start gap-4 text-right p-6">
                  <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-xl text-right">دليل البدء السريع</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-right">
                      خطوات عملية مختصرة من تسجيل الحساب وحتى أول ملاحظة ذكية، موجهة للمستخدمين الجدد.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button variant="ghost" className="rounded-full  text-sm opacity-70 cursor-default">
                    متاح داخل المنصة قريباً
                  </Button>
                </CardContent>
              </Card>
            </SpotlightCard>
          </div>

          <div className="grid md:grid-cols-2 gap-8" dir="rtl">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="flex flex-row-reverse items-start gap-4 text-right p-6">
                  <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-xl text-right">الأسئلة الشائعة</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-right">
                      إجابات لأكثر الأسئلة انتشارًا عن التسعير، الخصوصية، والميزات الرئيسية في المنصة.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button asChild variant="outline" className="rounded-full">
                    <a href="/faq">انتقل إلى صفحة الأسئلة الشائعة</a>
                  </Button>
                </CardContent>
              </Card>
            </SpotlightCard>

            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="flex flex-row-reverse items-start gap-4 text-right p-6">
                  <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-xl text-right">الدعم</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-right">
                      تواصل مع فريق الدعم في حال واجهت أي مشكلة تقنية أو كان لديك طلب ميزة جديدة.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-start pb-6 pt-0">
                  <Button asChild className="rounded-full">
                    <a href="/support">اذهب إلى صفحة الدعم</a>
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


