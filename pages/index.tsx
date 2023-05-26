import { Flex, Box, Heading, Center } from '@chakra-ui/react';
import { NextPage } from 'next';

import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import FirebaseClient from '@/models/firebase_client';

const provider = new GoogleAuthProvider();

const IndexPage: NextPage = function () {

  return (
    <ServiceLayout title="test">
      <Box maxWidth="md" mx="auto">
        <img src="/main_logo.svg" alt="메인 로고" />
        <Flex justify="center">
          <Heading>#BlahBlah</Heading>
        </Flex>
      </Box>
      <Center>
        <GoogleLoginButton onClick={() => {
          signInWithPopup(FirebaseClient.getInstance().Auth, provider)
            .then((result) => {
              console.info(result.user);
            }).catch((error) => {
              console.error(error);
            });
        }} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
