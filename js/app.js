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
	// categoriesContainer.innerHTML = '';

	categories.forEach((category) => {
		let categoryDiv = document.createElement('div');
		let categoryLink = document.createElement('a');
		categoryDiv.classList.add('cursor-pointer');
		categoryLink.classList.add('link', 'link-hover');
		categoryLink.innerHTML = `
        <div onclick="loadCategoriesDataById('${category.category_id}', '${category.category_name}')">

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

let loadCategoriesDataById = async (id, name) => {
	toggleLoader(true);

	let url = `https://openapi.programming-hero.com/api/news/category/${id}`;

	try {
		let response = await fetch(url);
		let data = await response.json();
		return displayCategoriesNews(data.data, name);
	} catch (err) {
		console.log(err);
	}
};

// displaying news in web page

let displayCategoriesNews = async (news, name) => {
	toggleLoader(true);

	let displayNewsContainer = document.getElementById('display-news-container');
	displayNewsContainer.innerHTML = '';

	// total number of news available for each categories

	let totalNumberOfNews = document.getElementById('total-categories-item');
	totalNumberOfNews.innerHTML = `
    <div class="p-3 my-10">
    ${news.length} items available in ${name} category
    </div>
    `;

	// sorting views
	news.sort((a, b) => b.total_view - a.total_view);

	news.forEach((newsItem) => {
		let newsDiv = document.createElement('div');
		newsDiv.innerHTML = `
	        <div class="card flex sm:flex-row p-4 bg-white shadow-xl my-5 hover:shadow-sky-600 hover:duration-150 mb-10 ">
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

	                    <div class="flex gap-2 justify-center items-center" >

							<div>
							<i class="fa-solid fa-eye"></i>
							</div>

	                        <div>
							<h1 class="font-bold text-black text-lg">${
								newsItem.total_view ? newsItem.total_view + 'M' : 'Total View Not Found'
							}</h1>
							
							</div>
	                    </div>

	                    <div onclick="newModalNewDetail('${newsItem._id}')">
                        <label for="my-modal-3" class="btn modal-button btn-outline btn-accent px-10  py-2">Read More</label>
	                    </div>

	                </div>

	            </div>
	        </div>
	        `;
		displayNewsContainer.appendChild(newsDiv);
		toggleLoader(false);
	});
};

// loading news details for MODAL

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

// displaying details of news in modal

let displayingNewsDetail = (details) => {
	let newsDetailsInModal = document.getElementById('modal-news-details');
	newsDetailsInModal.innerHTML = '';
	newsDetailsInModal.innerHTML = `
    <figure><img src="${details.image_url}" alt="Album" style="width: 100%; height: 100%;"></figure>
    <h3 class="text-lg font-bold mt-4">${details.title}</h3>
        <p class="py-4">${details.details}
    <p class="py-4 text-center"> Author: <img src=" ${
			details.author.img
		}" class="w-10 rounded-full block mx-auto">
    </p>
    <p class="text-yellow-400 text-center">
    ${
			details.author.name === null
				? 'Author Not found'
				: details.author.name === ''
				? 'Author Not found'
				: details.author.name
		}
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

// ======================================== Blog page scripts =====================================

// blog onclick event

let blogPage = () => {
	let blogPage = document.getElementById('blog-page');
	window.location.href = 'blogs.html';
};
let blogInfo = () => {
	let blogSection = document.getElementById('blog-section');
	blogSection.innerHTML = `
    <div class="space-y-5">


    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box text-center ">
    <div class="collapse-title text-3xl font-bold border-yellow-300 border-4 p-4">
      Difference Between var, let and const
    </div>
    <div class="collapse-content mx-3 text-2xl  bg-white text-black font-semibold"> 
      <p>Variables declared with var are in the function scope.
      Variables declared as let are in the block scope.
      Variables declared as const are in the block scope.
      While variables declared with var are hoisted to the enclosing scope, variables declared with let or const are not initialized until their definition is evaluated.
      At the top level, variables declared with var, unlike ones declared with let or const, create a property on the global object.
      </p>
    </div>
  </div>

    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box text-center ">
    <div class="collapse-title text-3xl font-bold border-yellow-300 border-4 p-4">
    Difference between arrow function and normal function
    </div>
    <div class="collapse-content mx-3 text-2xl  bg-white text-black font-semibold"> 
      <p>Both regular JavaScript functions and arrow functions work in a similar manner but there are some differences between them.The first and most obvious difference between arrow functions and regular functions is their syntax. Not only do they look different, but arrow functions also provide an implicit return shorthand and allow parenthesis around a single argument to be omitted.Inside a regular function, execution context (i.e. the value of this) is dynamic. This means that the value of this depends on how the function was invoked.On the other hand, an arrow function does not define its own execution context. This results in an arrow function's this being resolved lexically.
      </p>
    </div>
  </div>

    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box text-center ">
    <div class="collapse-title text-3xl font-bold border-yellow-300 border-4 p-4">
    Difference between map filter find and foreach
    </div>
    <div class="collapse-content mx-3 text-2xl  bg-white text-black font-semibold"> 
      <p>
      The main difference between forEach and filter is that forEach just loop over the array and executes the callback but filter executes the callback and check its return value. map() loop through the elements allocates memory and stores return values by iterating main array.find: Return the first element which satisfies the condition.
      </p>
    </div>
  </div>

    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box text-center ">
    <div class="collapse-title text-3xl font-bold border-yellow-300 border-4 p-4">
    Why should we use template string
    </div>
    <div class="collapse-content mx-3 text-2xl  bg-white text-black font-semibold"> 
      <p>
      Template strings are a powerful feature of modern JavaScript released in ES6. It lets us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. It allows us to create strings that are complex and contain dynamic elements.
      </p>
    </div>
  </div>
 


    </div>
    `;
};
blogInfo();
