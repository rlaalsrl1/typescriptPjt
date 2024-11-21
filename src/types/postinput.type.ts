export type Post = {
  /**작성한 게시글 내용 */
  post: string;
  /**게시글 작성 시간(UTC) */
  createAt: number;
  /**작성자 닉네임 */
  nickName: string;
  /**작성자 Id */
  userId: string;
};
