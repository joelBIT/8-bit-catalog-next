import { Section, Row, Text } from "@react-email/components";

/**
 * This email is sent to an admin email. It contains the message sent from the contact page with the supplied 'email'.
 */
export default function ContactMessageEmail(email: string, name: string, message: string) {
    return (
        <Section>
            <Section>
                <Row>
                    <Text style={{ fontSize: "2rem", fontWeight: "800" }}>
                        Message was sent from { name } with email { email }
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                         { message }
                    </Text>
                </Row>
            </Section>
        </Section>
    );
}