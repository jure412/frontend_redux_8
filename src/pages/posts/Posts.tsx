import { ChangeEvent, FormEvent, useState } from "react";
import { useGetMeQuery } from "../../features/apis/Auth";
import {
  useCreatePostMutation,
  useDeletePostMutation,
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
      skip: isToken,
    }
  );

  console.log({ user, posts });

  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ text: post });
  };

  const content = (
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
          posts[0].map((post: any) => (
            <div
              style={{ background: "grey", padding: "5px", margin: "10px 0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {user.id === post.user.id && (
                  <p
                    style={{
                      color: "#fff",
                      backgroundColor: "red",
                      width: "70px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      deletePost({ id: post.id });
                    }}
                  >
                    Delete
                  </p>
                )}
                <p
                  style={{
                    fontSize: "12px",
                    marginLeft: "auto",
                  }}
                >{`${post.user.firstName} ${post.user.lastName}`}</p>
              </div>
              <p>{post.text}</p>
            </div>
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

  return content;
};
export default Posts;
