/*user 정보에서 사용할 데이터 */
export interface InAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}