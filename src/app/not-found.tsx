import Link from 'next/link'
import { CreditCard, Home, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-xl text-gray-600">Oops! Looks like this transaction didn&apos;t go through.</p>
        </div>

        <div className="flex justify-center space-x-4">
          <CreditCard className="h-16 w-16 text-blue-500" />
          <Search className="h-16 w-16 text-blue-400" />
        </div>

        <div className="animate-bounce">
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto"></div>
        </div>

        <p className="text-gray-600">
          Don&apos;t worry, your account balance is safe. Let&apos;s get you back to a working page.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/support">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Posline. All rights reserved.</p>
      </footer>
    </div>
  )
}