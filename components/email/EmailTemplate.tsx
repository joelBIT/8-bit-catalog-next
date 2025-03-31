import { Section, Row, Text, Column, Link } from "@react-email/components";

export default function EmailTemplate() {

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
                        Please click on the following link to verify your email: <Link href="#"> Activate </Link>
                    </Text>
                </Row>
            </Section>
        </Section>
    );
}