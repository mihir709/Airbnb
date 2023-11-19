document.addEventListener('DOMContentLoaded', function () {
    const app = new Vue({
        el: '#property-listings',
        data: {
            location: '',
            date: '',
            priceRange: 500,
            listings: [
                { id: 1, location: 'City A', price: 300, amenities: ['Wi-Fi', 'Kitchen','24-hour Electricity','Gym'], liked: false, booked: false, rating: 4 },
                { id: 2, location: 'City B', price: 500, amenities: ['Pool', 'Gym','Wi-Fi','Balcony'], liked: false, booked: false, rating: 5 },
                { id: 3, location: 'City C', price: 400, amenities: ['Ocean View', 'Balcony','Wi-Fi','Gym'], liked: false, booked: false, rating: 4 },
                { id: 4, location: 'City D', price: 600, amenities: ['Spa', 'Private Garden','Wi-Fi','Gym'], liked: false, booked: false, rating: 5 },
                
                
            ],
            selectedProperty: null,
        },
        computed: {
            filteredListings: function () {
                const location = this.location.trim().toLowerCase();
                const date = this.date;
                const priceRange = this.priceRange;

                return this.listings.filter(listing => {
                    const isLocationMatch = location === '' || listing.location.toLowerCase().includes(location);
                    
                    const isPriceRangeMatch = listing.price <= priceRange;

                    return isLocationMatch && isPriceRangeMatch;
                });
            },
        },
        methods: {
            toggleLike: function (listing) {
                listing.liked = !listing.liked;
            },
            openModal: function (listing) {
                this.selectedProperty = listing;
                const modal = document.getElementById('modal');
                modal.style.display = 'block';
                this.updateModalContent();
            },
            closeModal: function () {
                const modal = document.getElementById('modal');
                modal.style.display = 'none';
            },
            bookProperty: function () {
                if (this.selectedProperty && !this.selectedProperty.booked) {
                    this.selectedProperty.booked = true;
                    this.closeModal();
                    alert(`Property in ${this.selectedProperty.location} booked successfully!`);
                } else {
                    alert('This property is already booked.');
                }
            },
            updateModalContent: function () {
                const modalTitle = document.getElementById('modal-title');
                const modalPrice = document.getElementById('modal-price');
                const modalAmenities = document.getElementById('modal-amenities');
                const starRatingContainer = document.getElementById('star-rating');

                modalTitle.textContent = this.selectedProperty.location;
                modalPrice.textContent = `Price: $${this.selectedProperty.price}`;
                modalAmenities.textContent = `Amenities: ${this.selectedProperty.amenities.join(', ')}`;

                
                starRatingContainer.innerHTML = '';

                
                for (let i = 0; i < this.selectedProperty.rating; i++) {
                    const star = document.createElement('div');
                    star.classList.add('star');
                    star.textContent = '★';
                    starRatingContainer.appendChild(star);
                }
            },
            formatPrice: function (price) {
                return `$${price}`;
            },
        },
        template: `
            <div class="property-list">
                <div v-for="listing in filteredListings" :key="listing.id" class="card" @click="openModal(listing)">
                    <h3>{{ listing.location }}</h3>
                    <p>Price: {{ formatPrice(listing.price) }}</p>
                    <p>Amenities: {{ listing.amenities.join(', ') }}</p>
                    <div class="star-rating" v-if="listing.rating">
                        <div v-for="star in listing.rating" class="star">&#9733;</div>
                    </div>
                    <button @click.stop="toggleLike(listing)" :class="{ 'liked': listing.liked }">Like</button>
                    <button @click.stop="bookProperty" :disabled="listing.booked">Book</button>
                </div>
            </div>
        `,
    });

    
    const closeModalButton = document.querySelector('.close');
    const bookNowButton = document.getElementById('book-btn');

    closeModalButton.addEventListener('click', function () {
        app.closeModal();
    });

    bookNowButton.addEventListener('click', function () {
        app.bookProperty();
    });

    const locationInput = document.getElementById('location');
    const dateInput = document.getElementById('date');
    const priceRangeInput = document.getElementById('price-range');
    const priceValueSpan = document.getElementById('price-value');
    const searchButton = document.getElementById('search-btn');

   
    priceRangeInput.addEventListener('input', function () {
        priceValueSpan.textContent = `$${this.value}`;
        app.priceRange = parseInt(this.value);
    });

    
    searchButton.addEventListener('click', function () {
        app.location = locationInput.value;
        app.date = dateInput.value;
    });
});
