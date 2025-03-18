import { Resource } from "sst";
import { jsonResponse, unauthorized, forbidden, badRequest } from "./util/response";

export default {
    async fetch(request): Promise<Response> {
        const AuthHeader = request.headers.get("Authorization")
        if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
            return unauthorized("Missing or invalid Authorization header");
        }
        const jwt = AuthHeader.substring("Bearer ".length).trim();
        if (jwt != "skibidi") {
            return new Response("Invalid jwt", { status: 401 });
        }

        const { pathname } = new URL(request.url);

        if (pathname === "/api/create") {
            let body;
            try {
                body = await request.json();
            } catch (error) {
                return badRequest("Invalid JSON body")
            }
            const orgName = body["orgName"]
            if (!orgName) {
                return badRequest("Missing Org Name");
            }

            try {
                const result = await Resource.TestReportDB.prepare("INSERT INTO organizations (name) VALUES (?)")
                    .bind(orgName)
                    .run();

                if (!result) {
                    return forbidden("Invalid Org Name");
                }

                return jsonResponse({ orgId: result.id });
            } catch (error) {
                return badRequest("Database Error");
            }
        }


        if (pathname === "/api/get") {
            let body
            try {
                body = await request.json();
            } catch (error) {
                return badRequest("Invalid JSON body")
            }

            const orgName = body["orgName"]
            if (!orgName) {
                return badRequest("Missing Org Name")
            }

            try {
                const result = await Resource.TestReportDB.prepare("SELECT id, name FROM organizations WHERE name = ?")
                    .bind(orgName)
                    .all();

                if (!result) {
                    return forbidden("Invalid Org Name")
                }

                return jsonResponse(JSON.stringify(result["results"]))
            }
            catch (error) {
                return badRequest("Invalid JSON body")
            }
        }


        return new Response(
            "Skibidi rizz",
        );
    },
} satisfies ExportedHandler<Env>;