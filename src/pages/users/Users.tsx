import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../features/apis/User";

const Users = () => {
  const navigate = useNavigate();
  const { data, isSuccess }: any = useGetUsersQuery(
    {},
    { skip: !localStorage.getItem("token") }
  );

  console.log({ data });

  const content = (
    <section className="Users">
      <div>
        {isSuccess &&
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
