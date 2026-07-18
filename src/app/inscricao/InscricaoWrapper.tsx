"use client";

import dynamic from "next/dynamic";

export const InscricaoWrapper = dynamic(() => import("./InscricaoClient"), { ssr: false });
