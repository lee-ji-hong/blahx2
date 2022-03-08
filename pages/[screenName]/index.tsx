import { GetServerSideProps, NextPage } from 'next';
import { Avatar, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Head from 'next/head';
import getConfig from 'next/config';
import { InMemberInfo } from '@/models/member/in_member_info';
import getStringValueFromQuery from '@/utils/get_value_from_query';
import { memberFindByScreenNameForClient } from '@/models/member/member.client.service';
import { ServiceLayout } from '@/components/containers/service_layout';
import DefaultPanel from '@/components/default_panel';
import InstantPanel from '@/components/instant_panel';

/**
 * 각 사용자의 home
 * 프로필 이미지, 닉네임, id가 출력
 * 질문을 작성할 수 있는 text area
 *
 * 기존에 대답한 내용이 아래쪽에 보여짐
 * 각 질문에서 답변 보기를 클릭하면 상세 화면으로 진입
 */

interface Props {
  userInfo: InMemberInfo | null;
}

const UserHomePage: NextPage<Props> = function ({ userInfo }) {
  const { publicRuntimeConfig } = getConfig();
  if (userInfo === null) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }
  const mainUrl = `https://${publicRuntimeConfig.mainDomain}/${userInfo.screenName}`;
  return (
    <>
      <Head>
        <meta property="og:url" content={mainUrl} />
        <meta property="og:image" content={`https://${publicRuntimeConfig.mainDomain}/main.jpg`} />
        <meta property="og:site_name" content="blahX2" />
        <meta property="og:title" content={`${userInfo.displayName} 님에게 질문하기`} />
        <meta property="og:description" content={`${userInfo.displayName}님과 익명으로 대화를 나눠보세요`} />
        <meta name="twitter:title" content={`${userInfo.displayName} 님에게 질문하기`} />
        <meta name="twitter:description" content={`${userInfo.displayName}님과 익명으로 대화를 나눠보세요`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://${publicRuntimeConfig.mainDomain}/main.jpg`} />
        <meta name="twitter:image:alt" content="blahX2" />
        <meta name="twitter:url" content={mainUrl} />
        <meta name="twitter:domain" content={publicRuntimeConfig.mainDomain} />
      </Head>
      <ServiceLayout backgroundColor="gray.200">
        <Box maxW="md" mx="auto" pt="6">
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="4" bg="white">
            <Box display="flex" p="6">
              <Avatar size="lg" src={userInfo.photoURL?.replace('_normal', '')} mr="2" />
              <Flex direction="column" justify="center">
                <Text fontSize="md">{userInfo.displayName}</Text>
                <Text fontSize="xs">@{userInfo.screenName}</Text>
              </Flex>
            </Box>
          </Box>
          <Tabs isFitted variant="soft-rounded">
            <TabList>
              <Tab>상시 질문</Tab>
              <Tab>즉석 목록</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <DefaultPanel userInfo={userInfo} />
              </TabPanel>
              <TabPanel px="0">
                <InstantPanel userInfo={userInfo} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </ServiceLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const screenName = getStringValueFromQuery({ query, field: 'screenName' });
  if (screenName === undefined) {
    return {
      props: {
        userInfo: null,
      },
    };
  }
  try {
    const userInfo = await memberFindByScreenNameForClient({ isServer: true, screenName });
    return {
      props: {
        userInfo: userInfo.payload ?? null,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

export default UserHomePage;
