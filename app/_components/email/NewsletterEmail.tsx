import { Section, Row, Text } from "@react-email/components";

/**
 * This email is sent to the email addresses subscribed for the newsletter.
 */
export default function NewsletterEmail(text: string) {
    return (
        <Section>
            <Section>
                <Row>
                    <Text style={{ fontSize: "2rem", fontWeight: "800" }}>
                        The 8-bit Catalog Newsletter
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                        { text }
                    </Text>
                </Row>
            </Section>
        </Section>
    );
}