import React, { useState } from "react";
import * as S from "./contact.styled";

type ContactProps = {
  brandText?: string; // socialelite
  // Contact form (sau này gọi API)
  onSubmitContact?: (payload: {
    name: string;
    email: string;
    message: string;
  }) => void | Promise<void>;
};

const Contact: React.FC<ContactProps> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    <S.ContactBlock>
      <S.Container>
        <S.ContactGrid>
          <S.ContactTitle>
            <S.ContactHeading>Contact Us</S.ContactHeading>
          </S.ContactTitle>

          <S.Form>
            <S.Row2>
              <S.Field>
                <S.Label>name</S.Label>
                <S.Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </S.Field>

              <S.Field>
                <S.Label>email</S.Label>
                <S.Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                />
              </S.Field>
            </S.Row2>

            <S.Field>
              <S.Label>message</S.Label>
              <S.Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you need help with"
              />
            </S.Field>

            <S.Actions>
              <S.SendBtn
                type="button"
                disabled={
                  submitting || !name.trim() || !email.trim() || !message.trim()
                }
                onClick={submit}
              >
                {submitting ? "Sending..." : "Send Us a Message"}
              </S.SendBtn>
            </S.Actions>
          </S.Form>
        </S.ContactGrid>
      </S.Container>
    </S.ContactBlock>
  );
};

export default Contact;
