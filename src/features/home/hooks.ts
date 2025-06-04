import {API_V1} from "@/shared/lib/hono-client";
import {useQuery} from "@tanstack/react-query";

export function useGetProducts() {
	const {data: products, isLoading} = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await API_V1.product.$get();
			const responseJson = await response.json();
			return responseJson?.data ?? [];
		},
	});

	return {products: products ?? [], isLoading};
}
