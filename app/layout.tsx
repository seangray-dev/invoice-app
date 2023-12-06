import { spartan } from '@/app/fonts/fonts';
import '@/app/globals.css';
import { StoreProvider } from './redux/StoreProvider';
import { ThemeProvider } from './theme/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${spartan.className} antialiased`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
