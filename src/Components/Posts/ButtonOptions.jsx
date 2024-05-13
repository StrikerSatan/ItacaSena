import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { CopyDocumentIcon } from "../Icons.jsx";
import { EditDocumentIcon } from "../Icons.jsx";
import { DeleteDocumentIcon } from "../Icons.jsx";
import { ConfigurationIcon } from "../Icons.jsx";

import { useState } from "react";
import { FormUpdatePost } from "./Forms.jsx";
import PostReportButton from "./PostReportButton.jsx";

import axios from "axios";

export default function ButtonOptions({ Id, OnUpdatePost }) {
  {
    //* ACTIONS
  }

  const defaultUserData = {
    NickName: "BZRP",
    FullName: "Brian Zambell Rodriguez Pina",
    PhotoURL:
      "https://www.los40.do/wp-content/uploads/2023/10/16880295953133-e1696339269651-300x300.jpeg",
    lastLogin: "2023-02-20T10:30:40",
  };

  const [isSendingDeletePost, setIsSendingDeletePost] = useState(false);

  const deletePost = async () => {
    setIsSendingDeletePost(true);
    try {
      const response = await axios.delete(
        `https://cookie-beta-post-mobile-m5j8.onrender.com/post/${Id}`
      );
      console.log("Post eliminado:", response.data);
      OnUpdatePost();
      setIsSendingDeletePost(false);
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      setIsSendingDeletePost(false);
    }
  };

  const [selectedAction, setSelectedAction] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div>
      <Dropdown
        showArrow
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content:
            "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        }}
      >
        <DropdownTrigger>
          <button>
            <ConfigurationIcon className="w-6 h-6" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Actions">
            <DropdownItem
              onPress={onOpen}
              key="copy"
              shortcut="⌘C"
              description="Copy the file link"
              startContent={<CopyDocumentIcon className={iconClasses} />}
              onClick={() => setSelectedAction("Report")}
            >
              Report
            </DropdownItem>
            <DropdownItem
              onPress={onOpen}
              key="edit"
              shortcut="⌘⇧E"
              description="Allows you to edit the file"
              startContent={<EditDocumentIcon className={iconClasses} />}
              onClick={() => setSelectedAction("Edit")}
            >
              Edit Post
            </DropdownItem>
            <DropdownItem
              onPress={onOpen}
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              description="Permanently delete the file"
              startContent={
                <DeleteDocumentIcon
                  className={cn(iconClasses, "text-danger")}
                />
              }
              onClick={() => setSelectedAction("Delete")}
            >
              Delete Post
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      {
        // Modal
      }

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {selectedAction === "Report" && (
                  <article className=" h-[300px] w-full grid place-content-center gap-4">
                    <h3 className=" text-opacity-60">
                      ¿Deseas generar un reporte de este Post?
                    </h3>
                    <PostReportButton postData={defaultUserData} />
                  </article>
                )}
                {selectedAction === "Edit" && (
                  <FormUpdatePost
                    handleClose={onClose}
                    Id={Id}
                    OnUpdatePost={OnUpdatePost}
                  />
                )}
                {selectedAction === "Delete" && (
                  <article className="h-[300px] w-full grid place-content-center gap-3">
                    <span className=" text-xl text-center text-zinc-400">
                      ¿Estas seguro que deseas eliminar este Cook?
                    </span>
                    <Button
                      onClick={deletePost}
                      className="w-[150px] m-auto py-6"
                      color="danger"
                      variant="shadow"
                    >
                      Eliminar
                    </Button>
                    {isSendingDeletePost ? (
                      <Spinner
                        label="Loading..."
                        className=" m-auto"
                        color="primary"
                        labelColor="primary"
                      />
                    ) : null}
                  </article>
                )}
              </ModalBody>
              <ModalFooter className=" text-zinc-600 text-opacity-60 font-bold text-sm text-center">
                Cook - SR11A
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
