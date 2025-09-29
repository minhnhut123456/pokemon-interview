import { Roboto } from 'next/font/google';
import './reset.css';
import './global.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<LayoutProps>) => {
  return (
    <html>
      <body className={roboto.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
