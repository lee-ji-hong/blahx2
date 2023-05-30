
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import FirebaseAdmin from '@/models/firebase_admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid, email, displayName, photoURL } = req.body;

  if (uid === undefined || uid === null) {
    return res.status(400).json({ result: false, message: 'uid가 누락되었습니다.' });
  }

  /*위의 정보를 fireStore에 저장해줌 promise문으로 동작하기 때문에 비동기 처리해줌 */
  try {
    const addResult = await FirebaseAdmin.getInstance()
      .Firebase.collection('members')
      .doc(uid)
      .set({
        uid,
        email: email ?? '',
        displayName: displayName ?? '',
        photoURL: photoURL ?? ''
      });
    return res.status(200).json({ result: true, id: addResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false });
  }
}