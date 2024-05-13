import { Avatar } from "@nextui-org/react";
import "../Css/NavBar.css";

import { Tooltip } from "@nextui-org/react";

function UserNav({ userName, nickname, src }) {
  return (
    <article className="flex gap-4 items-center">
      <Tooltip content = '@Bzrp' color="primary" >
        <button>
          <Avatar isBordered color="primary" src={src} />
        </button>
      </Tooltip>

      <div className="flex flex-col" id="data-user-nav-bar">
        <strong className="text-sm">{userName}</strong>
        <span className=" opacity-60 text-sm">@{nickname}</span>
      </div>
    </article>
  );
}

export default UserNav;
