import React, { useMemo, useState } from "react";
import Platform from "./section/Platform";

type SocialType = "linkedin" | "facebook" | "instagram" | "tiktok";

type FooterProps = {
  brandText?: string; // socialelite
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
  socials?: Array<{ type: SocialType; href: string }>;

  // Contact form (sau này gọi API)
  onSubmitContact?: (payload: {
    name: string;
    email: string;
    message: string;
  }) => void | Promise<void>;
};

export default function Footer(props: FooterProps) {
  const brandText = props.brandText ?? "socialelite";
  const contact = props.contact ?? {
    email: "hello@socialelite.io",
    phone: "(+84) 2873023999",
    address: "No. 1, 3/2 Street, Ward 11, District 10, HCMC",
  };

  const socials = props.socials ?? [
    { type: "linkedin", href: "#" },
    { type: "facebook", href: "#" },
    { type: "instagram", href: "#" },
    { type: "tiktok", href: "#" },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const yearText = useMemo(() => new Date().getFullYear(), []);

  const submit = async () => {
    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) return;

    try {
      setSubmitting(true);
      await props.onSubmitContact?.(payload);
      // reset (mock)
      setName("");
      setEmail("");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* ===== Platform Block ===== */}

      <Platform/>
      {/* ===== Contact Block ===== */}
      {/* ===== Footer Block ===== */}
    </div>
  );
}
