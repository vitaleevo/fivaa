"use client";

import dynamic from "next/dynamic";

export const TestemunhosAdminWrapper = dynamic(() => import("./TestemunhosAdminClient"), { ssr: false });
