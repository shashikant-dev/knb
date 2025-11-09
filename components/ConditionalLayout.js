'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/v1');

  if (isAdminRoute) {
    return children;
  }

  return (
    <>
      <Header />
      <div className="pt-16 lg:pt-20">
        {children}
      </div>
      <Footer />
    </>
  );
}