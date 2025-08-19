import { useEffect, useState } from "react";

export default function useResendTimer(initial = 0) {
  const [resendTimeout, setResendTimeout] = useState(initial);
  useEffect(() => {
    if (!resendTimeout) return;
    const t = setInterval(() => setResendTimeout((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendTimeout]);
  return { resendTimeout, setResendTimeout };
}
