import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import {useCart} from "../contexts/cart-context";

export default function CartIcon() {
	const {state} = useCart();

	return (
		<Button variant="ghost" size="icon" className="relative">
			<ShoppingCart className="h-5 w-5" />
			{state.itemCount > 0 && (
				<Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
					{state.itemCount}
				</Badge>
			)}
		</Button>
	);
}
