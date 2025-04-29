import { useSelector } from "react-redux";

const useCurrentUser = () => {
  const { user, status, error } = useSelector((state) => state.userLogIn);
  return { user, status, error };
};

export default useCurrentUser;
