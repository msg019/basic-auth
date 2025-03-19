import Link from "next/link";


export default function Home() {
  return (
    <div className="absolute top-[30%] left-[30%] flex flex-col justify-center items-center">
      
      <h1 className="text-4xl">Welcome!!😊</h1>

      <nav className="flex gap-20 mt-20 text-2xl">
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
        <Link href="/content">Content</Link>
      </nav>
    </div>
  );
}
