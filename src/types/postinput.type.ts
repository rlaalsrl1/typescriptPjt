export type IPost = {
  /**작성한 게시글 내용 */
  post: string;
  /**게시글 작성 시간(UTC) */
  createdAt: number;
  /**작성자 닉네임 */
  nickname: string;
  /**작성자 Id */
  userId: string;
// 작성자 email
  email : string;
};
