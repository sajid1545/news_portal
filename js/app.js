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
		let categoryDiv = document.createElement('div');
		let categoryLink = document.createElement('a');

		categoryDiv.classList.add('cursor-pointer');
		categoryLink.classList.add('link', 'link-hover');
		categoryLink.innerHTML = `
        <div onclick="(${category.category_id})">
        ${category.category_name}
        </div>
        
        
        `;
		categoryDiv.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryDiv);
	});
};
displayCategories();

// loading categories data from https://openapi.programming-hero.com/api/news/category/{category_id}

let loadCategoriesDataById = () => {
	let url = `https://openapi.programming-hero.com/api/news/category/05`;

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
        <button class="btn btn-outline btn-accent">See More</button>
        </div>

    </div>
    
</div>
</div> 
        `;
		displayNewsContainer.appendChild(newsDiv);
	});
};

loadCategoriesDataById();
