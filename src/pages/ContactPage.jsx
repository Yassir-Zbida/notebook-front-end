import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightCard from '@/components/SpotlightCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Clock, Send, Upload, X, ChevronDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    inquiryType: '', 
    message: '',
    attachment: null 
  });
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({ ...prev, [id]: files[0] }));
      setFileName(files[0].name);
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, attachment: null }));
    setFileName('');
    // Reset file input
    const fileInput = document.getElementById('attachment');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: 'برجاء إكمال البيانات المطلوبة',
        description: 'الاسم، البريد الإلكتروني والرسالة مطلوبة.',
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('inquiryType', form.inquiryType || 'general');
      formData.append('message', form.message);
      if (form.attachment) {
        formData.append('attachment', form.attachment);
      }

      await api.post('/contact', formData);

      setForm({ name: '', email: '', inquiryType: '', message: '', attachment: null });
      setFileName('');
      toast({
        title: 'شكرًا لتواصلك معنا',
        description: 'تلقينا رسالتك وسنقوم بالرد في أقرب وقت ممكن.',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'حاول مرة أخرى لاحقًا.';
      toast({
        title: 'حدث خطأ أثناء إرسال الرسالة',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background antialiased">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="gradient-text-animated text-center">تواصل معنا</span>
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              لديك استفسار أو ملاحظة؟ يسعدنا سماعك. اترك رسالتك وسنرد عليك في أقرب وقت ممكن.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 rounded-xl" dir="rtl">
            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">البريد الإلكتروني</CardTitle>
                  <CardDescription className="text-base text-right">
                    support@notebooklistai.com
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">الدردشة المباشرة</CardTitle>
                  <CardDescription className="text-base text-right">
                    متاحة من الإثنين إلى الجمعة، من ٩ صباحًا حتى ٥ مساءً بتوقيت EST
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-black">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-right">سرعة الاستجابة</CardTitle>
                  <CardDescription className="text-base text-right">
                    عادةً نرد خلال ٢٤ ساعة
                  </CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>
          </div>

          <div className="mx-auto" dir="rtl">
            <SpotlightCard className="custom-spotlight-card rounded-xl" spotlightColor="rgba(0, 229, 255, 0.2)">
              <Card className="border-border/50 hover:border-border transition-all duration-300 group relative overflow-hidden bg-transparent border-0">
                <CardHeader className="relative text-right">
                  <CardTitle className="text-xl mb-2 text-right">أرسل لنا رسالة</CardTitle>
                  <CardDescription className="text-base text-right">
                    املأ النموذج وسنقوم بالرد عليك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم *</Label>
                      <Input
                        id="name"
                        placeholder="اسمك الكامل"
                        className="mt-1"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="mt-1"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">نوع الاستفسار</Label>
                    <div className="relative mt-1">
                      <select
                        id="inquiryType"
                        className={cn(
                          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "appearance-none cursor-pointer"
                        )}
                        value={form.inquiryType}
                        onChange={handleChange}
                      >
                        <option value="general">استفسار عام</option>
                        <option value="support">دعم فني</option>
                        <option value="feature">اقتراح ميزة</option>
                        <option value="bug">الإبلاغ عن مشكلة</option>
                        <option value="enterprise">حلول مؤسسية</option>
                        <option value="partnership">شراكات وتعاون</option>
                        <option value="billing">استفسار عن الفوترة</option>
                        <option value="other">أخرى</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea
                      id="message"
                      placeholder="اكتب تفاصيل رسالتك هنا..."
                      className="mt-1 min-h-[140px]"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="attachment">مرفقات (اختياري)</Label>
                    <div className="mt-1">
                      {!fileName ? (
                        <label
                          htmlFor="attachment"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">اضغط للرفع</span> أو اسحب الملف هنا
                            </p>
                            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, PNG, JPG (حتى 10 ميجا)</p>
                          </div>
                          <input
                            id="attachment"
                            type="file"
                            className="hidden"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-4 border border-input rounded-lg bg-accent/50">
                          <div className="flex items-center gap-3">
                            <Upload className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{fileName}</p>
                              <p className="text-xs text-muted-foreground">
                                {form.attachment?.size ? `${(form.attachment.size / 1024 / 1024).toFixed(2)} ميجابايت` : ''}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveFile}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                    <Send className="mr-2 h-4 w-4" />
                  </Button>
                </form>
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