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

	let categoriesContainer = document.getElementById('categories-container');

	categories.forEach((category) => {
		console.log(category);
		let categoryDiv = document.createElement('div');
		let categoryLink = document.createElement('a');

		categoryDiv.classList.add('cursor-pointer');
		categoryLink.classList.add('link', 'link-hover');
		categoryLink.innerHTML = `
        <div onclick="loadCategoriesDataById(${category.category_id})">
        ${category.category_name}
        </div>
        
        
        `;
		categoryDiv.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryDiv);
	});
};
displayCategories();

// loading categories data from https://openapi.programming-hero.com/api/news/${news_id}

let loadCategoriesDataById = (category_id) => {
	let url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

	fetch(url)
		.then((res) => res.json())
		.then((data) => displayCategoriesNews(data.data))
		.catch((error) => {
			console.log(error);
		});
};

let displayCategoriesNews = (news) => {
	let displayNewsContainer = document.getElementById('display-news-container');
	news.forEach((newsItem) => {
		console.log(newsItem);

		let newsDiv = document.createElement('div');
		newsDiv.innerHTML = `
        <div class="card flex flex-row   bg-white shadow-xl my-5 ">
<figure><img src="${newsItem.thumbnail_url}" alt="Album" ></figure>
<div class="card-body">
  <h2 class="card-title text-black font-bold text-2xl">${newsItem.title}</h2>
  <p>${newsItem.details.length > 20 ? newsItem.details.slice(0, 200) + '...' : newsItem.details}
    </p>  
  <p>${newsItem.details.length > 20 ? newsItem.details.slice(200, 400) + '...' : newsItem.details}
    </p>  

    <div>
    
    </div>
    
</div>
</div> 
        `;
		displayNewsContainer.appendChild(newsDiv);
	});
};
