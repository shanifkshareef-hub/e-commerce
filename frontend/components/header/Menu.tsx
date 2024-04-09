import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineProfile } from "react-icons/ai";

const Menu = () => {
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          Menu <CgMenuLeft className="text-2xl hover:text-gray-200" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onClick={() => {
            router.push("/");
          }}
          key="home"
        >
          <div className="flex space-x-1 items-center">
            <BiHomeAlt2 className="text-xs" />
            <p className="">Home</p>
          </div>
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            router.push("/products");
          }}
          key="products"
        >
          <div className="flex space-x-1 items-center">
            <AiOutlineProfile />
            <p className="">Products</p>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Menu;
