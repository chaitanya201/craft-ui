import { getSession } from "@/lib/cookies";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  return session.data;
};

// meta recieves data from loader

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name}` }];
};

export default function DashboardPage() {
  return <div>ji</div>;
}
