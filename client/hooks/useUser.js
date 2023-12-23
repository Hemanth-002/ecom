import { useQuery } from "@apollo/client"
import { QUERY_USER } from "../graphql/queries/user";

export const useUser = () => {
    const { data } = useQuery(QUERY_USER);
    return data?.authenticatedItem
}
