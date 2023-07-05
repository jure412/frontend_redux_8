import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { MsgState, getMsgs, removeMsgs } from "../features/Slices/msgSlice";

export const Msg: FC = () => {
  const msgs = useAppSelector(getMsgs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeId: any;
    if (msgs.length !== 0) {
      timeId = setTimeout(() => {
        dispatch(removeMsgs());
      }, 3000);
    }
    return () => {
      clearTimeout(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  return (
    <div style={{ position: "fixed", right: "10px", bottom: "10px" }}>
      {msgs.map((msg: MsgState, i: number) => (
        <p key={i}>{msg.msg}</p>
      ))}
    </div>
  );
};
