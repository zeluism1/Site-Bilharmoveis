import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | Bilharmoveis",
  description: "Discover our premium furniture collections for hospitality environments.",
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
} 