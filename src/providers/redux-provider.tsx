// app/StoreProvider.tsx
"use client";

import {useRef} from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {LoadingAnimation} from "../components/layout/loading-animations";
import {makePersistor, makeStore} from "../store";

export default function ReduxProvider({children}: {children: React.ReactNode}) {
	const storeRef = useRef<ReturnType<typeof makeStore>>(undefined);
	const persistorRef = useRef<ReturnType<typeof makePersistor>>(undefined);

	if (!storeRef.current) {
		storeRef.current = makeStore();
		persistorRef.current = makePersistor(storeRef.current);
	}

	return (
		<Provider store={storeRef.current}>
			<PersistGate
				loading={<LoadingAnimation variant="cooking" />}
				persistor={persistorRef.current!}
			>
				{children}
			</PersistGate>
		</Provider>
	);
}
