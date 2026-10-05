"use client";

import { AnimatePresence, motion } from "motion/react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";

export default function SubmitSuccessModal({
  open,
  onClose,
  onBackToLogin,
}: {
  open: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0, 0, 0, 0.55)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] rounded-[6px] p-7"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 24px 60px -16px rgba(0, 0, 0, 0.65)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full"
              style={{ color: "var(--text-faint)" }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "color-mix(in srgb, var(--status-low) 18%, var(--surface))" }}
              >
                <CheckCircleOutlinedIcon sx={{ fontSize: 24, color: "var(--status-low)" }} />
              </span>

              <h2
                className="text-[1.375rem] font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                Congrats on submitting your club page!
              </h2>

              <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We&apos;ll be in contact if we need anything — otherwise we&apos;ll try to review
                your submission quickly. If you ever want to edit your info again, log in with the
                same username and password.
              </p>

              <button
                type="button"
                onClick={onBackToLogin}
                className="mt-2 w-full rounded-[3px] px-5 py-3 text-[0.9375rem] font-semibold transition-opacity duration-150 hover:opacity-85"
                style={{ background: "var(--gold)", color: "var(--gold-contrast)" }}
              >
                Back to login
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
