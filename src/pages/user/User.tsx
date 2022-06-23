import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/apis/User";

const User = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isSuccess }: any = useGetUserQuery(
    { id },
    { skip: !localStorage.getItem("token") }
  );

  return (
    <div>
      {isSuccess && (
        <>
          <p>{`Id: ${user.id}`}</p>
          <p>{`Full name: ${user.firstName} ${user.lastName}`}</p>
          <p>{`Email: ${user.email}`}</p>
        </>
      )}
    </div>
  );
};
export default User;
