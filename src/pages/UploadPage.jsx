import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
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

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [folderId, setFolderId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      try {
        const res = await api.get('/folders');
        return res.data.folders;
      } catch (error) {
        return [];
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: 'الملف كبير جداً',
          description: 'يرجى اختيار صورة أصغر من 10 ميجابايت',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'لم يتم اختيار ملف',
        description: 'يرجى اختيار ملف صورة',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    if (folderId) {
      formData.append('folderId', folderId);
    }

    try {
      const response = await api.post('/notes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'تم إنشاء الملاحظة!',
        description: 'تمت معالجة ملاحظتك بنجاح.',
      });
      navigate(`/dashboard/notes/${response.data.note.id}`);
    } catch (error) {
      toast({
        title: 'فشل الرفع',
        description: error.response?.data?.error || 'فشل رفع الملاحظة',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
                  <BreadcrumbPage>رفع الملاحظات</BreadcrumbPage>
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
          <h1 className="text-3xl font-bold mb-2">رفع ملاحظة</h1>
          <p className="text-muted-foreground">ارفع صورة دفتر ملاحظات مكتوب بخط اليد للتحويل</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>رفع الصورة</CardTitle>
            <CardDescription>
              اختر صورة لملاحظاتك المكتوبة بخط اليد. ندعم صيغ JPEG و PNG و GIF و WebP.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image" className="text-right">صورة الدفتر</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  {file ? (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 mx-auto text-primary" />
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} ميجابايت
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFile(null)}
                      >
                        تغيير الملف
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <Label htmlFor="image" className="cursor-pointer">
                          <span className="text-primary hover:underline">انقر للرفع</span> أو
                          اسحب وأفلت
                        </Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF حتى 10 ميجابايت
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {folders && folders.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="folder" className="text-right">المجلد (اختياري)</Label>
                  <select
                    id="folder"
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-right"
                  >
                    <option value="">لا يوجد</option>
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!file || loading}>
                {loading ? 'جاري المعالجة...' : 'رفع وتحويل'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}

