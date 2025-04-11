import { URL_ACTIVATION_PAGE } from "@/utils/utils";
import { Section, Row, Text, Link } from "@react-email/components";

/**
 * This email is sent to the email address used when registering for an account. The supplied link must be clicked in order for the
 * newly created account to be activated. After that it is possible to login to the account.
 */
export default function ActivationEmail(activationCode: string) {
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
                        Please click on the following link to verify your email: <Link href={`${process.env.DOMAIN_URL}${URL_ACTIVATION_PAGE}/${activationCode}`}> verify </Link>
                    </Text>
                </Row>
            </Section>
        </Section>
    );
}