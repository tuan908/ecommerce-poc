import {env} from "@/env";
import {jwtVerify} from "jose";
import type {Session} from "../types/session";

export async function decrypt(input: string) {
	try {
		const {payload} = await jwtVerify(input, getJwtSecretKey());
		return payload as Session;
	} catch {
		return undefined;
	}
}

function getJwtSecretKey(): Uint8Array {
	const sessionSecret = env.JWT_TOKEN_SECRET;

	if (!sessionSecret) {
		throw new Error("JWT Secret key is not defined");
	}
	return new TextEncoder().encode(sessionSecret);
}
