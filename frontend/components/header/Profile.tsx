import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoPower } from "react-icons/io5";

const Profile = () => {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <FaRegUser />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onClick={() => {
            router.push("/");
          }}
          key="home"
        >
          <div className="flex space-x-1 items-center hover:text-red-500 cursor-pointer">
            <IoPower className="" />
            <p>Logout</p>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Profile;
