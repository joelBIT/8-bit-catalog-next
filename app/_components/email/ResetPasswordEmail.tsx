import { Section, Row, Text } from "@react-email/components";

/**
 * This email is sent to the email address supplied when requesting a new password.
 */
export default function ResetPasswordEmail(password: string) {
    return (
        <Section>
            <Section>
                <Row>
                    <Text style={{ fontSize: "2rem", fontWeight: "800" }}>
                        The 8-bit Catalog
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                        Hi! You requested a new password which is: {password}
                    </Text>
                </Row>
            </Section>
        </Section>
    );
}