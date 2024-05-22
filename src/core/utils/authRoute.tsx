import { useRouter } from "next/router";
import { Component, useEffect, useState } from "react";
import { isLogin } from "./isLogin";

const authRoute = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      if (!isLogin()) {
        router.push("/auth");
        //   dispatch(setToastrMessage({ message: 'ابتدا وارد حساب کاربری خود شوید', type: 'info' }));
      } else {
        setAuthenticated(true);
      }
    }, []);

    if (authenticated) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};
export default authRoute;
