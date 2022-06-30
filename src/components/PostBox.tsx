import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { useGetMeQuery } from "../features/apis/Auth";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../features/apis/Comment";
import { useLikeToggleMutation } from "../features/apis/Like";
import { useDeletePostMutation } from "../features/apis/Post";

interface PostBoxProps {
  post: any;
}

const PostBox: FC<PostBoxProps> = ({ post }) => {
  const isToken: boolean = localStorage.getItem("token") ? false : true;
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [take, setTake] = useState<number>(5);
  const [createComment] = useCreateCommentMutation();
  const ref = useRef<HTMLDivElement>(null);
  const refDrop = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [dropHeight, setDropHeight] = useState(0);
  const { data: user } = useGetMeQuery(
    {},
    {
      skip: isToken,
    }
  );
  const { data: comments, commentsIsLoading }: any = useGetCommentsQuery(
    {
      skip: take - 5,
      take: 5,
      postId: post.id,
    },
    {
      skip: !commentsIsOpen,
    }
  );

  const [deletePost] = useDeletePostMutation();
  const [likeToggle] = useLikeToggleMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({ text: comment, postId: post.id });
  };

  // eslint-disable-next-line
  useEffect(() => {
    setHeight(ref?.current!.clientHeight);
    setDropHeight(refDrop?.current!.clientHeight);
  });

  return (
    <div
      style={{
        background: "grey",
        overflow: "hidden",
        zIndex: 1,
        position: "relative",
        margin: "30px 0",
        transition: "linear all 0.3s",
        maxHeight:
          height + dropHeight === 0
            ? "auto"
            : commentsIsOpen
            ? `${height + dropHeight}px`
            : `${height}px`,
      }}
    >
      <div
        ref={ref}
        style={{
          zIndex: 100,
          overflow: "hidden",
          position: "relative",
          background: "yellow",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "53px",
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
        <div
          style={{
            display: "flex",
            position: "relative",
            zIndex: 100,
          }}
        >
          <span
            style={{
              color: "blue",
              marginRight: "10px",
            }}
            onClick={() => setCommentsIsOpen(!commentsIsOpen)}
          >
            Comment
          </span>
          <span
            style={{
              color: "blue",
              marginRight: "auto",
              background: "white",
              padding: "0 5px",
            }}
          >
            {`${post.commentCount}`}
          </span>
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

      <div
        ref={refDrop}
        style={{
          transform: `translateY(${commentsIsOpen ? "0%" : "-100%"}) `,
          background: "lightGrey",
          position: "relative",
          transition: "linear transform 0.3s, linear opacity 0.2s",
          zIndex: -1,
          perspective: "1000px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="text">Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setComment(e.target.value)
            }
            style={{ margin: "10px 0" }}
          />
          <button>Submit</button>
        </form>
        <div>
          {commentsIsLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {comments &&
                comments[0].map((post: any, i: number) => {
                  return <div key={i}>{post.text}</div>;
                })}
              {comments && (
                <div>
                  {comments[1] > take && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBox;
