// Componets
import { CloudUploadIcon } from "../Icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";

const defaultUserData = {
  NickName: "BZRP",
  FullName: "Brian Zambell Rodriguez Pina",
  PhotoURL:
    "https://www.los40.do/wp-content/uploads/2023/10/16880295953133-e1696339269651-300x300.jpeg",
  lastLogin: "2023-02-20T10:30:40",
};

function UploaderImagePost() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Not Select file");

  return (
    <article>
      <div
        onClick={() => document.querySelector(".inptuImageCreatePost").click()}
        className=" overflow-hidden flex flex-col justify-center items-center border-2 border-dashed rounded-xl border-blue-600 h-60 cursor-pointer"
      >
        <input
          name="Image"
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0]);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
              console.log(image);
            }
          }}
          type="file"
          accept="image/*"
          className="inptuImageCreatePost"
          hidden
        />
        {image ? (
          <img
            className=" object-cover w-full h-full"
            src={image}
            alt="Imagen de Publicacion"
          />
        ) : (
          <CloudUploadIcon className="stroke-blue-600  w-[4em]" />
        )}
      </div>
    </article>
  );
}

export function CreatePost({ onCreatePost }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isContentInvalid, setIsContentInvalid] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.Content.value) {
      setIsContentInvalid(true);
      return;
    } else {
      setIsContentInvalid(false);
    }

    setIsSending(true);

    let data = new FormData();
    data.append("NickName", defaultUserData.NickName);
    data.append("FullName", defaultUserData.FullName);
    data.append("PhotoURL", defaultUserData.PhotoURL);
    data.append("lastLogin", defaultUserData.lastLogin);
    data.append("Post[Content]", e.target.Content.value);
    data.append("Post[CreateAt]", new Date().toISOString());
    data.append("Post[IsDisable]", false);
    data.append("Image", e.target.Image.files[0]);

    if (!e.target.Content) {
      return;
    }

    axios
      .post("https://cookie-beta-post-mobile-m5j8.onrender.com/post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        onCreatePost();
        setIsSending(false);
        onOpenChange(false);
      })
      .catch((error) => {
        console.error(error);
        setIsSending(false); // Establecer el estado de envío a false en caso de error
      });
  };

  return (
    <article className="w-full px-4 max-w-[750px] gap-4 flex flex-col">
      <div className="flex gap-4 justify-between items-center bg-white py-4 px-6 rounded-md basis-[100%] border-2 dark:bg-zinc-900 dark:border-zinc-800">
        <Avatar
          isBordered
          color="primary"
          src="https://www.los40.do/wp-content/uploads/2023/10/16880295953133-e1696339269651-300x300.jpeg"
        />

        <button
          onClick={onOpen}
          className="w-full bg-slate-200 dark:bg-zinc-800 rounded-md py-3 pl-4 text-left dark:text-zinc-200 font-semibold"
        >
          ¿Que estas pensando?
        </button>
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={onOpenChange}
          isDismissable={false}
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Crear Publicacion
                </ModalHeader>
                <ModalBody>
                  {isSending ? (
                    <Spinner
                      label="Loading..."
                      color="primary"
                      labelColor="primary"
                    />
                  ) : null}

                  <Textarea
                    name="Content"
                    required
                    variant="faded"
                    label="¿Que estas pensando?"
                    placeholder="Hi, I am cookie"
                    className="max-w-s"
                    maxLength={250}
                    isInvalid={isContentInvalid}
                    errorMessage="El campo no puede estar vacio"
                  />

                  <UploaderImagePost />
                </ModalBody>
                <ModalFooter className=" flex flex-col">
                  <div className="flex gap-4 justify-end">
                    <Button color="danger" variant="shadow" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" variant="shadow" type="submit">
                      Enviar
                    </Button>
                  </div>
                  <span className=" text-blue-600 text-opacity-60 font-bold text-sm text-right ">
                    @Cook Desing - SR11
                  </span>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </article>
  );
}
