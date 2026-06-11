
CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_email text NOT NULL,
  full_name text,
  organization text,
  organization_size text NOT NULL,
  use_case text NOT NULL,
  message text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.demo_requests TO anon, authenticated;
GRANT ALL ON public.demo_requests TO service_role;

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can submit a demo request.
CREATE POLICY "Anyone can submit a demo request"
  ON public.demo_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(work_email) BETWEEN 3 AND 320
    AND work_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(organization_size) BETWEEN 1 AND 64
    AND char_length(use_case) BETWEEN 1 AND 2000
  );

-- No SELECT/UPDATE/DELETE policies — leads readable only via service_role.
