import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
      <Outlet />
    </main>
  </div>
);
