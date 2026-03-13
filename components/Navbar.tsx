import Link from "next/link"

export default function Navbar() {
  return (

    <div className="w-full bg-black text-white p-4 flex justify-between">

      <h1 className="font-bold">
        Quid Invoice Generator
      </h1>

      <div className="flex gap-4">

        <Link href="/dashboard" 
        className="hover:text-gray-300">
          Dashboard
        </Link>

        <Link href="/login"
        className="hover:text-gray-300">
          Login
        </Link>

        <Link href="/create-invoice"
        className="hover:text-gray-300">
        Create-Invoice
        </Link>
      </div>

    </div>

  )
}