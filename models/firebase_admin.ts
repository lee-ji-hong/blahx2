// firebase_admin.ts

import * as admin from 'firebase-admin';

interface Config {
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

/** 싱글톤 패턴을 이용해서 어디서든 같은 인스턴스를 불러낼 수 있도록 한다. */
export default class FirebaseAdmin {
  public static instance: FirebaseAdmin;

  /** 초기화 여부 */
  private init = false;

  /** 인스턴스를 반환하는 메서드 */
  public static getInstance(): FirebaseAdmin {
    if (FirebaseAdmin.instance === undefined || FirebaseAdmin.instance === null) {
      /** 초기화 진행 */
      FirebaseAdmin.instance = new FirebaseAdmin();
      /** 환경을 초기화한다. */
      FirebaseAdmin.instance.bootstrap();
    }
    return FirebaseAdmin.instance;
  }

  /** 환경을 초기화할 때 사용할 메서드 */
  private bootstrap(): void {
    /** 등록되어 있는 앱의 갯수가 0이 아니어야 앱이 존재함을 의미한다. */
    const haveApp = admin.apps.length !== 0;
    if (haveApp) {
      this.init = true;
      return;
    }

    /** config를 활용해서 초기화한다. */
    const config: Config = {
      credential: {
        /** process.env.로 환경변수에 접근하여 각 값들을 받아온다.
         * 각 갑들은 undefined일 수 있으므로, 값이 없을 경우 빈 문자열을 할당한다.
         */
        projectId: process.env.projectid || '',
        clientEmail: process.env.clientEmail || '',

        /**
         * privateKey는 원래 개행이 들어간 여러 줄 짜리 텍스트인데, 반환할 때는 json에서는 그렇게 표현할 수 없기 때문에 한 줄이 된다.
         * 그 한줄짜리 json을 원래대로 개행이 들어가도록 임의로 다시 개행문자를 넣어주는 것이다.
         */
        privateKey: (process.env.privatekey || '').replace(/\\n/g, '\n'),
      },
    };
    admin.initializeApp({ credential: admin.credential.cert(config.credential) });
    console.info('bootstrap firebase admin');
  }

  /** firestore를 반환 */
  public get Firebase(): FirebaseFirestore.Firestore {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.firestore();
  }

  public get Auth(): admin.auth.Auth {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.auth();
  }
}