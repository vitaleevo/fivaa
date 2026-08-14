"use client";

import dynamic from "next/dynamic";

export const BilhetesAdminWrapper = dynamic(() => import("./BilhetesAdminClient"), { ssr: false });
