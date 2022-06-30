import { ChangeEvent, FormEvent, useState } from "react";
import PostBox from "../../components/PostBox";
import { useGetMeQuery } from "../../features/apis/Auth";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../../features/apis/Post";

const Posts = () => {
  const isToken: boolean = localStorage.getItem("token") ? false : true;
  const [post, setPost] = useState("");
  const [take, setTake] = useState<number>(5);
  const { data: user } = useGetMeQuery(
    {},
    {
      skip: isToken,
    }
  );
  const { data: posts, isSuccess: postsSuccess }: any = useGetPostsQuery(
    {
      skip: take - 5,
      take: 5,
    },
    {
      skip: !user,
    }
  );

  const [createPost] = useCreatePostMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ text: post });
  };

  return (
    <section className="Posts">
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="text">Post</label>
          <input
            type="text"
            value={post}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPost(e.target.value)
            }
            style={{ margin: "10px 0" }}
          />
          <button>Submit</button>
        </form>
      </div>
      <div style={{ marginTop: "50px" }}>
        {postsSuccess &&
          posts[0].map((post: any, i: number) => (
            <PostBox key={i} post={post} />
          ))}
      </div>
      {posts && (
        <div>
          {posts[1] > take && (
            <button onClick={() => setTake((prev: number) => prev + 5)}>
              +
            </button>
          )}
          {take > 5 && (
            <button onClick={() => setTake((prev: number) => prev - 5)}>
              -
            </button>
          )}
        </div>
      )}
    </section>
  );
};
export default Posts;
