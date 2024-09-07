import { getAllComponents } from "@/services/components";
import { useOutletContext, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs/tabs";
import ReactSyntaxHighlighter from "@/components/editor/syntax-highlight";
import { LivePreview, LiveProvider } from "react-live";

interface User {
  Id: number;
  name: string;
  email: string;
}

interface IComponent {
  Id: number;
  code: string;
  createdAt: string; // Alternatively, use Date if you're working with Date objects
  description: string;
  isActive: boolean;
  name: string;
  updatedAt: string; // Alternatively, use Date if you're working with Date objects
  user: User;
  userId: number;
}

export default function ShowSingleComponentPage() {
  const [component, setComponent] = useState<IComponent | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const auth = useOutletContext();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllComponents({
          auth,
          componentId: params?.componentId,
        });
        setLoading(false);
        setComponent(res?.data?.data?.responseData?.component);
      } catch (error) {
        setLoading(false);
        setComponent(null);
      }
    })();
  }, [params?.componentId]);
  if (!component) {
    return <div>No Component found</div>;
  }
  return (
    <div>
      <h3 className="text-2xl capitalize font-semibold text-org-primary">
        {component.name}
      </h3>
      <p className="text-slate-500">{component.description}</p>
      <Tabs key={params?.componentId} defaultTab="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <LiveProvider code={component.code}>
            <LivePreview />
          </LiveProvider>
        </TabsContent>
        <TabsContent value="code">
          <ReactSyntaxHighlighter code={component.code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
