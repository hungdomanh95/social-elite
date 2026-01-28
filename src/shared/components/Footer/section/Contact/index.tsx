import React, { useState } from "react";
import * as S from "./contact.styled";
import { submitContactMessage } from "@/shared/api/cms.api";

type ContactProps = {
  brandText?: string; // socialelite
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC<ContactProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const canSubmit =
    !!name.trim() &&
    !!email.trim() &&
    emailRegex.test(email.trim()) &&
    !!message.trim() &&
    !submitting;

  const submit = async () => {
    setError("");
    setSuccess("");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) return;
    if (!emailRegex.test(payload.email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setSubmitting(true);
      await submitContactMessage(payload);

      setName("");
      setEmail("");
      setMessage("");
      setSuccess("Thanks! We received your message.");
    } catch (e: any) {
      // ưu tiên message từ backend nếu có
      setError(
        e?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.ContactBlock>
      <S.Container>
        <S.ContactTitle>
          <S.ContactHeading>Contact Us</S.ContactHeading>
        </S.ContactTitle>

        <div style={{ display: "flex", flexDirection: "column", width: "55%" }}>
          <S.Row2>
            <S.Field>
              <S.Label>Name</S.Label>
              <S.Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </S.Field>

            <S.Field>
              <S.Label>Email</S.Label>
              <S.Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                autoComplete="email"
              />
            </S.Field>
          </S.Row2>

          <S.Field>
            <S.Label>Message</S.Label>
            <S.Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you need help with"
            />
          </S.Field>

          {(error || success) && (
            <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.35 }}>
              {error ? (
                <div style={{ color: "#d92d20" }}>{error}</div>
              ) : (
                <div style={{ color: "#12b76a" }}>{success}</div>
              )}
            </div>
          )}

          <S.Actions>
            <S.SendBtn type="button" disabled={!canSubmit} onClick={submit}>
              {submitting ? "Sending..." : "Send Us a Message"}
            </S.SendBtn>
          </S.Actions>
        </div>
      </S.Container>
    </S.ContactBlock>
  );
};

export default Contact;
