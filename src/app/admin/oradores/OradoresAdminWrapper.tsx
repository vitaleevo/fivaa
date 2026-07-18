"use client";

import dynamic from "next/dynamic";

export const OradoresAdminWrapper = dynamic(() => import("./OradoresAdminClient"), { ssr: false });
