import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Img,
  Preview,
} from "@react-email/components";
import type { ReactNode } from "react";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
  lang?: "de" | "en";
}

export function EmailLayout({
  preview,
  children,
  lang = "de",
}: EmailLayoutProps) {
  return (
    <Html lang={lang}>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: "#FAF7F2",
          fontFamily:
            "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#C2703E",
              padding: "24px 32px",
              textAlign: "center" as const,
            }}
          >
            <Img
              src={`${process.env.NEXT_PUBLIC_BASE_URL || "https://villa-gloria.com"}/images/hero/villa-pool-seaview.jpg`}
              alt="Villa Gloria al Padre"
              width="120"
              height="80"
              style={{
                borderRadius: "8px",
                margin: "0 auto 12px",
              }}
            />
            <Text
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "700",
                fontFamily: "'Playfair Display', Georgia, serif",
                margin: 0,
              }}
            >
              Villa Gloria al Padre
            </Text>
          </Section>

          {/* Content */}
          <Section style={{ padding: "32px" }}>{children}</Section>

          {/* Footer */}
          <Hr style={{ borderColor: "#e8e0d5", margin: "0 32px" }} />
          <Section
            style={{
              padding: "24px 32px",
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                color: "#8a8175",
                fontSize: "12px",
                lineHeight: "18px",
                margin: 0,
              }}
            >
              Villa Gloria al Padre · Kaštelir, Istrien · Kroatien
              <br />
              info@villa-gloria.com
            </Text>
            <Text
              style={{
                color: "#8a8175",
                fontSize: "11px",
                margin: "8px 0 0",
              }}
            >
              {lang === "de"
                ? "Diese E-Mail wurde automatisch versendet."
                : "This email was sent automatically."}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
