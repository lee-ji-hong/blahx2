import { Box, Button } from '@chakra-ui/react';
import { on } from 'events';

interface Props {
  onClickLogin:() => void;
}

export const GoogleLoginButton = function ({onClickLogin}:Props) {
  return (
    <Box>
      <Button
        size="lg"
        width="full"
        // margin="6"
        borderRadius="full"
        bgColor="#4285f4"
        color="white"
        colorScheme="blue"
        leftIcon={<img src="/google.svg" alt="google 로고" style={{ backgroundColor: 'white', padding: '8px' }} />}
        border="none"
        onClick={onClickLogin}
      >
        Google 계정으로 시작하기
      </Button>
    </Box>
  );
};
