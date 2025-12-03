import { Card, CardContent } from "@/components/ui/card";
import { SignUpForm } from "@/components/SignUpForm";

export default function RegisterPage() {
  return (
    <div
      className="min-h-svh flex items-center justify-center bg-background px-4 py-10"
      dir="rtl"
    >
      <Card className="w-full max-w-md border-border/60 shadow-xl bg-background/80 backdrop-blur">
        <CardContent className="p-6 sm:p-8">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}

