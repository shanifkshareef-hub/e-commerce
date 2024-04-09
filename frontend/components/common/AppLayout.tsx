import Navbar from "@/components/header/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="h-full p-4">{children}</div>
    </div>
  );
}
