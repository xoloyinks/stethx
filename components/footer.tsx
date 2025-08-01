import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className="bg-gray-900 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} StethX. All rights reserved.</p>
                <p>
                    <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a>
                    {/* <a href="/privacy" className="text-blue-400 hover:underline"></a> */}
                </p>
            </div>
        </footer>
    </div>
  )
}
