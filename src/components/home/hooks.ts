import {client} from "@/backend/client";
import {useQuery} from "@tanstack/react-query";

export function useGetProducts() {
	const {data: products, isLoading} = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await client.product.$get();
			const responseJson = await response.json();
			return responseJson?.data ?? [];
		},
	});

	return {products: products ?? [], isLoading};
}
