import { Flex, Box, Heading, Center } from '@chakra-ui/react';
import { NextPage } from 'next';

import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';

const IndexPage: NextPage = function () {
  return (
    <ServiceLayout title="title">
      <Box maxWidth="md" mx="auto">
        <img src="/main_logo.svg" alt="메인 로고" />
        <Flex justify="center">
          <Heading>#BlahBlah</Heading>
        </Flex>
      </Box>
      <Center>
        <GoogleLoginButton />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
