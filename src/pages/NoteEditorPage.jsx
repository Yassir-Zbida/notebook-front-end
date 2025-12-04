import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Save, ArrowRight, Download, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

// Get API base URL for image URLs
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.notebook-ai.co/api';
const IMAGE_BASE_URL = API_BASE_URL.replace('/api', '');
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

export default function NoteEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      const res = await api.get(`/notes/${id}`);
      return res.data.note;
    },
    onSuccess: (data) => {
      setTitle(data.title);
      setContent(data.content);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return api.put(`/notes/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['note', id]);
      toast({
        title: 'تم تحديث الملاحظة',
        description: 'تم حفظ تغييراتك.',
      });
    },
  });

  const cleanMutation = useMutation({
    mutationFn: async () => {
      return api.post(`/notes/${id}/clean`);
    },
    onSuccess: (res) => {
      setContent(res.data.note.cleanedText || res.data.note.content);
      queryClient.invalidateQueries(['note', id]);
      toast({
        title: 'تم تنظيف النص',
        description: 'قام الذكاء الاصطناعي بتنظيف وتنسيق نصك.',
      });
    },
  });

  const summarizeMutation = useMutation({
    mutationFn: async (type) => {
      return api.post(`/notes/${id}/summarize?type=${type}`);
    },
    onSuccess: (res) => {
      toast({
        title: 'تم إنشاء الملخص',
        description: 'تمت إضافة ملخص الذكاء الاصطناعي إلى ملاحظتك.',
      });
      queryClient.invalidateQueries(['note', id]);
    },
  });

  const rewriteMutation = useMutation({
    mutationFn: async (style) => {
      return api.post(`/notes/${id}/rewrite`, { style });
    },
    onSuccess: (res) => {
      setContent(res.data.note.content);
      queryClient.invalidateQueries(['note', id]);
      toast({
        title: 'تم إعادة كتابة النص',
        description: 'تمت إعادة كتابة ملاحظتك.',
      });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ title, content });
  };

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

  if (!note) {
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
          <div>الملاحظة غير موجودة</div>
        </div>
      </SidebarInset>
    );
  }

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
                  <BreadcrumbPage>تحرير الملاحظة</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard/notes">الملاحظات</Link>
                  </BreadcrumbLink>
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
        <div className="flex items-center justify-between mb-6 flex-row-reverse">
          <Button variant="ghost" onClick={() => navigate('/dashboard/notes')} className="flex-row-reverse">
            <ArrowRight className="h-4 w-4 ml-2" />
            رجوع
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-row-reverse">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button onClick={handleSave} disabled={updateMutation.isPending} className="flex-row-reverse">
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle>الصورة الأصلية</CardTitle>
            </CardHeader>
            <CardContent>
              {note.imageUrl ? (
                <img
                  src={`${IMAGE_BASE_URL}${note.imageUrl}`}
                  alt="Note"
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">لا توجد صورة</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Text Editor */}
          <Card>
            <CardHeader>
              <CardTitle>محتوى الملاحظة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان الملاحظة"
                  className="text-lg font-semibold text-right"
                />
              </div>
              <div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="محتوى الملاحظة"
                  className="min-h-[400px] text-right"
                />
              </div>

              {/* AI Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t flex-row-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cleanMutation.mutate()}
                  disabled={cleanMutation.isPending}
                  className="flex-row-reverse"
                >
                  <Sparkles className="h-4 w-4 ml-2" />
                  تنظيف النص
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => summarizeMutation.mutate('short')}
                  disabled={summarizeMutation.isPending}
                >
                  تلخيص
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rewriteMutation.mutate('professional')}
                  disabled={rewriteMutation.isPending}
                >
                  إعادة كتابة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
