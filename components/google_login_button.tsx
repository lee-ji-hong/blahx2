import { Box, Button } from '@chakra-ui/react';

export const GoogleLoginButton = function () {
  return (
    <Box>
      <Button
        size="lg"
        width="full"
        margin="6"
        borderRadius="20px"
        bgColor="#4285f4"
        color="white"
        colorScheme="blue"
        leftIcon={<img src="/google.svg" alt="google 로고" />}
        border="none"
      >
        Google 계정으로 시작하기
      </Button>
    </Box>
  );
};
