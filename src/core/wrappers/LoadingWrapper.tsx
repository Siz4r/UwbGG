import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};
export const LoadingWrapper = (props: Props) => {
  return props.isLoading ? <CircularProgress /> : <>{props.children}</>;
};
