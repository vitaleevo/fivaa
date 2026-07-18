"use client";

import dynamic from "next/dynamic";

export const AdminDashboardWrapper = dynamic(() => import("./AdminDashboardClient"), { ssr: false });
