import { commitSession, getSession } from "@/lib/cookies";
import { SERVER_URL } from "@/lib/urls";
import { LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    throw redirect("/error");
  }
  let data;
  try {
    const response = await fetch(`${SERVER_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    data = await response.json();
  } catch (error) {
    console.log("error while getting data", error);
    throw redirect("/error");
  }
  if (data?.metadata?.code !== 200) {
    throw redirect("/error");
  }
  const { accessToken, user } = data.data.responseData;
  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", accessToken);
  session.set("Id", user.Id);
  session.set("email", user.email);
  session.set("name", user.name);
  const cookie = await commitSession(session);
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};

function Verify() {
  return <div>Verifying..</div>;
}

export default Verify;
