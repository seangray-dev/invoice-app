import SideNav from '@/app/components/nav/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col 2xl:grid 2xl:grid-cols-[103px_1fr] 2xl:overflow-hidden">
      <div>
        <SideNav />
      </div>
      <div className="container flex-grow pb-40">{children}</div>
    </div>
  );
}
