type Props = {
    children: React.ReactNode;
};

export const AuthenticatedView = (props: Props) => {
    const { user, loading } = useSelectUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (loading || isBoolean(user)) {
            navigate(RouterPathsKeys.SIGN_IN);
        }
    }, []);

    if (loading || isBoolean(user)) {
        return null;
    }

    return (
        <div className={classes.container}>
            <NavBar />
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};