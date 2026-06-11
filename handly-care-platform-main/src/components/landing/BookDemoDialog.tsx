import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  work_email: z
    .string()
    .trim()
    .min(3, "Enter your work email")
    .max(320)
    .email("Enter a valid work email"),
});

export const BOOK_DEMO_EVENT = "handly:open-book-demo";

export function openBookDemo() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(BOOK_DEMO_EVENT));
  }
}

type FormState = {
  work_email: string;
};

const initial: FormState = {
  work_email: "",
};

export function BookDemoDialog() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    const handler = () => {
      setDone(false);
      setErrors({});
      setOpen(true);
    };
    window.addEventListener(BOOK_DEMO_EVENT, handler);
    return () => window.removeEventListener(BOOK_DEMO_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const update = <K extends keyof FormState>(k: K, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Send default strings for org size and use case in case they are required by the DB schema
    const { error } = await supabase.from("demo_requests").insert({
      work_email: parsed.data.work_email,
      organization_size: "Not specified",
      use_case: "Not specified",
      source: typeof window !== "undefined" ? window.location.pathname : null,
    });
    setSubmitting(false);

    if (error) {
      console.error("[book demo] insert failed", error);
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setDone(true);
    setForm(initial);
    toast.success("Demo request received — we'll be in touch shortly.");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-[420px] rounded-2xl border border-border bg-card shadow-glow overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-demo-title"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand)] to-transparent" />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3.5 right-3.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {done ? (
              <SuccessView onClose={() => setOpen(false)} />
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--brand)] font-medium text-center">
                  Book a demo
                </div>
                <h2
                  id="book-demo-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-center"
                >
                  See Handly Care in action.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground text-center mb-6">
                  Enter your email address and we'll be in touch to schedule a tailored walkthrough of the platform.
                </p>

                <div className="mt-4">
                  <Field required error={errors.work_email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.work_email}
                      onChange={(e) => update("work_email", e.target.value)}
                      className="input py-3"
                      placeholder="you@yourcompany.com"
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-medium shadow-elegant hover:opacity-90 transition disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Request demo
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-[11px] text-muted-foreground text-center">
                  By submitting, you agree to be contacted about Handly Care. No spam.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  required,
  error,
  children,
}: {
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      {children}
      {error && (
        <div className="mt-1.5 text-xs text-[oklch(0.6_0.22_25)] text-center">{error}</div>
      )}
      <style>{`
        .input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: var(--foreground);
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
        }
        .input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 18%, transparent);
        }
        .input::placeholder { color: color-mix(in oklab, var(--foreground) 40%, transparent); text-align: center; }
      `}</style>
    </label>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-semibold tracking-tight">
        Thanks — we've got it.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        A member of our team will reach out within one business day to schedule
        your walkthrough.
      </p>
      <button
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary transition"
      >
        Close
      </button>
    </div>
  );
}
