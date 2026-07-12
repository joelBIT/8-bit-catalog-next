import { Section, Row, Text, Link } from "@react-email/components";

/**
 * This email is sent to the email address supplied when requesting a new password.
 */
export default function ResetPasswordEmail(url: string, email: string) {
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
                        Hello, 
                        The 8-bit Catalog has received a request to reset the password for the 8-bit Catalog account 
                        associated with {email}.
                        You can change to a new password by clicking on the link below. 
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                        Please click on the following link to change your password: <Link href={`${url}?email=${email}`}> Change Password </Link>
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                        If you did not request a new password, please let me know immediately by sending an email to contact@joel-rollny.eu
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                        You can find answers to many questions and get in touch with me at <Link href={`${process.env.DOMAIN_URL}/contact`}> 8bit-catalog.joel-rollny.eu/contact</Link>. 
                        I am here to help you at any step along the way.
                    </Text>
                </Row>
            </Section>
        </Section>
    );
}