import { useMutation } from "@apollo/client";
import React from "react";
import { SIGNOUT_MUTATION } from "../graphql/mutation/signOut";
import { QUERY_USER } from "../graphql/queries/user";

const LogOut = () => {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  return <div onClick={signOut}>Sign Out</div>;
};

export default LogOut;
