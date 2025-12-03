import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightCard from '@/components/SpotlightCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'كيف يعمل تحويل الملاحظات بالذكاء الاصطناعي؟',
      answer:
        'نستخدم نماذج متقدمة مدعومة برؤية الذكاء الاصطناعي لاستخراج النص من صور دفترك. يتعرف النظام على خط اليد ويحوّله إلى نص رقمي بدقة عالية خلال ثوانٍ بعد رفع الصورة.',
    },
    {
      question: 'ما هي صيغ الملفات المدعومة؟',
      answer:
        'ندعم صيغ الصور JPEG وPNG وGIF وWebP، على أن يكون حجم الملف أقل من 10 ميجابايت. للحصول على أفضل نتيجة، استخدم صورًا واضحة بخط يد مقروء.',
    },
    {
      question: 'هل يمكنني إلغاء الاشتراك في الخطة الاحترافية؟',
      answer:
        'نعم، يمكنك إلغاء الاشتراك في أي وقت من صفحة الفوترة. سيستمر وصولك إلى ميزات الخطة حتى نهاية فترة الفوترة الحالية دون أي التزامات إضافية.',
    },
    {
      question: 'هل بياناتي آمنة وخاصة؟',
      answer:
        'بالتأكيد. يتم تشفير ملاحظاتك وتخزينها بشكل آمن، ولا نشارك بياناتك مع أي طرف ثالث. يمكنك حذف بياناتك في أي وقت من إعدادات الحساب.',
    },
    {
      question: 'ما مدى دقة التعرف على خط اليد؟',
      answer:
        'يصل نظام التعرف على النص المدعوم بالذكاء الاصطناعي لدينا إلى دقة تتجاوز ٩٩٪ مع معظم أنماط الخطوط. قد تختلف النتيجة حسب وضوح الكتابة وجودة الصورة، لكننا نعمل باستمرار على تحسين النماذج.',
    },
    {
      question: 'هل يمكنني تصدير ملاحظاتي؟',
      answer:
        'نعم، يمكن لمستخدمي الخطة الاحترافية تصدير الملاحظات كملفات PDF أو TXT أو Markdown. مستخدمو الخطة المجانية لديهم خيارات تصدير محدودة. جميع الملفات المصدّرة تحافظ على البنية قدر الإمكان.',
    },
    {
      question: 'ماذا يحدث إذا تجاوزت حدود الخطة المجانية؟',
      answer:
        'سنرسل لك تنبيهًا عند الاقتراب من الحد المسموح. يمكنك الترقية إلى الخطة الاحترافية للحصول على تحويلات غير محدودة، أو الانتظار حتى يتم إعادة تعيين الحد الشهري.',
    },
    {
      question: 'هل تقدّمون استردادًا للمبالغ؟',
      answer:
        'نقوم بدراسة طلبات الاسترداد كل حالة على حدة. إذا لم تكن راضيًا عن الخطة الاحترافية، يمكنك التواصل مع فريق الدعم خلال ٣٠ يومًا من تاريخ الشراء لطلب استرداد كامل.',
    },
  ];

  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-right">
          {/* Hero / Heading */}
          <div className="max-w-3xl mx-auto text-center mb-12" dir="rtl">
           
            <h1 className="text-4xl md:text-5xl text-center font-bold mb-4 leading-[1.2]">
              كل ما تحتاج معرفته عن <br />{' '}
              <span className="gradient-text-animated">دفتر الملاحظات الذكي</span>
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              استكشف أهم الأسئلة التي يطرحها المستخدمون حول التحويل بالذكاء الاصطناعي، الخصوصية، والتسعير —
              مع إجابات واضحة وسهلة.
            </p>
          </div>

          {/* Animated Accordion */}
          <div className="space-y-4 max-w-3xl mx-auto" dir="rtl">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <SpotlightCard
                  key={index}
                  className="custom-spotlight-card cursor-pointer"
                  spotlightColor="rgba(0, 229, 255, 0.18)"
                >
                  <Card
                    className={`bg-transparent shadow-none border-0 transition-all duration-300 ${
                      isOpen ? 'scale-[1.01]' : ''
                    }`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between gap-4" dir="rtl">
                        <CardTitle className="text-lg font-semibold text-right flex-1">
                          {faq.question}
                        </CardTitle>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CardHeader>
                    <CardContent
                      className={`pt-0 pb-4 overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-[260px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-muted-foreground leading-relaxed text-right">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              );
            })}
          </div>

          
        </div>
      </div>
      <Footer />
    </div>
  );
}

