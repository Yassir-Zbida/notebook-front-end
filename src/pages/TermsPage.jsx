import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-right">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">شروط الاستخدام</h1>
            <p className="text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="border-border/50">
            <CardContent className="pt-8 prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-8">
                باستخدامك لخدمة دفتر الملاحظات الذكي، فإنك توافق على هذه الشروط. الرجاء قراءتها بعناية.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">١. استخدام الخدمة</h2>
              <p className="text-muted-foreground mb-6">
                يمكنك استخدام خدمتنا لتحويل الملاحظات المكتوبة بخط اليد إلى نص رقمي. أنت مسؤول عن المحتوى
                الذي تقوم برفعه، وتتعهد بعدم استخدام الخدمة لأي غرض غير قانوني أو غير مصرح به.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٢. الاشتراكات</h2>
              <p className="text-muted-foreground mb-6">
                يتم احتساب اشتراكات الخطة الاحترافية شهريًا. يمكنك الإلغاء في أي وقت. يتم التعامل مع طلبات
                الاسترداد كل حالة على حدة، وقد لا تكون الرسوم مستردة إلا إذا تطلّب القانون ذلك.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٣. محتوى المستخدم</h2>
              <p className="text-muted-foreground mb-6">
                تحتفظ بجميع الحقوق على المحتوى الخاص بك. من خلال رفع المحتوى، فإنك تمنحنا ترخيصًا لاستخدامه
                وتخزينه ومعالجته فقط لغرض تقديم الخدمة وتحسينها.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٤. الملكية الفكرية</h2>
              <p className="text-muted-foreground mb-6">
                الخدمة ومحتواها الأصلي وميزاتها ووظائفها مملوكة لـدفتر الملاحظات الذكي ومحمية بموجب قوانين
                حقوق النشر والعلامات التجارية وغيرها من قوانين الملكية الفكرية المعمول بها.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٥. حدود المسؤولية</h2>
              <p className="text-muted-foreground mb-6">
                لا يتحمل دفتر الملاحظات الذكي أي مسؤولية عن الأضرار غير المباشرة أو العرضية أو الخاصة أو
                التبعية الناتجة عن استخدامك للخدمة أو عدم قدرتك على استخدامها.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٦. التغييرات على الشروط</h2>
              <p className="text-muted-foreground mb-6">
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإبلاغ المستخدمين بأي تغييرات جوهرية، ويعد
                استمرارك في استخدام الخدمة بعد التعديلات قبولًا للشروط الجديدة.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٧. التواصل</h2>
              <p className="text-muted-foreground mb-6">
                إذا كان لديك أي استفسارات بخصوص شروط الاستخدام هذه، يمكنك التواصل معنا عبر البريد
                الإلكتروني: support@notebooklistai.com.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

