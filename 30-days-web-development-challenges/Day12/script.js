const data = [
    {
        id: 1,
        name: "Samsung Galaxy S23",
        img: "https://m.media-amazon.com/images/I/61-E0V81kBL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 35099,
        seller: "Samsung Store",
        catagory: "Smartphones",
        rating: 4.5
    },
    {
        id: 2,
        name: "iPhone 14 Pro",
        img: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UY327_FMwebp_QL65_.jpg",
        amt: 119999,
        seller: "Apple Store",
        catagory: "Smartphones",
        rating: 4.7
    },
    {
        id: 3,
        name: "OnePlus 11",
        img: "https://m.media-amazon.com/images/I/61amb0CfMGL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 42999,
        seller: "OnePlus Store",
        catagory: "Smartphones",
        rating: 4.4
    },
    {
        id: 4,
        name: "Google Pixel 7",
        img: "https://m.media-amazon.com/images/I/61CTWAftjmL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 49999,
        seller: "Google Store",
        catagory: "Smartphones",
        rating: 4.6
    },
    {
        id: 5,
        name: "Dell XPS 13",
        img: "https://m.media-amazon.com/images/I/71tSrDl1TaL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 119999,
        seller: "Dell Store",
        catagory: "Laptops",
        rating: 4.5
    },
    {
        id: 6,
        name: "MacBook Air M2",
        img: "https://m.media-amazon.com/images/I/71ItMeqpN3L._AC_UY327_FMwebp_QL65_.jpg",
        amt: 129999,
        seller: "Apple Store",
        catagory: "Laptops",
        rating: 4.7
    },
    {
        id: 7,
        name: "HP Spectre x360",
        img: "https://m.media-amazon.com/images/I/71TDeGVVqLL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 139999,
        seller: "HP Store",
        catagory: "Laptops",
        rating: 4.4
    },
    {
        id: 8,
        name: "Lenovo ThinkPad X1",
        img: "https://m.media-amazon.com/images/I/518BYF8LHRL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 114999,
        seller: "Lenovo Store",
        catagory: "Laptops",
        rating: 4.6
    },
    {
        id: 9,
        name: "Apple iPad Pro",
        img: "https://m.media-amazon.com/images/I/61G6WfvA9vL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 99999,
        seller: "Apple Store",
        catagory: "Tablets",
        rating: 4.8
    },
    {
        id: 10,
        name: "Samsung Galaxy Tab S8",
        img: "https://m.media-amazon.com/images/I/61N77XWqCKL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 73999,
        seller: "Samsung Store",
        catagory: "Tablets",
        rating: 4.6
    },
    {
        id: 11,
        name: "Lenovo Tab P11",
        img: "https://m.media-amazon.com/images/I/51WLV2ZemjL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 34999,
        seller: "Lenovo Store",
        catagory: "Tablets",
        rating: 4.3
    },
    {
        id: 12,
        name: "Microsoft Surface Pro 8",
        img: "https://m.media-amazon.com/images/I/51SMgQUdi5L._AC_UY327_FMwebp_QL65_.jpg",
        amt: 129999,
        seller: "Microsoft Store",
        catagory: "Tablets",
        rating: 4.7
    },
    {
        id: 13,
        name: "Sony WH-1000XM4",
        img: "https://m.media-amazon.com/images/I/6162Umyop-L._AC_UY327_FMwebp_QL65_.jpg",
        amt: 29999,
        seller: "Sony Store",
        catagory: "Headphones",
        rating: 4.8
    },
    {
        id: 14,
        name: "Bose QuietComfort 35 II",
        img: "https://m.media-amazon.com/images/I/51QeS0jkx-L._AC_UY327_FMwebp_QL65_.jpg",
        amt: 24999,
        seller: "Bose Store",
        catagory: "Headphones",
        rating: 4.6
    },
    {
        id: 15,
        name: "Apple AirPods Max",
        img: "https://m.media-amazon.com/images/I/81thV7SoLZL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 54999,
        seller: "Apple Store",
        catagory: "Headphones",
        rating: 4.7
    },
    {
        id: 16,
        name: "Jabra Elite 85h",
        img: "https://m.media-amazon.com/images/I/81IDZFkzjeL._AC_UY327_FMwebp_QL65_.jpg",
        amt: 24999,
        seller: "Jabra Store",
        catagory: "Headphones",
        rating: 4.5
    }
];

const productsContainer = document.querySelector(".products");
const categoryList = document.querySelector(".category-list");

function displayProducts(products) {
    if (products.length > 0) {
        const product_details = products
            .map(
                (product) => `
    <div class="product">
        <div class="img">
            <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="product-details">
            <span class="name">${product.name}</span>
            <span class="amt">Rs.${product.amt}</span>
            <span class="seller">${product.seller}</span>
            <span class="rating">Rating: ${product.rating}</span>
        </div>
    </div>`
            )
            .join("");

        productsContainer.innerHTML = product_details;
    } else {
        productsContainer.innerHTML = "<h3>No Products Available</h3>";
    }
}

function setCategories() {
    const allCategories = data.map((product) => product.catagory);
    const categories = [
        "All",
        ...allCategories.filter((category, index) => {
            return allCategories.indexOf(category) === index;
        }),
    ];
    categoryList.innerHTML = categories.map((category) => `<li>${category}</li>`).join("");

    categoryList.addEventListener("click", (e) => {
        const selectedCategory = e.target.textContent;
        selectedCategory === "All" ? displayProducts(data) : displayProducts(data.filter((product) => product.catagory === selectedCategory));
    });
}

const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");

function setPrices() {
    const priceList = data.map((product) => product.amt);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceValue.textContent = "Rs." + maxPrice;

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "Rs." + e.target.value;
        displayProducts(data.filter((product) => product.amt <= e.target.value));
    });
}

const txtSearch = document.querySelector("#txtSearch");
txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
        displayProducts(data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
    } else {
        displayProducts(data);
    }
});

displayProducts(data);
setCategories();
setPrices();
