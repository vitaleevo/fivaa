"use client";

import dynamic from "next/dynamic";

export const OradoresWrapper = dynamic(() => import("./OradoresClient"), { ssr: false });
