import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectMeResult } from "../../features/apis/Auth";
import { useGetUsersQuery } from "../../features/apis/User";

const Users = () => {
  const navigate = useNavigate();

  const { isSuccess: meIsSuccess }: any = useAppSelector(selectMeResult);
  const { data }: any = useGetUsersQuery({}, { skip: !meIsSuccess });

  const content = (
    <section className="Users">
      <div>
        {data &&
          data[0]?.map((user: any) => (
            <p onClick={() => navigate(`/user/${user.id}`)} key={user.id}>
              {user.email}
            </p>
          ))}
      </div>
    </section>
  );

  return content;
};
export default Users;
