export function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    ""
  )
    .split(",")[0]
    .trim();
}

export function getSubmissionSecret() {
  return (
    process.env.FIVAA_FORM_SUBMISSION_SECRET ??
    process.env.FORM_SUBMISSION_SECRET ??
    ""
  ).trim();
}

export function getErrorStatus(message: string) {
  if (message.includes("Muitas tentativas")) {
    return 429;
  }

  if (
    message.includes("inválid") ||
    message.includes("Verificação") ||
    message.includes("Submiss") ||
    message.includes("Bilhete") ||
    message.includes("Origem")
  ) {
    return 400;
  }

  if (message.includes("indisponíveis")) {
    return 503;
  }

  return 500;
}
