import Link from "next/link";
import { Container } from "@/components/container";
import { BookX } from "lucide-react";

export default function BookNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
            <BookX className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-navy mb-3">Book Not Found</h1>
          <p className="text-text-secondary leading-relaxed mb-8">
            The book you are looking for does not exist in our collection or may have been removed.
            Please check the catalog for available books.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center px-6 py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all"
            >
              Browse Catalog
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-border-light text-text-secondary text-sm font-semibold rounded-xl hover:bg-card-bg transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
