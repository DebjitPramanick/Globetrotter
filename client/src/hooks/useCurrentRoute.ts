import { useRouter } from "next/router";

export const useCurrentRoute = () => {
  const router = useRouter();
  return router.pathname;
};
