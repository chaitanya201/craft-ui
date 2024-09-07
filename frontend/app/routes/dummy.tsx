import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs/tabs";
import React from "react";

export default function dummy() {
  return (
    <div>
      <Tabs>
        <TabsList>
          <TabsTrigger value="trigger 1">
            <p className="max-w-10 truncate">trigger 1</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 2">
            <p className="max-w-10 truncate">trigger 2</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 3">
            <p className="max-w-10 truncate">trigger 3</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 4">
            <p className="max-w-10 truncate">trigger 4</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 5">
            <p className="max-w-10 truncate">trigger 1</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 6">
            <p className="max-w-10 truncate">trigger 2</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 7">
            <p className="max-w-10 truncate">trigger 3</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 8">
            <p className="max-w-10 truncate">trigger 4</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 9">
            <p className="max-w-10 truncate">trigger 1</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 10">
            <p className="max-w-10 truncate">trigger 2</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 11">
            <p className="max-w-10 truncate">trigger 3</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 12">
            <p className="max-w-10 truncate">trigger 4</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 13">
            <p className="max-w-10 truncate">trigger 4</p>
          </TabsTrigger>
          <TabsTrigger value="trigger 14">
            <p className="max-w-10 truncate">trigger 4</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trigger 1">trigger 1</TabsContent>
        <TabsContent value="trigger 2">trigger 2</TabsContent>
        <TabsContent value="trigger 3">trigger 3</TabsContent>
      </Tabs>
    </div>
  );
}
