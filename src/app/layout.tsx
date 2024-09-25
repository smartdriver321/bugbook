import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import React from 'react'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import './globals.css'
import ReactQueryProvider from '@/provider/ReactQueryProvider'
import { fileRouter } from './api/uploadthing/core'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
})

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
})

export const metadata: Metadata = {
	title: {
		template: '%s | bugbook',
		default: 'BugBook',
	},
	description: 'The Social Media App for Powernerds',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />

				<ReactQueryProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</ReactQueryProvider>
				<Toaster />
			</body>
		</html>
	)
}
