"use client";

import dynamic from "next/dynamic";

export const ProgramacaoAdminWrapper = dynamic(() => import("./ProgramacaoAdminClient"), { ssr: false });
