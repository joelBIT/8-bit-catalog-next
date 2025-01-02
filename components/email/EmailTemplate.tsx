import { Section, Row, Text, Column, Link, Img } from "@react-email/components";

export default function EmailTemplate() {

    return (
        <Section>
            <Section>
                <Row>
                    <Text style={{ fontSize: "2rem", fontWeight: "800" }}>
                        Failed login attempt
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: "1.3rem"}}>
                        Failed login attempt on 8bit Catalog
                    </Text>
                </Row>
            </Section>
            <Section>
                <Row>
                    <Column>
                        <Link href="#">
                            <Img
                                alt="TRAINO logo"
                                height={80}
                                src="https://res.cloudinary.com/dcm59rrie/image/upload/v1735830114/le4gc0ag5njk8mgnkfde.png"
                            />
                        </Link>
                    </Column>
                </Row>
            </Section>
        </Section>
    );
}