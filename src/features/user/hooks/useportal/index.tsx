import { useLayoutEffect, useState } from "react";

export function usePortalRoot(id = "portal-root") {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(id);

    if (!element) {
      element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    }

    setRoot(element);
  }, [id]);

  return root;
}
