import { useQuery } from "@apollo/client"
import { CREATE_USER } from "../graphql/queries/user";

export const useUser = () => {
    const { data } = useQuery(CREATE_USER);
    return data?.authenticatedItem
}
