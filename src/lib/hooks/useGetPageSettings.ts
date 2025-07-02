import {client} from "@/backend/client";
import {useQuery} from "@tanstack/react-query";

export function useGetPageSettings() {
	const {data, isLoading} = useQuery({
		queryKey: ["PAGE_SETTINGS"],
		queryFn: async () => {
			const response = await client["page-settings"].$get();
			const responseJson = await response.json();
			return responseJson;
		},
	});

	return {data, isLoadingPageSettings: isLoading};
}
