import { useState, useEffect, Fragment, ReactNode, FC } from "react";

export type ClientOnlyProps = {
  children: ReactNode;
};

const ClientOnly: FC<ClientOnlyProps> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <Fragment {...delegated}>{children}</Fragment>;
};

export default ClientOnly;
