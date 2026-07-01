import { appConfig } from '@/shared/config/appConfig';

export const HomePage = () => (
  <section className="flex flex-1 items-center justify-center">
    <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-brand-700/20 backdrop-blur">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">
        Project Foundation
      </p>
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">{appConfig.name}</h1>
      <p className="mt-6 text-lg leading-8 text-slate-300">
        A production-ready React foundation is configured with TypeScript, TailwindCSS, React
        Router, React Query, Axios, environment variables, and scalable folders.
      </p>
      <div className="mt-8 rounded-2xl bg-slate-900/80 p-4 text-left text-sm text-slate-300">
        <span className="text-slate-500">API Base URL:</span> {appConfig.apiBaseUrl}
      </div>
    </div>
  </section>
);
