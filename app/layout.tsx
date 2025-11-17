import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { DndProvider } from '@/components/providers'
import { userService } from '@/services'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Everfit - Workout Planning App',
  description: 'Your complete workout planning and training calendar',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await userService.getUserProfile()

  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <DndProvider>
          <Header userName={user.name} />
          <main className="bg-white min-h-[calc(100vh-4rem)] flex flex-col">{children}</main>
        </DndProvider>
      </body>
    </html>
  )
}
