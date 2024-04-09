import AppLayout from "@/components/common/AppLayout";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
