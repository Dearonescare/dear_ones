import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-2xl py-32">
      <h1 className="text-4xl text-brown">Privacy Policy</h1>
      {/* TODO: replace this placeholder with a reviewed privacy policy before launch. */}
      <p className="mt-6 rounded-2xl border border-gold/40 bg-background-soft px-5 py-4 text-sm text-brown-soft">
        This is a placeholder page. A full privacy policy describing how Dear
        Ones collects, uses and protects personal information will be published
        here before launch.
      </p>
      <p className="mt-6 leading-relaxed text-muted">
        If you have any questions about your data in the meantime, please contact
        the Dear Ones team using the enquiry form on the home page.
      </p>
    </Container>
  );
}
