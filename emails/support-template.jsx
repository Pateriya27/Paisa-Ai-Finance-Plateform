import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function SupportEmailTemplate({
  userName = "",
  userEmail = "",
  subject = "",
  message = "",
  testModeInfo = "",
}) {
  return (
    <Html>
      <Head />
      <Preview>Support Request from {userName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.title}>Support Request</Heading>
          <Text style={styles.text}>A user has submitted a support request:</Text>
          
          <Section style={styles.section}>
            <Text style={styles.sectionTitle}>User Information</Text>
            <Text style={styles.text}>
              <strong>Name:</strong> {userName}
            </Text>
            <Text style={styles.text}>
              <strong>Email:</strong> {userEmail}
            </Text>
          </Section>
          
          <Section style={styles.section}>
            <Text style={styles.sectionTitle}>Request Details</Text>
            <Text style={styles.text}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={styles.text}>
              <strong>Message:</strong>
            </Text>
            <Text style={styles.messageText}>{message}</Text>
          </Section>
          
          {testModeInfo && (
            <Section style={styles.testModeSection}>
              <Text style={styles.testModeText}>
                <strong>TEST MODE</strong>: This is a test email. {testModeInfo}
              </Text>
            </Section>
          )}
          
          <Text style={styles.footer}>
            This email was automatically generated from the Paisa support form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 20px",
  },
  sectionTitle: {
    color: "#1f2937",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 12px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 12px",
  },
  messageText: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "8px 0 16px",
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
    whiteSpace: "pre-wrap",
  },
  section: {
    marginTop: "24px",
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  testModeSection: {
    marginTop: "24px",
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "#fff0f0",
    borderRadius: "5px",
    border: "1px solid #ffcccc",
  },
  testModeText: {
    color: "#e02424",
    fontSize: "16px",
    margin: "0",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
}; 