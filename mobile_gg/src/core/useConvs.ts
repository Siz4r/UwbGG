import {useEffect} from "react";
import { getConversations } from '../store/Conversations/api'
import { useAppDispatch, useAppSelector } from './reduxHooks'

type Props = {
    fetchOnMount?: boolean;
};
export const useConvs = (props: Props) => {
    const dispatch = useAppDispatch();

    const { isLoading, convs} = useAppSelector(({ convs }) => {
        return convs;
    });

    useEffect(() => {
        if (props.fetchOnMount) {
            dispatch(getConversations());
        }
    }, [dispatch, props.fetchOnMount]);

    return {
        isLoading: isLoading,
        convs: convs,
    };
}