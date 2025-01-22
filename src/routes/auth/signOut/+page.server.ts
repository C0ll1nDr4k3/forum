import type { Actions } from "@sveltejs/kit";
import { signOut } from "../../../auth";

export const actions: Actions = { default: signOut };
