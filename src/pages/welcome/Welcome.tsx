import { useGetMeQuery } from "../../features/apis/Auth";

const Welcome = () => {
  const isToken: boolean = localStorage.getItem("token") ? false : true;
  const { data: user, isSuccess } = useGetMeQuery(
    {},
    {
      skip: isToken,
    }
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
export default Welcome;
