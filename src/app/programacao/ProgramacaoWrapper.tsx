"use client";

import dynamic from "next/dynamic";

export const ProgramacaoWrapper = dynamic(() => import("./ProgramacaoClient"), { ssr: false });
