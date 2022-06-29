import { useMemo } from "react";

export const usePagination = (totalPages) => {
	const createPages = useMemo(() => {
		let newArray = [];
		for (let i = 0; i < totalPages; i++) {
			newArray.push(i + 1);
		}
		return newArray;
	}, [totalPages]);

	return createPages;

}
