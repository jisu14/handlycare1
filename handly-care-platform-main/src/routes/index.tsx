import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import {
  AllSections,
} from "@/components/landing/Sections";
import { BookDemoDialog } from "@/components/landing/BookDemoDialog";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Handly Care — Intelligent Home Care Operations" },
      {
        name: "description",
        content:
          "Handly Care is an AI-driven operating system for modern home care providers. Scale your agency with automated scheduling and verified outcomes.",
      },
      { property: "og:title", content: "Handly Care — Intelligent Home Care Operations" },
      {
        property: "og:description",
        content:
          "The world's most intelligent home care platform. Automate scheduling, verify visits, and predict care outcomes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <AllSections />
      </main>
      <BookDemoDialog />
      <Toaster />
    </div>
  );
}
