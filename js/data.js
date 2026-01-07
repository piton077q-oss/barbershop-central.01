const CENTRAL_DATA = {
	services: [
		{ name: "Мужская стрижка", price: "3 000 ₸", topPrice: "4 000 ₸", category: "Стрижки" },
		{ name: "Детская стрижка", price: "2 000 ₸", topPrice: "3 000 ₸", category: "Стрижки" },
		{ name: "Борода", price: "2 000 ₸", topPrice: "3 000 ₸", category: "Борода" },
		{ name: "Окантовка", price: "1 000 ₸", topPrice: "1 500 ₸", category: "Детали" },
		{ name: "Стрижка + Борода", price: "5 000 ₸", topPrice: "6 000 ₸", category: "Комплексы" },
		{ name: "Стайлинг и укладка", price: "1 500 ₸", topPrice: "2 000 ₸", category: "Укладка" },
		{ name: "Тонировка волос", price: "4 000 ₸", topPrice: "4 000 ₸", category: "Тонировка" },
		{ name: "Тонировка бороды", price: "2 000 ₸", topPrice: "3 000 ₸", category: "Тонировка" },
		{ name: "Глиняная маска", price: "1 500 ₸", topPrice: "1 500 ₸", category: "Уход" },
		{ name: "Скабирование лица", price: "1 500 ₸", topPrice: "1 500 ₸", category: "Уход" },
		{ name: "Черная маска", price: "1 500 ₸", topPrice: "1 500 ₸", category: "Уход" },
		{ name: "Удаление воском", price: "1 000 ₸", topPrice: "1 000 ₸", category: "Уход" }
	],
	branches: [
		{
			id: "sarayshiq",
			name: "Central Сарайшық",
			address: "Астана, Сарайшык 34",
			phoneDisplay: "+7 771 813 20 22",
			whatsapp: "77718132022",
			barbers: [
				{ name: "Жандаулет", status: "TOP" , photo: "jandaulet.jpg" },
				{ name: "Рамазан", status: "TOP" , photo: "ramazan.jpg" },
				{ name: "Ақшын", status: "TOP" , photo: "akshyn.jpg" },
				{ name: "Берик", status: "Junior" , photo: "berik.jpg" },
				{ name: "Нурмухаммед", status: "Junior" , photo: "nurmuhammed.jpg" }
			]
		},
		{
			id: "syghanaq",
			name: "Central Сығанақ",
			address: "Астана, Сығанақ 47",
			phoneDisplay: "+7 708 022 08 17",
			whatsapp: "77080220817",
			barbers: [
				{ name: "Рысбек", status: "TOP" , photo: "rysbek.jpg" },
				{ name: "Рома", status: "TOP" , photo: "roma.jpg" }
			]
		},
		{
			id: "mametova",
			name: "Central Маметова",
			address: "Астана, Маметова 10",
			phoneDisplay: "+7 707 509 59 01",
			whatsapp: "77075095901",
			barbers: [
				{ name: "Нурдаулет", status: "TOP" , photo: "nurdaulet.jpg" },
				{ name: "Алихан", status: "Junior" , photo: "alikhan.jpg" }
			]
		}
	]
};