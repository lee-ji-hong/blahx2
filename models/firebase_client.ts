//실제 로그인까지 가능하도록 연동 이렇게 하려면 실제 firebase에서 사용하는 sdk모듈을 설치해야함
import { getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

/** 환경변수는 node.js이기 때문에 서버에서 사용할 수 있고, 클라이언트에서 바로 접근할 수 없기 때문에 config 설정을 해주고
 * 아래처럼 가져와서 쓸 수 있도록 해준다.
 */
const FirebaseCredentials = {
  apiKey: publicRuntimeConfig.publicApiKey,
  authDomain: publicRuntimeConfig.authDomain,
  projectId: publicRuntimeConfig.projectId,
};

/** Firebase의 Authentication 모듈을 사용하기 위해 FirebaseClient 클래스를 정의하는 코드 */
export default class FirebaseClient {
  private static instance: FirebaseClient;

  private auth: Auth;

   /** 이미 초기화된 Firebase 애플리케이션이 있는지 검사하고, 없다면 FirebaseCredentials를 사용하여 Firebase 애플리케이션을 초기화 */
  public constructor() {
     /** 앱이 몇 개 있는지 찾는 것 */
    const apps = getApps();
    if (apps.length === 0) {
      /** 앱이 한 번도 초기화되지 않았다면 초기화를 시작 */
      console.info('firebase client init start');
      initializeApp(FirebaseCredentials);
    }
    /** 초기화가 되었으면 Auth를 가져와서 할당 */
    this.auth = getAuth();
    console.info('firebase auth');
  }

  /*인스턴스를 가져옴 */
  public static getInstance(): FirebaseClient {
    if (FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
      FirebaseClient.instance = new FirebaseClient();
    }
    return FirebaseClient.instance;
  }

  /*auth를 반환*/
  public get Auth(): Auth {
    return this.auth;
  }
}
