"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
