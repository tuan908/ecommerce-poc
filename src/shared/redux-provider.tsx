// app/StoreProvider.tsx
"use client";

import {useRef} from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {makePersistor, makeStore} from "./store";

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<ReturnType<typeof makeStore>>(undefined);
	const persistorRef = useRef<ReturnType<typeof makePersistor>>(undefined);

	if (!storeRef.current) {
		storeRef.current = makeStore();
		persistorRef.current = makePersistor(storeRef.current);
	}

	return (
		<Provider store={storeRef.current}>
			<PersistGate
				loading={<div>Loading...</div>}
				persistor={persistorRef.current!}
			>
				{children}
			</PersistGate>
		</Provider>
	);
}
