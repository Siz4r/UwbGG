import {useAppDispatch, useAppSelector} from "../reduxHooks";
import {useEffect} from "react";
import {getConversations} from "../../../store/Conversations/api";

type Props = {
    fetchOnMount?: boolean;
};
export const useConvs = (props: Props) => {
    const dispatch = useAppDispatch();

    const { isLoading, convs,
        openedConv } = useAppSelector(({ convs }) => {
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
        convData: openedConv
    };
}