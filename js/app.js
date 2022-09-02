// Loading Categories data from https://openapi.programming-hero.com/api/news/categories

let loadCategories = async () => {
	let url = `https://openapi.programming-hero.com/api/news/categories`;
	try {
		let response = await fetch(url);
		let data = await response.json();
		return data.data.news_category;
	} catch (err) {
		console.log(err);
	}
};
loadCategories();

//  Displaying Categories Name in the web page

let displayCategories = async () => {
	let categories = await loadCategories();
	console.log(categories);

	let categoriesContainer = document.getElementById('categories-container');

	categories.forEach((category) => {
		console.log(category);
		let categoryDiv = document.createElement('div');
		let categoryLink = document.createElement('a');

		categoryDiv.classList.add('cursor-pointer');
		categoryLink.classList.add('link', 'link-hover');

		categoryLink.innerHTML = `${category.category_name}`;
		categoryDiv.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryDiv);
	});
};
displayCategories();
