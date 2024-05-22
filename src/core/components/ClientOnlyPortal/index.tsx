import { useRef, useEffect, useState, ReactNode, FC } from "react";
import { createPortal } from "react-dom";

export type ClientOnlyPortalProps = {
  children: ReactNode;
  selector: string;
};

const ClientOnlyPortal: FC<ClientOnlyPortalProps> = ({
  children,
  selector,
}) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (ref.current as unknown as Element | null) =
      document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted
    ? createPortal(
        children,
        ref.current as unknown as Element | DocumentFragment
      )
    : null;
};

export default ClientOnlyPortal;
