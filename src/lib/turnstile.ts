const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileSiteverifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function validateTurnstileToken({
  token,
  remoteIp,
  expectedAction,
}: {
  token: string;
  remoteIp: string;
  expectedAction: string;
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";

  if (!secret || secret.includes("exemplo")) {
    return { success: true, skipped: true as const };
  }

  if (!token) {
    return {
      success: false,
      errorCodes: ["missing-turnstile-token"],
    };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const response = await fetch(SITEVERIFY_URL, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  const result = (await response.json()) as TurnstileSiteverifyResponse;

  if (!result.success) {
    return {
      success: false,
      errorCodes: result["error-codes"] ?? ["turnstile-verification-failed"],
    };
  }

  if (result.action && result.action !== expectedAction) {
    return {
      success: false,
      errorCodes: ["turnstile-action-mismatch"],
    };
  }

  return {
    success: true,
    skipped: false as const,
  };
}
