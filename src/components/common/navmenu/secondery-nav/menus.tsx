"use client";
import { MenuItem } from "./menu-item";
import menus from "./menu-list.json";

export const Menus = () => {
  return (
    <div className="flex gap-x-9">
      {menus.map((menu) => (
        <MenuItem key={menu.id} href={menu.url} label={menu.name} />
      ))}
    </div>
  );
};
