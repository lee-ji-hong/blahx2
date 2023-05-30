import { Flex, Box, Heading, Center } from '@chakra-ui/react';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import { useAuth } from '@/contexts/auth_user.context';
import { NextPage } from 'next/types';



const IndexPage: NextPage = function () {
  const { signInWithGoogle } = useAuth();
  return (
    <ServiceLayout title="test" height="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt='10'>
        <img src="/main_logo.svg" alt="메인 로고" />
        <Flex justify="center">
          <Heading>#BlahBlah</Heading>
        </Flex>
      </Box>
      <Center marginTop="20">
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
