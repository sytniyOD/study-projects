export const getPagesCount = (totalCount, limit) => {
	return Math.ceil(totalCount / limit)
}

// export const getPagesArray = (totalPages) => {
// 	let newArray = [];
// 	for (let i = 0; i < totalPages; i++) {
// 		newArray.push(i + 1);
// 	}
// 	return newArray;
// }