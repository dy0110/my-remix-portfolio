import { proxy } from "valtio";

type Store = {
	darkMode: boolean;
};

export const store = proxy<Store>({
	darkMode: false,
});
