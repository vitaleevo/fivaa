"use client";

import dynamic from "next/dynamic";

export const MensagensWrapper = dynamic(() => import("./MensagensClient"), { ssr: false });
