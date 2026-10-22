"use client";

import { useEffect } from "react";

export function NavDismiss() {
  useEffect(() => {
    function closeMenus(except?: Node) {
      for (const menu of document.querySelectorAll("header details[open]")) {
        if (except && menu.contains(except)) continue;
        menu.removeAttribute("open");
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node) closeMenus(event.target);
    }

    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      const menu = link?.closest("header details");
      if (menu) menu.removeAttribute("open");
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
