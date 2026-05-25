"use client";

import { useState } from "react";

export const EyeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
    />
    <circle cx="12" cy="12" r="3" strokeWidth={2} />
  </svg>
);

export const EyeClosedIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58M9.88 5.09A9.77 9.77 0 0112 4.85c6 0 9.75 7.15 9.75 7.15a18.5 18.5 0 01-2.28 3.04M6.61 6.61C3.85 8.36 2.25 12 2.25 12s3.75 7.15 9.75 7.15a9.9 9.9 0 004.39-1.01"
    />
  </svg>
);
