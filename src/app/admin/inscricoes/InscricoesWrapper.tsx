"use client";

import dynamic from "next/dynamic";

export const InscricoesWrapper = dynamic(() => import("./InscricoesClient"), { ssr: false });
