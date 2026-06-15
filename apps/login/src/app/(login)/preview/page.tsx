import { Alert, AlertType } from "@/components/alert";
import { Button, ButtonVariants } from "@/components/button";
import { DynamicTheme } from "@/components/dynamic-theme";
import { SignInWithGithub } from "@/components/idps/sign-in-with-github";
import { SignInWithGoogle } from "@/components/idps/sign-in-with-google";
import { TextInput } from "@/components/input";
import { BadgeState, StateBadge } from "@/components/state-badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Preview",
};

export default function PreviewPage() {
  return (
    <DynamicTheme>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          <StateBadge state={BadgeState.Info}>Preview mode</StateBadge>
          <StateBadge state={BadgeState.Success}>Light theme</StateBadge>
        </div>
        <h1>Sign in to Triniprint</h1>
        <p className="ztdl-p">
          This backend-free preview uses the real login UI components, brand colors, typography, controls, and spacing so
          you can review the visual treatment locally.
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="space-y-3">
          <TextInput
            label="Email, username, or phone"
            placeholder="you@triniprint.com"
            autoComplete="username"
            defaultValue="alex@triniprint.com"
          />
          <TextInput label="Password" type="password" placeholder="Enter your password" autoComplete="current-password" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button className="text-sm font-medium text-[#525252] transition-colors hover:text-primary-light-500" type="button">
            Create account
          </button>
          <Button variant={ButtonVariants.Primary}>Continue</Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#dde6eb]" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d6d6d]">or</span>
          <div className="h-px flex-1 bg-[#dde6eb]" />
        </div>

        <div className="grid gap-3">
          <SignInWithGoogle name="Continue with Google" />
          <SignInWithGithub name="Continue with GitHub" />
        </div>

        <Alert type={AlertType.INFO}>
          Sample helper text uses the same alert, border, and surface styles as the live authentication flow.
        </Alert>

        <div className="grid gap-3 sm:grid-cols-2">
          <button className="motion-ui rounded-[8px] border border-[#dde6eb] bg-white px-4 py-3 text-left text-sm font-medium text-[#1d1d1d] drop-shadow-[0_8px_8px_rgba(29,29,29,0.10)] hover:border-primary-light-500/35 hover:bg-[#e7f7fd]">
            Passkey
            <span className="mt-1 block text-xs font-normal text-[#6d6d6d]">Use this device</span>
          </button>
          <button className="motion-ui rounded-[8px] border border-[#dde6eb] bg-white px-4 py-3 text-left text-sm font-medium text-[#1d1d1d] drop-shadow-[0_8px_8px_rgba(29,29,29,0.10)] hover:border-primary-light-500/35 hover:bg-[#e7f7fd]">
            Authenticator
            <span className="mt-1 block text-xs font-normal text-[#6d6d6d]">Enter a 6-digit code</span>
          </button>
        </div>
      </div>
    </DynamicTheme>
  );
}
