import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InviteAdminProps {
  inviteLink: string;
}

export const InviteAdminEmail = ({
  inviteLink = "spotify.knowingly.co/create/foo-bar-baz",
}: InviteAdminProps) => {
  const knowinglyBanner = "https://knowingly.ai/banner.png";
  return (
    <Html>
      <Head />
      <Preview>{`Create a hub on Knowingly`}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="">
              <Img
                src={knowinglyBanner}
                width="500"
                height="150"
                alt="Knowingly Banner"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Create a hub on <strong>Knowingly</strong>
            </Heading>
            <Text className="text-[20px] leading-[24px] text-black">
              Hello!
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You have been invited to create a hub on Knowingly!
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Create Hub
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser: <br />
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Should you have any questions or require assistance, our dedicated
              support team is at your service.
              <br />
              Simply hit <strong>reply</strong> to this email, and we'll be
              right there to assist you.
              <br />
              We're eagerly anticipating your arrival and the exciting knowledge
              journey that awaits
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>Regards,</strong>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>Knowingly Team </strong>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteAdminEmail;
