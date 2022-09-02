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
		categoryLink.innerHTML = `
        <div onclick="loadCategoriesDataById('${category.category_id}')">

        ${category.category_name}
           
        </div>
        `;

		categoryDiv.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryDiv);
	});
};
displayCategories();

// loading categories data from https://openapi.programming-hero.com/api/news/category/{category_id}
// loading categories data from https://openapi.programming-hero.com/api/news/category/01

let loadCategoriesDataById = (id) => {
	toggleLoader(true);

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
	toggleLoader(true);

	let displayNewsContainer = document.getElementById('display-news-container');
	displayNewsContainer.innerHTML = '';

	// total number of news available for each categories

	let totalNumberOfNews = document.getElementById('total-categories-item');
	totalNumberOfNews.classList.add('bg-white', 'text-2xl', 'text-black', 'text-center');
	totalNumberOfNews.innerHTML = `
    <div class=" p-3 my-10">
    ${news.length} items found for category
    </div>
    `;
	// sorting views
	news.sort((a, b) => b.total_view - a.total_view);

	news.forEach((newsItem) => {
		console.log(newsItem);
		let newsDiv = document.createElement('div');
		newsDiv.innerHTML = `
	        <div class="card flex sm:flex-row p-4 bg-white shadow-xl my-5 ">
	            <figure><img src="${
								newsItem.thumbnail_url
							}" alt="Album" style="width: 100%; height: 100%;"></figure>
	            <div class="card-body">
	            <h2 class="card-title text-black font-bold text-2xl">${newsItem.title}</h2>
	            <p>${
								newsItem.details.length > 20
									? newsItem.details.slice(0, 200) + '...'
									: newsItem.details
							}
	                </p>
	            <p>${
								newsItem.details.length > 20
									? newsItem.details.slice(201, 400) + '...'
									: newsItem.details
							}
	                </p>

	                <div class="grid grid-cols-1 sm:grid-cols-3 items-center text-center mt-3">

	                    <div class="flex justify-center gap-5 items-center">
	                        <div>
	                        <img src=" ${newsItem.author.img}" class="w-10 rounded-full">
	                        </div>
	                        <div>
	                        <h1>${
														newsItem.author.name === null
															? 'Author Not found'
															: newsItem.author.name === ''
															? 'Author Not found'
															: newsItem.author.name
													}
                            </h1>
	                        </div>
	                    </div>

	                    <div>
	                        <h1 class="font-bold text-black text-lg">${
														newsItem.total_view ? newsItem.total_view + 'M' : 'Total View Not Found'
													}</h1>
	                    </div>

	                    <div onclick="newModalNewDetail('${newsItem._id}')">
                        <label for="my-modal-3" class="btn modal-button btn-outline btn-accent">Read More</label>
	                    </div>

	                </div>

	            </div>
	        </div>
	        `;
		displayNewsContainer.appendChild(newsDiv);
		toggleLoader(false);
	});
};

// loading news details fo MODAL

let newModalNewDetail = async (news_id) => {
	let url = `https://openapi.programming-hero.com/api/news/${news_id}`;
	try {
		let response = await fetch(url);
		let data = await response.json();
		displayingNewsDetail(data.data[0]);
	} catch (e) {
		console.log(e);
	}
};
// newModalNewDetail();

// displaying details of news

let displayingNewsDetail = (details) => {
	let newsDetailsInModal = document.getElementById('modal-news-details');
	newsDetailsInModal.innerHTML = '';
	newsDetailsInModal.innerHTML = `
    <figure><img src="${details.image_url}" alt="Album" style="width: 100%; height: 100%;"></figure>
    <h3 class="text-lg font-bold mt-4">${details.title}</h3>
        <p class="py-4">${details.details}
        </p>
    `;
};

// Spinner toggle function

let toggleLoader = (isLoading) => {
	let loader = document.getElementById('loader');
	if (isLoading) {
		loader.classList.remove('hidden');
	} else {
		loader.classList.add('hidden');
	}
};
