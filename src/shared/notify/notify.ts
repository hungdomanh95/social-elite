export type NotifyType = "success" | "error" | "info";

export type NotifyPayload = {
  id: string;
  type: NotifyType;
  message: string;
  createdAt: number;
  durationMs?: number;
};

type Listener = (payload: NotifyPayload) => void;

const listeners = new Set<Listener>();

function emit(payload: NotifyPayload) {
  listeners.forEach((fn) => fn(payload));
}

export function subscribeNotify(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn); // ✅ không return boolean
  };
}
function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const notify = {
  emit,

  success(message: string, durationMs = 2200) {
    emit({ id: makeId(), type: "success", message, createdAt: Date.now(), durationMs });
  },

  error(message: string, durationMs = 2600) {
    emit({ id: makeId(), type: "error", message, createdAt: Date.now(), durationMs });
  },

  info(message: string, durationMs = 2200) {
    emit({ id: makeId(), type: "info", message, createdAt: Date.now(), durationMs });
  },
};
