import React from "react";
import { useQuery } from "@apollo/client";
import Orders from "../components/Orders";
import Spinner from "../components/Spinner";
import { GET_ORDER } from "../graphql/queries/Order";

const order = () => {
  const { loading } = useQuery(GET_ORDER);
  if (loading) return <Spinner />;

  return <Orders />;
};

export default order;
