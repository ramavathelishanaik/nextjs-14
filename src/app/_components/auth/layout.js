"use client";
/**
 * This file is the layout component for the authentication pages in the application.
 * It sets up the basic/common structure and styling for the authentication pages.
 */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const IsSessionExpired = useSelector((state) => state.auth.sessionExpired);

  const { status, data: sessionData } = useSession(); //Retrieves the current session status and data from the Next.js authentication library.
  const router = useRouter(); //provides access to the application's routing functionality.
  const pathName = usePathname(); // Retrieves the current pathname of the application.
  const params = useSearchParams();

  /**
   * Handles the authentication state and redirects the user based on their authentication status and permissions.
   * Unauthenticated, redirected to the login page or the current pathname.
   * Authenticated and is an admin, redirected to the admin pages.
   * Finally, the router is refreshed to ensure the changes take effect.
   */
  useEffect(() => {
    if (status === "unauthenticated") {
      if (params.get("user_id")) {
        router.push(
          pathName === "/auth"
            ? "/auth/login"
            : `${pathName}?user_id=${params.get("user_id")}`
        );
      } else {
        router.push(pathName === "/auth" ? "/auth/login" : pathName);
      }
    } else if (status === "authenticated") {
      if (pathName === "/auth/change-password") {
        router.push("/auth/change-password");
        return;
      }

      if (IsSessionExpired === true && pathName === "/auth/login") {
        router.push("/auth/login");
        return;
      }

      if (sessionData?.user?.user_type === "SUPERADMIN") {
        router.push("/admin/vendors?view=table");
      } else if (sessionData?.user?.user_type === "VENDOR") {
        router.push(`/vendor/salesrep`);
      }
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  //Renders a loading state while the authentication status is being determined.
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  // redirects the user to the appropriate page based on their authentication status and permissions.
  if (
    status === "authenticated" &&
    pathName !== "/auth/change-password" &&
    pathName !== "/auth/login"
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        Redirecting...
      </div>
    );
  }
  return <div className="h-screen">{children}</div>;
}
