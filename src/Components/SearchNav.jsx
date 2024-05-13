import { Input } from "@nextui-org/react";
import { useState } from "react";
import {SearchIcon} from "./Icons";

import '../Css/SearchNav.css'

function SearchNav() {
  const [value, setValue] = useState("");
  return (
    <div className="search-nav">
      <Input
        isClearable
        radius="lg"
        classNames={{
          input: [
            "w-[120px]",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ]
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 w-5" />
        }
      />
    </div>
  );
}

export default SearchNav;
