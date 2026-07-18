"use client";

import dynamic from "next/dynamic";

export const ContactFormWrapper = dynamic(() => import("./ContactForm"), { ssr: false });
