import { BaseLayout } from "@/widjets/BaseLayout/ui/BaseLayout/BaseLayout"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BaseLayout>{children}</BaseLayout>
}