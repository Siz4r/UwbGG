import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { useEffect } from "react";
import { getInvitations } from "../../../store/Invitations/api";

type Props = {
  fetchOnMount?: boolean;
};
export const useInvitations = (props: Props) => {
  const dispatch = useAppDispatch();

  const { loading, invitations } = useAppSelector(({ invitations }) => {
    return invitations;
  });

  useEffect(() => {
    if (props.fetchOnMount) {
      dispatch(getInvitations());
    }
  }, [dispatch, props.fetchOnMount]);

  return {
    isLoading: loading,
    invitations: invitations,
  };
};
