import { useRouter } from "next/router";
import Reset from "../components/Reset.js";

const reset = () => {
  const router = useRouter();
  if (!router.query.token) return <p>Sorry You have no access to this page</p>;
  return <Reset />;
};

export default reset;
