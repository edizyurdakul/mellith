import { useQuery } from "@tanstack/react-query";

import { client } from "../lib/client";

export function useApiaries() {
  return useQuery({
    queryKey: ["apiaries"],
    queryFn: async () => {
      const res = await client.apiary.$get();
      if (!res.ok) throw new Error("Failed to fetch apiaries");
      return res.json();
    },
  });
}
