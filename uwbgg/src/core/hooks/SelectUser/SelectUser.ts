import { IuserSlice, UserEntity } from "../../../store/Users/slice";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { isBoolean } from "../../../utils/isCheckers/isBoolean";

export const useSelectUser = () => {
  const user = useSelector<RootState>(({ user }) => user) as IuserSlice;
  let role = "Clients";

  if (!isBoolean(user.user)) {
    role = user.user.role;
  }

  return {
    loading: user.loading,
    isAuthenticated: user as Object,
    user: user.user as UserEntity,
    role: role,
  };
};
