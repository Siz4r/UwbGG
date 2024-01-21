import {Button, Card, CardContent, Typography,} from "@mui/material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {Invitation} from "../../store/Invitations/types";
import {useAppDispatch} from "../hooks/reduxHooks";
import React, {useState} from "react";
import {acceptInvitation, rejectInvitation,} from "../../store/Invitations/api";
import {parseErrorToString} from "../parseErrorToString";
import {getFriends} from "../../store/Friends/api";

type Props = {
  inv: Invitation;
  handleAccept: (text: string) => void;
};

export const InvitationTab = (props: Props) => {
  const { senderNick, id, sendDate } = props.inv;
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();

  const accept = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(acceptInvitation(id));

      if (acceptInvitation.rejected.match(result)) {
        throw result.payload;
      }

      dispatch(getFriends())
    } catch (e) {
      parseErrorToString(e, setFormError);
    }
    props.handleAccept("Invitation accepted!");
  };

  const reject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(rejectInvitation(id));

      if (rejectInvitation.rejected.match(result)) {
        throw result.payload;
      }
    } catch (e) {
      parseErrorToString(e, setFormError);
    }

    props.handleAccept("Invitation rejected!");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Invitation from {senderNick}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {"Send: " + sendDate}
        </Typography>
        <Button onClick={(e) => accept(e)}>
          <ThumbUpIcon />
        </Button>
        <Button onClick={(e) => reject(e)}>
          <ThumbDownAltIcon />
        </Button>
        {formError ? (
          <p color="red" className="mt-2 mb-0 w-100 text-center">
            {formError}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
};
