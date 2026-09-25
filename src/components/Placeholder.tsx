export function Placeholder({ title, empty }: { title: string; empty: string }) {
  return (
    <>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-4 text-subtle">{empty}</p>
    </>
  );
}
