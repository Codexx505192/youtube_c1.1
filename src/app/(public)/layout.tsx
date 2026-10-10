import { BaseLayout } from "@/widjets/BaseLayout/ui/BaseLayout/BaseLayout"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BaseLayout>{children}</BaseLayout>
}