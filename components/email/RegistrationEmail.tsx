import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface Props {
    name: string;
    ministries: string[];
    qrImage: string;
}

export default function RegistrationEmail({
    name,
    ministries,
    qrImage,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                Youth Praise Jam Registration
            </Preview>

            <Body
                style={{
                    fontFamily: "Arial",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: 30,
                        borderRadius: 12,
                    }}
                >
                    <Heading>
                        🎉 Registration Successful
                    </Heading>

                    <Text>
                        Hi <strong>{name}</strong>,
                    </Text>

                    <Text>
                        Thank you for registering for our
                        Youth Praise Jam.
                    </Text>

                    <Text>
                        Ministries:
                    </Text>

                    <ul>
                        {ministries.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <Section
                        style={{
                            textAlign: "center",
                            marginTop: 30,
                        }}
                    >
                        <Img
                            src={qrImage}
                            width="220"
                            height="220"
                        />
                    </Section>

                    <Text>
                        Please present this QR Code during
                        registration for attendance.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}