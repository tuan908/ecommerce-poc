import {type Feature} from "@/types";
import {Award, Headphones, RotateCcw, Truck} from "lucide-react";

export const features: Feature[] = [
	{
		title: "Giao Hàng Toàn Quốc",
		description:
			"Chỉ từ 2-4 ngày là bạn đã có thể thưởng thức đặc sản Bình Định tại nhà, bất kể bạn ở đâu.",

		icon: <Truck className="h-8 w-8 text-blue-600" />,
	},
	{
		title: "Đóng Gói Chuẩn Vệ Sinh",
		description:
			"Sản phẩm được đóng gói kỹ lưỡng, hợp vệ sinh, đảm bảo an toàn thực phẩm và giữ được độ tươi ngon.",
		icon: <Award className="h-8 w-8 text-blue-600" />,
	},
	{
		title: "100% Chính Gốc Bình Định",
		description:
			"Tất cả sản phẩm đều được sản xuất tại Bình Định, đảm bảo nguồn gốc rõ ràng và hương vị truyền thống.",
		icon: <RotateCcw className="h-8 w-8 text-blue-600" />,
	},
	{
		title: "Hỗ Trợ Nhiệt Tình",
		description:
			"Đội ngũ CSKH sẵn sàng tư vấn, giải đáp thắc mắc về sản phẩm và đơn hàng mọi lúc, mọi nơi.",
		icon: <Headphones className="h-8 w-8 text-blue-600" />,
	},
];
