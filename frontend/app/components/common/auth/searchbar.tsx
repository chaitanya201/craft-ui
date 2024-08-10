import { Search } from "lucide-react";
import React, { useState } from "react";
import SlidingInput from "../form-elements/sliding-input";
import Card from "../card/card";
import { cn } from "@/lib/utils";

export default function SearchBarComponent() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="relative">
      <SlidingInput
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        slidingLabel={<SearchBar />}
        className={cn(searchText && "w-96 transition-all duration-200")}
      />
      <div className="absolute">{/* <Dropdown /> */}</div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex gap-x-2 items-center justify-center cursor-pointer">
      <Search />
      <span>Search</span>
    </div>
  );
}

function Dropdown() {
  return (
    <Card className="">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, debitis
      corporis accusamus sunt vel quas illum, dolorum odio alias voluptas, earum
      veniam nesciunt. Soluta, ipsum placeat dolores a sint cumque? Nam magni
      cupiditate aliquid. Beatae, tempora! Vel animi quaerat ullam non
      perferendis iure nam quibusdam labore soluta officiis, atque itaque
      delectus deserunt repellat, quo id reiciendis accusamus cupiditate? Unde,
      quam. Voluptatem quos iste vitae magnam provident fuga explicabo eum
      voluptatibus, ab aperiam non iusto ex veniam reprehenderit eveniet officia
      corrupti libero placeat unde sequi fugit harum porro. Necessitatibus, sed
      deserunt. Obcaecati accusamus cumque facere, exercitationem excepturi
      dicta minus quidem atque laborum odio ipsum et tenetur dolore ipsa id in,
      eius consequatur illum neque asperiores saepe voluptates. Quisquam fuga
      necessitatibus a? Impedit autem itaque, commodi dolor consectetur officia
      reprehenderit recusandae. Expedita quidem sunt alias deserunt sed natus
      error. Fuga, vitae. Sequi pariatur ex nobis cum reiciendis quo odit
      commodi dolorem aliquam? Deleniti esse aliquid quos reprehenderit eius
      reiciendis voluptatem nihil eum excepturi dolores? Earum, rem quos dolorum
      cupiditate rerum cumque dolores, mollitia id ratione quo qui illo
      recusandae aperiam voluptas quidem. reprehenderit recusandae. Expedita
      quidem sunt alias deserunt sed natus error. Fuga, vitae. Sequi pariatur ex
      nobis cum reiciendis quo odit commodi dolorem aliquam? Deleniti esse
      aliquid quos reprehenderit eius reiciendis voluptatem nihil eum excepturi
      dolores? Earum, rem quos dolorum cupiditate rerum cumque dolores, mollitia
      id ratione quo qui illo recusandae aperiam voluptas quidem.
    </Card>
  );
}
