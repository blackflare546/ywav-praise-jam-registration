import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/admin", "/scan"];

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},

				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);

					response = NextResponse.next({
						request,
					});

					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	const isProtected = PROTECTED_ROUTES.some((route) =>
		pathname.startsWith(route),
	);

	// Not logged in
	if (isProtected && !user) {
		const url = request.nextUrl.clone();

		url.pathname = "/login";

		return NextResponse.redirect(url);
	}

	// Already logged in
	if (pathname === "/login" && user) {
		const url = request.nextUrl.clone();

		url.pathname = "/admin";

		return NextResponse.redirect(url);
	}

	return response;
}
