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

//  Displaying Categories Name in the web page

let displayCategories = async () => {
	let categories = await loadCategories();
	let categoriesContainer = document.getElementById('categories-container');
	categoriesContainer.innerHTML = '';

	categories.forEach((category) => {
		let categoryDiv = document.createElement('div');
		let categoryLink = document.createElement('a');
		categoryDiv.classList.add('cursor-pointer');
		categoryLink.classList.add('link', 'link-hover');
		categoryDiv.innerHTML = `
        <div onclick="loadCategoriesDataById('${category.category_id}')">

        <a>
        ${category.category_name}
        </a>
           
        </div>
        `;

		// categoryDiv.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryDiv);
	});
};
displayCategories();

// loading categories data from https://openapi.programming-hero.com/api/news/category/{category_id}
// loading categories data from https://openapi.programming-hero.com/api/news/category/01

let loadCategoriesDataById = (id) => {
	let url = `https://openapi.programming-hero.com/api/news/category/${id}`;

	fetch(url)
		.then((res) => res.json())
		.then((data) => displayCategoriesNews(data.data))
		.catch((error) => {
			console.log(error);
		});
};

// displaying new in web page

let displayCategoriesNews = async (news) => {
	let displayNewsContainer = document.getElementById('display-news-container');
	displayNewsContainer.innerHTML = '';

	// total number of news available for each categories

	let totalNumberOfNews = document.getElementById('total-categories-item');
	totalNumberOfNews.classList.add('bg-white', 'text-3xl', 'text-black', 'text-center');
	totalNumberOfNews.innerHTML = `
    <div class=" p-5">
    ${news.length} items found for category
    </div>
    `;

	news.forEach((newsItem) => {
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

	    <div class="grid grid-cols-3 items-center text-center mt-3">

	        <div class="flex gap-5 items-center">
	            <div>
	            <img src=" ${newsItem.author.img}" class="w-10 rounded-full">
	            </div>
	            <div>
	            <h1>${newsItem.author ? newsItem.author.name : 'Author not found'}</h1>
	            </div>
	        </div>

	        <div>
	            <h1 class="font-bold text-black text-lg">${
								newsItem.total_view ? newsItem.total_view : 'Total View Not Found'
							}M</h1>
	        </div>

	        <div>
            <label for="my-modal-3" class="btn modal-button btn-outline btn-accent">See More</label>
	        </div>

	    </div>

	</div>
	</div>
	        `;
		displayNewsContainer.appendChild(newsDiv);
	});
};

// loading newsDetails
