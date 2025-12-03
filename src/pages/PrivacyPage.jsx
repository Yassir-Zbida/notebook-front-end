import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-right">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">سياسة الخصوصية</h1>
            <p className="text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="border-border/50">
            <CardContent className="pt-8 prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-8">
                نحن نحترم خصوصيتك وملتزمون بحماية بياناتك. توضح هذه السياسة كيفية جمع معلوماتك
                واستخدامها وحمايتها ضمن خدمة دفتر الملاحظات الذكي.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">١. جمع البيانات</h2>
              <p className="text-muted-foreground mb-6">
                نقوم بجمع المعلومات التي تزودنا بها عند إنشاء حساب أو استخدامك للخدمة، بما في ذلك اسمك
                وبريدك الإلكتروني والمحتوى الذي ترفعه. كما نجمع بعض بيانات الاستخدام لتحسين جودة الخدمة،
                ولا نشارك بياناتك مع أطراف ثالثة إلا عند الضرورة لتقديم الخدمة.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٢. تخزين البيانات</h2>
              <p className="text-muted-foreground mb-6">
                يتم تخزين ملاحظاتك وصورك بشكل آمن باستخدام تقنيات تشفير معتمدة. نستخدم مزودي تخزين سحابي
                موثوقين لضمان حماية بياناتك، ويمكنك حذف بياناتك في أي وقت من إعدادات الحساب.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٣. استخدام البيانات</h2>
              <p className="text-muted-foreground mb-6">
                نستخدم بياناتك فقط لتقديم الخدمة وتحسينها؛ بما في ذلك معالجة الملاحظات، وإنشاء الملخصات،
                وتخصيص تجربتك داخل التطبيق. لا نستخدم بياناتك للإعلانات ولا نبيعها لأي طرف ثالث.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٤. ملفات تعريف الارتباط (الكوكيز)</h2>
              <p className="text-muted-foreground mb-6">
                نستخدم ملفات تعريف الارتباط وتقنيات مشابهة للحفاظ على جلسة تسجيل الدخول وتذكر تفضيلاتك
                وتحليل أنماط الاستخدام. يمكنك التحكم في إعدادات الكوكيز من خلال إعدادات المتصفح الخاص بك.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٥. أمان البيانات</h2>
              <p className="text-muted-foreground mb-6">
                نطبّق إجراءات تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرّح به أو التعديل
                أو الكشف أو الإتلاف. ومع ذلك، لا يمكن ضمان أمان مطلق لأي وسيلة نقل بيانات عبر الإنترنت.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٦. حقوقك</h2>
              <p className="text-muted-foreground mb-6">
                لك الحق في الوصول إلى بياناتك الشخصية أو تحديثها أو حذفها في أي وقت، كما يمكنك طلب نسخة
                من بياناتك أو الاعتراض على بعض أنشطة المعالجة. لاستخدام هذه الحقوق، تواصل معنا عبر
                support@notebooklistai.com.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٧. خصوصية الأطفال</h2>
              <p className="text-muted-foreground mb-6">
                خدماتنا غير موجهة للأطفال دون سن ١٣ عامًا، ولا نقوم عن عمد بجمع بيانات شخصية عنهم. إذا
                كنت تعتقد أننا جمعنا بيانات لطفل، يرجى التواصل معنا فورًا لنتخذ الإجراءات اللازمة.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٨. التغييرات على سياسة الخصوصية</h2>
              <p className="text-muted-foreground mb-6">
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية من خلال نشر
                النسخة المحدّثة على هذه الصفحة وتحديث تاريخ "آخر تحديث".
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">٩. تواصل معنا</h2>
              <p className="text-muted-foreground mb-6">
                إذا كان لديك أي استفسار حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر البريد الإلكتروني:
                support@notebooklistai.com.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

