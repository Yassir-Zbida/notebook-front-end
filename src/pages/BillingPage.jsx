import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, CreditCard, ChevronLeft } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function BillingPage() {
  const { toast } = useToast();

  const { data: billing, isLoading } = useQuery({
    queryKey: ['billing'],
    queryFn: async () => {
      const res = await api.get('/billing');
      return res.data;
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/billing/checkout', { planType: 'PRO' });
      return res.data;
    },
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    },
  });

  const portalMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/billing/portal');
      return res.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  if (isLoading) {
    return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" side="right" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>جاري التحميل...</div>
        </div>
      </SidebarInset>
    );
  }

  const isPro = billing?.subscription?.planType === 'PRO';

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4 w-full justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" side="right" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="mr-auto">
              <BreadcrumbList className="flex-row-reverse justify-end">
                <BreadcrumbItem>
                  <BreadcrumbPage>الفوترة</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">لوحة التحكم</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">الفوترة</h1>
          <p className="text-muted-foreground">إدارة اشتراكك والفوترة</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>الخطة الحالية</CardTitle>
              <CardDescription>اشتراكك النشط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold capitalize">
                    {billing?.subscription?.planType === 'Free' ? 'مجانية' : billing?.subscription?.planType === 'Pro' ? 'احترافية' : billing?.subscription?.planType || 'مجانية'}
                  </p>
                  {billing?.subscription?.currentPeriodEnd && (
                    <p className="text-sm text-muted-foreground">
                      التجديد في{' '}
                      {new Date(billing.subscription.currentPeriodEnd).toLocaleDateString('ar-SA')}
                    </p>
                  )}
                </div>
                {isPro ? (
                  <Button
                    variant="outline"
                    onClick={() => portalMutation.mutate()}
                    disabled={portalMutation.isPending}
                    className="flex-row-reverse"
                  >
                    <CreditCard className="h-4 w-4 ml-2" />
                    إدارة الاشتراك
                  </Button>
                ) : (
                  <Button onClick={() => checkoutMutation.mutate()} disabled={checkoutMutation.isPending}>
                    الترقية إلى Pro
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مميزات الخطة الاحترافية</CardTitle>
              <CardDescription>كل ما هو متضمن في Pro</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 flex-row-reverse">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">تحويلات غير محدودة</span>
                </li>
                <li className="flex items-center gap-2 flex-row-reverse">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">جميع مزايا الذكاء الاصطناعي</span>
                </li>
                <li className="flex items-center gap-2 flex-row-reverse">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">مجلدات ووسوم</span>
                </li>
                <li className="flex items-center gap-2 flex-row-reverse">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">تصدير PDF و TXT و Markdown</span>
                </li>
                <li className="flex items-center gap-2 flex-row-reverse">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">معالجة ذات أولوية</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {billing?.recentPayments && billing.recentPayments.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>سجل المدفوعات</CardTitle>
                <CardDescription>مدفوعاتك الأخيرة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {billing.recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 border rounded-lg flex-row-reverse"
                    >
                      <div className="text-right">
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <span className="text-sm capitalize">{payment.status === 'paid' ? 'مدفوع' : payment.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
