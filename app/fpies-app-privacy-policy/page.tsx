import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPIES App — Privacy Policy",
  description:
    "How the FPIES App collects, stores, and protects data about you and the child in your care.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function FpiesPrivacyPolicyPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-40 p-2 md:p-8 mt-12 md:mt-0">
      <div className="relative z-10 w-full h-[85vh] md:h-[80vh] max-w-4xl bg-black border-2 border-zinc-800 rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col">

        {/* Header */}
        <div className="h-12 md:h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-zinc-300 font-mono text-[10px] md:text-xs tracking-widest uppercase truncate">
              FPIES App // Privacy Policy
            </span>
          </div>
          <Link href="/" className="text-zinc-600 hover:text-red-500 transition-colors" aria-label="Back to home">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
          </Link>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-8 pb-10 md:px-16 md:pt-14 bg-black/40 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <div className="max-w-2xl mx-auto">
            <article className="prose prose-invert prose-zinc prose-quoteless max-w-none">
              <h1>Privacy Policy — FPIES App</h1>
              <p className="text-zinc-400 text-sm">Last updated: 26 July 2026</p>

              <p>
                FPIES App ("the App") helps parents and caregivers track a
                child&apos;s food introductions, reactions, growth, and
                related reminders in the context of Food Protein-Induced
                Enterocolitis Syndrome (FPIES). This policy explains what
                data the App collects, why, where it is stored, and the
                rights you have over it.
              </p>

              <p>
                In short: your data is encrypted in transit, stored on
                servers located in the European Union, visible only to you
                and the caregivers you explicitly invite, and never sold or
                used for advertising. There are no ads and no analytics or
                tracking SDKs in this App.
              </p>

              <h2>Who is responsible for your data</h2>
              <p>
                The App is developed and operated by Daniel, an independent
                developer, who acts as the data controller for the purposes
                of the EU General Data Protection Regulation (GDPR). For any
                question or request regarding this policy or your data,
                contact:{" "}
                <a href="mailto:danielgg.csme@gmail.com">
                  danielgg.csme@gmail.com
                </a>
                .
              </p>

              <h2>Who should use this App</h2>
              <p>
                The App is intended for use by adults — parents, legal
                guardians, or caregivers — acting on behalf of a child in
                their care. Account registration is only intended for
                adults; the App does not knowingly collect data directly
                from children, and a child never interacts with the App or
                creates their own account.
              </p>

              <h2>What data we collect</h2>
              <p>
                <strong>Account data.</strong> Your email address (used to
                sign in via email and password) and, optionally, a display
                name and your preferred language.
              </p>
              <p>
                <strong>
                  Health data about the child in your care.
                </strong>{" "}
                This is the core purpose of the App and is treated as
                special category data under GDPR Article 9. It includes:
                the child&apos;s first name, date of birth, and sex; FPIES
                diagnosis status and any clinician notes you choose to add;
                food intake logs (what was eaten, when, quantity and
                preparation notes); reactions (severity, symptoms, whether
                emergency care was needed, and free-text notes); growth
                measurements (weight and height); reminders you set; and any
                PDF medical report you choose to generate and store within
                the App.
              </p>
              <p>
                <strong>Sharing data.</strong> If you invite another
                caregiver to a child&apos;s profile, we store their email
                address, the permission level you grant (read-only or can
                edit), and an invitation token. Invitation codes are shared
                by you, manually, through your device&apos;s native share
                sheet (for example Messages, WhatsApp, or email) — the App
                itself never sends emails on your behalf.
              </p>
              <p>
                <strong>Diagnostic data.</strong> If the App crashes or hits
                an unexpected error, a crash/error report is sent to our
                error-monitoring provider, Sentry. This report can include a
                stack trace, the app version, and general device/OS
                information. Our Sentry configuration has personal-data
                collection switched off, so your IP address and other
                directly identifying details are not deliberately collected
                as part of this diagnostic data.
              </p>
              <p>
                <strong>Data cached on your device.</strong> The App keeps a
                local, offline copy of the general food/allergen reference
                catalog (not specific to you) so it remains usable without a
                connection, and a temporary local queue of any changes you
                make while offline, which is synced to our servers once
                you&apos;re back online.
              </p>
              <p>
                We do not use advertising SDKs, analytics or tracking SDKs,
                or third-party sign-in providers (such as Google or Apple
                sign-in). We do not sell your data, and we do not use it for
                advertising.
              </p>

              <h2>Consent for a child&apos;s health data</h2>
              <p>
                Before you can add your first child profile, the App
                requires you to explicitly confirm, as the parent or legal
                guardian, that you consent to (1) the processing of your
                own account data and (2) the processing of your child&apos;s
                health data for the purpose of FPIES tracking. This consent
                is recorded with a timestamp and a policy version, and you
                can withdraw it at any time by contacting us, which will
                result in the deletion of your account as described below.
              </p>

              <h2>Who can access your data</h2>
              <p>
                Only you and the caregivers you explicitly invite to a
                child&apos;s profile can see that child&apos;s data, scoped
                to the permission level you grant them. As the developer, I
                do not access your family&apos;s health data except where
                strictly necessary to investigate a technical issue you
                report, to maintain the service, or where required by law.
              </p>

              <h2>Where your data is stored</h2>
              <p>
                Your account and health data are stored in a Supabase
                database hosted in the European Union (Ireland). Crash and
                error diagnostics are processed by Sentry, using their EU
                data storage region (Frankfurt, Germany). The App&apos;s
                typeface is loaded from Google Fonts at runtime, which
                involves a standard network request to Google&apos;s
                infrastructure but does not transmit any of your personal
                data. While these providers are themselves headquartered
                outside the EU, the specific infrastructure this App uses
                to store and process your data is located within the EU;
                any other, limited processing these providers may carry out
                internally (for example, customer support) is subject to
                appropriate safeguards under their respective privacy
                policies.
              </p>

              <h2>How long we keep your data</h2>
              <p>
                We keep your data for as long as your account and the
                relevant child profile exist. Archiving a child&apos;s
                profile hides it from active use but keeps its data intact
                and reversible. Permanently deleting an already-archived
                profile immediately and irreversibly deletes all of its
                associated records — food logs, reactions, growth
                measurements, reminders, and shared access grants.
              </p>
              <p>
                The App does not currently offer in-app deletion of your
                entire account. To request deletion of your account and all
                associated family and child data, email{" "}
                <a href="mailto:danielgg.csme@gmail.com">
                  danielgg.csme@gmail.com
                </a>{" "}
                from the address associated with your account. We will
                verify the request and delete the data within 30 days.
              </p>

              <h2>Your rights</h2>
              <p>
                Under the GDPR, you have the right to access, correct,
                export, restrict, or delete your data, and to object to or
                withdraw consent for its processing. To exercise any of
                these rights, contact{" "}
                <a href="mailto:danielgg.csme@gmail.com">
                  danielgg.csme@gmail.com
                </a>
                . You also have the right to lodge a complaint with your
                local data protection supervisory authority — for example,
                the Spanish Agencia Española de Protección de Datos (AEPD)
                if you are located in Spain.
              </p>

              <h2>Security</h2>
              <p>
                Data is encrypted in transit (TLS) between the App and our
                servers. Access to your family&apos;s data is enforced at
                the database level through row-level security policies, so
                a caregiver can only read or write data for the families and
                children they actually belong to. Authentication is
                protected by a password you choose.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                We may update this policy as the App evolves. Material
                changes affecting how we process your child&apos;s health
                data will require you to review and re-confirm your consent
                the next time you open the App. The date at the top of this
                page always reflects the latest version.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about this policy or your data can be sent to{" "}
                <a href="mailto:danielgg.csme@gmail.com">
                  danielgg.csme@gmail.com
                </a>
                .
              </p>
            </article>

            <div className="mt-10 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center md:text-left">
                End of document
              </span>
              <div className="hidden md:block h-px flex-1 mx-8 bg-zinc-900" />
              <span className="text-[10px] font-mono text-zinc-500">
                DOC: FPIES-PRIVACY // STATUS: CURRENT
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-8 md:h-10 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          </div>
          <span className="text-[8px] md:text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
            SYSLOG // OK
          </span>
        </div>
      </div>
    </div>
  );
}
