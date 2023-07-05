import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectMeResult } from "../../features/apis/Auth";
import { useLikeToggleMutation } from "../../features/apis/Like";
import { useGetPostsQuery } from "../../features/apis/Post";
import { useGetUserQuery } from "../../features/apis/User";

const User = () => {
  const { id } = useParams<{ id: string }>();
  const [take, setTake] = useState<number>(5);
  const [likeToggle] = useLikeToggleMutation();
  const { data: me } = useAppSelector<any>(selectMeResult);
  const { data: user, isSuccess }: any = useGetUserQuery({ id }, { skip: !me });

  const { data: posts, isSuccess: postsSuccess }: any = useGetPostsQuery(
    {
      skip: take - 5,
      take: 5,
      userId: id,
    },
    {
      skip: !user,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <div>
        {isSuccess && postsSuccess && (
          <>
            <p>{`Id: ${user.id}`}</p>
            <p>{`Full name: ${user.firstName} ${user.lastName}`}</p>
            <p>{`Email: ${user.email}`}</p>
            <p>{`Post Count: ${posts[1]}`}</p>
          </>
        )}
      </div>
      <section className="Posts">
        <div style={{ marginTop: "50px" }}>
          {postsSuccess &&
            posts[0].map((post: any, i: number) => (
              <div
                key={i}
                style={{ background: "grey", padding: "5px", margin: "10px 0" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      marginLeft: "auto",
                    }}
                  >{`${post.user.firstName} ${post.user.lastName}`}</p>
                </div>
                <p>{post.text}</p>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <span
                    style={{
                      color: post.isLikedByMe ? "blue" : "lightGrey",
                      marginLeft: "auto",
                    }}
                    onClick={() => likeToggle({ postId: post.id })}
                  >
                    Like
                  </span>
                  <span
                    style={{
                      color: "blue",
                      marginLeft: "10px",
                      background: "white",
                      padding: "0 5px",
                    }}
                  >
                    {`${post.likeCount}`}
                  </span>
                </div>
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
    </>
  );
};
export default User;
