import {useAppDispatch, useAppSelector} from "../reduxHooks";
import {useEffect} from "react";
import {getFriends} from "../../../store/Friends/api";

type Props = {
    fetchOnMount?: boolean;
};
export const useFriends = (props: Props) => {
    const dispatch = useAppDispatch();

    const { isLoading, friends } = useAppSelector(({ friends }) => {
        return friends;
    });

    useEffect(() => {
        if (props.fetchOnMount) {
            dispatch(getFriends());
        }
    }, [dispatch, props.fetchOnMount]);

    return {
        isLoading: isLoading,
        friends: friends,
    };
}