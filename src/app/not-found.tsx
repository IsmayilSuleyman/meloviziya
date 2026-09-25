import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Səhifə tapılmadı</h1>
      <p className="mt-4">
        <Link href="/" className="underline">
          Ana səhifəyə qayıt
        </Link>
      </p>
    </>
  );
}
