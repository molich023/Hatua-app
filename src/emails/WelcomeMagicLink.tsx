import {
  Body, Container, Head, Heading, Html, 
  Img, Link, Preview, Section, Text, Tailwind 
} from "@react-email/components";

interface WelcomeEmailProps {
  url: string;
}

export const WelcomeMagicLink = ({ url }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your HATUA Magic Link is here! 🦁</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-10 px-4">
          <Section className="text-center">
            {/* Replace with your actual Netlify logo URL */}
            <Img 
              src="https://img.icons8.com/color/96/lion.png" 
              width="64" height="64" 
              alt="HATUA Logo" 
              className="mx-auto mb-4"
            />
            <Heading className="text-2xl font-bold text-[#2D3436]">
              Welcome to the Pride!
            </Heading>
            <Text className="text-gray-600 text-lg">
              You're one click away from tracking your steps and earning points.
            </Text>
            
            <Section className="my-8">
              <Link
                href={url}
                className="bg-[#F1C40F] text-[#2D3436] px-8 py-4 rounded-full font-bold text-lg no-underline inline-block shadow-lg"
              >
                Sign into HATUA ➔
              </Link>
            </Section>

            <Text className="text-gray-400 text-sm italic">
              Note: This link expires in 24 hours. If you didn't request this, you can safely ignore it.
            </Text>
          </Section>

          <Section className="mt-10 border-t border-gray-100 pt-6 text-center">
            <Text className="text-gray-400 text-xs">
              HATUA Fitness • 10km = 10 Points • Nairobi, Kenya
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
