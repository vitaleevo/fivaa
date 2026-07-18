"use client";

import dynamic from "next/dynamic";

export const TestemunhosWrapper = dynamic(() => import("./TestemunhosClient"), { ssr: false });
