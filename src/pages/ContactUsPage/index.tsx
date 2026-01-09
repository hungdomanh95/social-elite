import React, { useMemo, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import * as S from "./contact.styled";
import { Container } from "@/shared/components/Container";

type Payload = {
  name: string;
  email: string;
  message: string;
};

type Props = {
  onSubmit?: (payload: Payload) => void | Promise<void>;
};

export default function ContactPage({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Payload>({ name: "", email: "", message: "" });

  const cards = useMemo(
    () => [
      {
        icon: MapPin,
        title: "Address",
        lines: ["2nd Floor, No. 1", "3/2 Street, Ward 11", "District 10, Ho Chi Minh City"],
      },
      {
        icon: Phone,
        title: "Phone",
        lines: ["(+84) 2873023999"],
      },
      {
        icon: Mail,
        title: "Email",
        lines: ["hello@socialelite.io"],
      },
    ],
    []
  );

  const setField = (key: keyof Payload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      await onSubmit?.(form);
      // UI-only: nếu chưa có API thì cứ reset nhẹ
      setForm({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Page>
      <Container>
        <S.Hero>
          <S.Kicker>CONTACT US</S.Kicker>
          <S.Title>Get In Touch</S.Title>
          <S.Lead>
            Ready to elevate your brand with influencer marketing and social commerce?
          </S.Lead>
          <S.Lead>
             We&apos;d love to hear from you.
          </S.Lead>
        </S.Hero>

        <S.Cards>
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <S.InfoCard key={c.title}>
                <S.IconBubble aria-hidden="true">
                  <Icon size={22} />
                </S.IconBubble>

                <S.CardTitle>{c.title}</S.CardTitle>

                <S.CardLines>
                  {c.lines.map((t, idx) => (
                    <S.CardLine key={idx}>{t}</S.CardLine>
                  ))}
                </S.CardLines>
              </S.InfoCard>
            );
          })}
        </S.Cards>

        <S.Panel>
          <S.PanelInner>
            <S.PanelTitle>
              Let&apos;s Own The Game <span>Together</span>
            </S.PanelTitle>
            <S.PanelLead>
              Whether you&apos;re a brand looking to scale or a creator ready to monetize, Social Elite is here to help you
              succeed.
            </S.PanelLead>

            <S.Form onSubmit={submit}>
              <S.Row>
                <S.Field>
                  <S.Label>name</S.Label>
                  <S.Control>
                    <S.Input
                      value={form.name}
                      onChange={setField("name")}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </S.Control>
                </S.Field>

                <S.Field>
                  <S.Label>email</S.Label>
                  <S.Control>
                    <S.Input
                      value={form.email}
                      onChange={setField("email")}
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </S.Control>
                </S.Field>
              </S.Row>

              <S.Field>
                <S.Label>message</S.Label>
                <S.Control>
                  <S.Input
                    value={form.message}
                    onChange={setField("message")}
                    placeholder="Tell us what you need help with"

                  />
                </S.Control>
              </S.Field>

              <S.Actions>
                <S.Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Us a Message"}
                </S.Button>
              </S.Actions>
            </S.Form>
          </S.PanelInner>
        </S.Panel>

        <S.BottomSpace />
      </Container>
    </S.Page>
  );
}
