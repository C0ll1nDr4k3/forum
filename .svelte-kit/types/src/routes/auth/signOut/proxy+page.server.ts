// @ts-nocheck
import type { Actions } from "@sveltejs/kit";
import { signOut } from "../../../auth";

export const actions = { default: signOut };
;null as any as Actions;