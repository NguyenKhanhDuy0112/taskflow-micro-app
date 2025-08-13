import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

export const metadata: Metadata = {
  title: 'TaskFlow - Project Management',
  description: 'Modern project management tool'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            primaryColor: 'blue',
            defaultRadius: 'md',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          <Notifications />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
