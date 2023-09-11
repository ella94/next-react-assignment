import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '채용공고 상세 페이지',
  description: '채용공고 상세 페이지 입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
