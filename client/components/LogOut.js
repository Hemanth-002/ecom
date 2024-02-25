import React from "react";
import Router from "next/router";
import { deleteCookie } from "cookies-next";
import { useMutation } from "@apollo/client";
import { SIGNOUT_MUTATION } from "../graphql/mutation/signOut";
import { QUERY_USER } from "../graphql/queries/user";
import { MyUser } from "../context/user";

const LogOut = () => {
  const { setUser } = MyUser();
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: QUERY_USER }],
  });

  const handleSignOut = async () => {
    try {
      await signOut(); // Execute the sign out mutation
      deleteCookie("userId");
      setUser(""); // Update user context
    } catch (e) {
      alert("Can't log out");
    }
    Router.push("/");
  };

  return <div onClick={handleSignOut}>Sign Out</div>;
};

export default LogOut;
