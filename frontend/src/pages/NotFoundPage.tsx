import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <section className="flex flex-1 items-center justify-center text-center">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">404</p>
      <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-300">The page you are looking for does not exist.</p>
      <Link className="mt-8 inline-flex rounded-full bg-brand-500 px-5 py-3 font-semibold" to="/">
        Back to Home
      </Link>
    </div>
  </section>
);
