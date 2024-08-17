document.addEventListener('DOMContentLoaded', () => {
    const menuItems = {
        appetizers: [
            { name: 'Paneer Tikka', description: 'Grilled paneer cubes marinated in a blend of spices, served with mint chutney.', price: '₹220', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Paneer_Tikka_Shashlik_PK012.jpg/640px-Paneer_Tikka_Shashlik_PK012.jpg' },
            { name: 'Chicken Wings', description: 'Crispy fried chicken wings seasoned with a spicy and tangy coating.', price: '₹280', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Air-Fryer-Chicken-Wings-d2c6fa4.jpg' },
            { name: 'Mutton Seekh Kebab', description: 'Tender minced mutton skewers grilled to perfection with aromatic spices.', price: '₹320', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncQXiRj3OYs-ofsovM0vRWd4qAbcxXDH6EA&s' },
            { name: 'Fish Fry', description: 'Crunchy and golden fried fish fillets, lightly spiced for a crispy bite.', price: '₹300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_jkRBlV-TQjXn56fggbgbgi4_j9H2kNmcQ&s' }
        ],
        mainCourses: [

            { name: 'Chicken Biryani', description: 'Aromatic rice dish layered with spicy marinated chicken, garnished with fried onions and fresh herbs.', price: '₹400', image: 'https://www.awesomecuisine.com/wp-content/uploads/2007/10/Chicken-Biryani_resized-500x436.jpg' },
            { name: 'Mutton Biryani', description: 'Fragrant rice cooked with tender pieces of mutton, spices, and herbs, offering a rich and flavorful experience.', price: '₹450', image: 'https://i.ytimg.com/vi/s4YsKuoYTe8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA8DNcG2opFjrju1AlULhM7SOQLfA' },
            { name: 'Butter Chicken', description: 'Succulent pieces of chicken simmered in a creamy, buttery tomato gravy.', price: '₹350', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400' },
            { name: 'Paneer Butter Masala', description: 'Soft paneer cubes in a rich and creamy butter-based tomato sauce.', price: '₹300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpiCiOVd2z7Qhnu1FDY90QF7zkYcLfP1jgyA&s' },
            { name: 'Fish Curry', description: 'Delicately spiced fish cooked in a tangy and fragrant curry sauce.', price: '₹320', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsw-eav9dsAQYA_wH_lbQ4M4nXf9j_WRXyrg&s' }
        ],
        desserts: [
            { name: 'Gulab Jamun', description: 'Soft and spongy deep-fried dough balls soaked in a fragrant sugar syrup.', price: '₹100', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ321oD8PPlAakIa_zqLt_kFeToBplXfCsMug&s' },
            { name: 'Ras Malai', description: 'Light and fluffy cottage cheese balls immersed in a sweetened, creamy milk sauce.', price: '₹120', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAo3kz8rMjy7saXJWEjopLUr3Arq6h1TMaQ&s' },
            { name: 'Ice Cream Sundae', description: 'Delicious vanilla ice cream topped with an assortment of fruits, nuts, and chocolate sauce.', price: '₹150', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmoMj74C2e5v3q-zRoGhqf-W2gCiKsktQlKA&s' },
            { name: 'Brownie with Ice Cream', description: 'Warm and fudgy brownie served with a scoop of rich vanilla ice cream.', price: '₹180', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOqEflBfXPO_OeKzgo9rsjFt_72z-NGTAa2A&s' }
        ],
        beverages: [
            { name: 'Mango Lassi', description: 'Refreshing and creamy yogurt-based mango drink with a hint of cardamom.', price: '₹80', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9a8gscUgHBC7Wx5nCA_1Q6lM5hcAjno3dw&s' },
            { name: 'Masala Chai', description: 'Traditional Indian tea brewed with a blend of spices and milk.', price: '₹60', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTV97haGKMKYtfnn50N1H32sNejlF-z54SdA&s' },
            { name: 'Cold Coffee', description: 'Chilled coffee blended with ice, topped with a layer of whipped cream.', price: '₹100', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pltA2U43TSDjBfxH5oQ6wyne1-xVE5eJdg&s' },
            { name: 'Fresh Lime Soda', description: 'Crisp and refreshing soda with a tangy lime flavor and a touch of mint.', price: '₹50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeQxlQC87d8GWfHn0BcF50bVPibZPR0NLfg&s' }
        ]
    };

    const categorySelect = document.getElementById('category');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const itemModal = document.getElementById('item-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeBtn = document.getElementsByClassName('close')[0];
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    let cart = [];

    function updateMenuList(category = '') {
        Object.keys(menuItems).forEach(cat => {
            const list = document.getElementById(`${cat}-list`);
            list.innerHTML = '';
            menuItems[cat].forEach(item => {
                if (!category || category === cat) {
                    const menuItem = document.createElement('div');
                    menuItem.classList.add('menu-item');
                    menuItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="menu-details">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <span>${item.price}</span>
                        </div>
                    `;
                    menuItem.addEventListener('click', () => {
                        showModal(item);
                    });
                    list.appendChild(menuItem);
                }
            });
        });
    }

    function showModal(item) {
        modalImage.src = item.image;
        modalTitle.textContent = item.name;
        modalDescription.textContent = item.description;
        modalPrice.textContent = item.price;
        itemModal.style.display = 'flex';

        addToCartBtn.onclick = () => {
            addToCart(item);
        };
    }

    function addToCart(item) {
        cart.push(item);
        updateCart();
        itemModal.style.display = 'none';
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = () => {
                removeFromCart(index);
            };
            li.appendChild(removeBtn);
            cartItems.appendChild(li);
            total += parseInt(item.price.replace('₹', ''));
        });
        cartTotal.textContent = `Total: ₹${total}`;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    categorySelect.addEventListener('change', (e) => {
        updateMenuList(e.target.value);
    });

    closeBtn.onclick = () => {
        itemModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === itemModal) {
            itemModal.style.display = 'none';
        }
    };

    cartIcon.addEventListener('click', () => {
        const cart = document.getElementById('cart');
        cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
    });

    const backToTopBtn = document.getElementById('backToTopBtn');
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

    backToTopBtn.onclick = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    updateMenuList();
});
