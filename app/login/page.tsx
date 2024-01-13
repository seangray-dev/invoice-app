import LoginForm from '@/app/components/login/login-form';
import SliceBooksLogo from '@/app/components/slicebooks-logo';

export default function LoginPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="w-[300px] rounded-lg bg-primary p-10">
        <SliceBooksLogo />
      </div>
      <LoginForm />
    </main>
  );
}
