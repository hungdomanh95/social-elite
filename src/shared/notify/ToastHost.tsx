import { useEffect, useState } from "react";
import { notify, subscribeNotify, type NotifyPayload } from "./notify";

type ToastItem = NotifyPayload;

export default function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    return subscribeNotify((payload) => {
      setItems((prev) => [payload, ...prev].slice(0, 4));

      const ms = payload.durationMs ?? 2400;
      window.setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== payload.id));
      }, ms);
    });
  }, []);

  return (
    <div style={wrapStyle}>
      {items.map((t) => (
        <div key={t.id} style={{ ...toastStyle, ...typeStyle[t.type] }}>
          {t.message}
        </div>
      ))}

      {/* debug quick test (xoá khi xong) */}
      {/* <button onClick={() => notify.error("Test error")}>Test</button> */}
    </div>
  );
}

const wrapStyle: React.CSSProperties = {
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none",
};

const toastStyle: React.CSSProperties = {
  pointerEvents: "none",
  minWidth: 240,
  maxWidth: 360,
  padding: "12px 14px",
  borderRadius: 12,
  fontSize: 14,
  lineHeight: 1.35,
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  backdropFilter: "blur(6px)",
};

const typeStyle: Record<string, React.CSSProperties> = {
  success: { background: "rgba(34,197,94,0.92)", color: "#06210f" },
  error: { background: "rgba(239,68,68,0.92)", color: "#2a0707" },
  info: { background: "rgba(59,130,246,0.92)", color: "#07162a" },
};
