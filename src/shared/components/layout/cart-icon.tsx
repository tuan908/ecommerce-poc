import {Badge} from "@/shared/components/ui/badge";
import {Button} from "@/shared/components/ui/button";
import {useAppSelector} from "@/shared/store/hooks";
import {ShoppingCart} from "lucide-react";

export default function CartIcon() {
	const state = useAppSelector(state => state.cart);

	return (
		<Button variant="ghost" size="icon" className="relative">
			<ShoppingCart className="h-5 w-5" />
			{state.total > 0 && (
				<Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
					{state.itemCount}
				</Badge>
			)}
		</Button>
	);
}
