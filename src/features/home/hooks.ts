import {honoClient} from "@/lib/hono-client";
import {useQuery} from "@tanstack/react-query";

export function useGetProducts() {
	const {data: products, isLoading} = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await honoClient.products.$get();
			const responseJson = await response.json();
			return responseJson?.data ?? [];
		},
	});

	return {products: products ?? [], isLoading};
}
