import { useContext } from "react";
import { UsersnapContext } from "./UsersnapContext";

export function useUsersnapApi() {
	return useContext(UsersnapContext);
}
