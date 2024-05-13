import { CloudUploadIcon } from "../Icons";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Spinner,
} from "@nextui-org/react";

import { useState } from "react";
import axios from "axios";

function UploaderUpdateImagePost() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Not Select file");

  return (
    <article>
      <div
        onClick={() => document.querySelector(".inptuImageUpdatePost").click()}
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
          className="inptuImageUpdatePost"
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
export function FormUpdatePost({ handleClose, OnUpdatePost, Id }) {
  const defaultUserData = {
    NickName: "BZRP",
    FullName: "Brian Zambell Rodriguez Pina",
    PhotoURL:
      "https://www.los40.do/wp-content/uploads/2023/10/16880295953133-e1696339269651-300x300.jpeg",
    lastLogin: "2023-02-20T10:30:40",
  };

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
      .put(`https://cookie-beta-post-mobile-m5j8.onrender.com/post/${Id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsSending(false);
        OnUpdatePost();
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        setIsSending(false); // Establecer el estado de envío a false en caso de error
      });
  };

  const [isContentInvalid, setIsContentInvalid] = useState(false);
  const [isSending, setIsSending] = useState(false);
  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader className="flex flex-col gap-1">
        Crear Publicacion
      </ModalHeader>

      {isSending ? (
        <Spinner
          label="Loading..."
          className=" m-auto"
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

      <UploaderUpdateImagePost />

      <Button type="submit" color="primary" variant="shadow" className=" mt-6">
        Enviar
      </Button>
    </form>
  );
}

function UploaderCreateImagePost() {
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
export function FormCreatePost({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader className="flex flex-col gap-1">
        Crear Publicacion
      </ModalHeader>
      <ModalBody>
        {isSending ? (
          <Spinner label="Loading..." color="primary" labelColor="primary" />
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

        <UploaderCreateImagePost />
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
  );
}
