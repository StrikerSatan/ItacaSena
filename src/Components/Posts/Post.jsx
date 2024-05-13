import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
} from "@nextui-org/react";

import { CommentIcon, HeartIcon, ShareIcon } from "../Icons";
import ButtonOptions from "./ButtonOptions";
import { useState } from "react";


export function PostImage({
  username,
  nickname,
  content,
  hastag,
  likesAmout,
  imageURL,
  phothoURL,
  Id, 
  OnUpdatePost,
  status
}) {
  const [isFollowed, setIsFollowed] = useState(false);


  return (
    <Card className="w-full p-2  rounded-xl border-2 dark:border-1 dark:bg-zinc-900 dark:border-zinc-800">
      {
        // Card Header
      }

      <CardHeader className="justify-between">
        <header className="flex gap-5">
          <Avatar isBordered color="primary" radius="full" size="md" src={phothoURL} />
          <aside className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-bold leading-none text-black dark:text-white">
              {username}{status}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{nickname}
            </h5>
          </aside>
        </header>
        <div className=" flex gap-4">
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200 hover:border-red-500 hover:text-red-500 hover:bg-red-500 hover:bg-transparent w-[100px] py-3"
                : "w-[100px]"
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onClick={() => {
              setIsFollowed(!isFollowed);

              // toast.success('follow')
            }}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>

          {
            //* Manejador de Acciones            
          }
          <ButtonOptions Id={Id} OnUpdatePost={OnUpdatePost} />

        </div>
      </CardHeader>

      {
        // Card Body
      }

      <CardBody className="px-3 text-small dark:text-default-400 gap-2">
        <p className="">{content}</p>

        <Card isFooterBlurred radius="md" className="">

          <Image
            isZoomed
            className="w-[700px] object-cover h-[300px]"
            alt="NextUI Fruit Image with Zoom"
            src={imageURL}
          />

          <CardFooter className=" justify-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl p-3 w-50 rounded-large bottom-1 ml-2 mb-2 shadow-small z-10">
            <p className="text-tiny text-white/80 font-bold">
              Hace: 10 horas
            </p>
          </CardFooter>
        </Card>

        <span className="text-md font-bold text-blue-700">#{hastag}</span>
      </CardBody>

      {
        // Card Footer
      }

      <CardFooter className="gap-4 flex justify-between">
        <div className="flex gap-1 items-center">
          <HeartIcon className="w-6 fill-red-600 cursor-pointer stroke-gray-300" />
          <p className="font-semibold text-default-400 text-small">
            {likesAmout}
          </p>
          <p className=" text-default-400 text-small">Cooks</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <CommentIcon className="w-5" />
          <p className="text-default-400 text-small">Comentar</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <ShareIcon className="w-5" />
          <p className="text-default-400 text-small">Compartir</p>
        </div>
      </CardFooter>
    </Card>
  );
}
export function PostText({
  username,
  nickname,
  content,
  hastag,
  likesAmout,
  phothoURL,
  Id,
  OnUpdatePost,
  status
}) {
  const [isFollowed, setIsFollowed] = useState(false);


  return (
    <Card className="w-full p-2  rounded-xl border-2 dark:border-1 dark:bg-zinc-900 dark:border-zinc-800">
      {
        // Card Header
      }

      <CardHeader className="justify-between">
        <header className="flex gap-5">
          <Avatar isBordered color="primary" radius="full" size="md" src={phothoURL} />
          <aside className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-bold leading-none text-black dark:text-white">
              {username} - {status ? 'Inactivo': 'Activo'}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{nickname}
            </h5>
          </aside>
        </header>
        <div className=" flex gap-4">
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200 hover:border-red-500 hover:text-red-500 hover:bg-red-500 hover:bg-transparent w-[100px] py-3"
                : "w-[100px]"
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onClick={() => {
              setIsFollowed(!isFollowed);

              // toast.success('follow')
            }}
          >
            {isFollowed ? "Not Follow" : "Follow"}
          </Button>

          {
            //* Manejador de Acciones            
          }
          <ButtonOptions Id={Id} OnUpdatePost={OnUpdatePost} />

        </div>
      </CardHeader>

      {
        // Card Body
      }

      <CardBody className="px-3 text-small dark:text-default-400 gap-2">
        <p className="">{content}</p>
        <span className="text-md font-bold text-blue-700">#{hastag}</span>
      </CardBody>

      {
        // Card Footer
      }

      <CardFooter className="gap-4 flex justify-between">
        <div className="flex gap-1 items-center">
          <HeartIcon className="w-6 fill-red-600 cursor-pointer stroke-gray-300" />
          <p className="font-semibold text-default-400 text-small">
            {likesAmout}
          </p>
          <p className=" text-default-400 text-small">Cooks</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <CommentIcon className="w-5" />
          <p className="text-default-400 text-small">Comentar</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <ShareIcon className="w-5" />
          <p className="text-default-400 text-small">Compartir</p>
        </div>
      </CardFooter>
    </Card>
  );
}

