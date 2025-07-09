const products = [
    { id: 1, name: 'Mechanical Keyboard X100', price: 768999, imgfile: './resources/images/keyboardx100.webp' },
    { id: 2, name: 'ProGaming Mouse Z5', price: 245999, imgfile: './resources/images/mousez5.jpeg' },
    { id: 3, name: 'Game Controller Rossevelt V', price: 378000, imgfile: './resources/images/controllerxg56.jpg' },
    { id: 4, name: 'Steelseries Arctics', price: 1489500, imgfile: './resources/images/arctics.jpg' },
    { id: 5, name: 'Gaming Chair M23', price: 3125000, imgfile: './resources/images/chair.png' },
    { id: 6, name: 'Desk Mat Linq K90', price: 256900, imgfile: './resources/images/deskmat.png' },
    { id: 7, name: 'Stand Headset + Usb Hub', price: 147899, imgfile: './resources/images/headsetstand.png' },
    { id: 8, name: 'Edifier Speaker BV90', price: 5238789, imgfile: './resources/images/speaker.png' },
    // Opsional: Perbaiki data nomor 9 dengan nama hbkbungee dan nomor 10 pada harga
    { id: 9, name: 'Razer Seiren V2 Pro', price: 1482500, imgfile: './resources/images/hbkbungee.png' },
    { id: 10, name: 'Electrical Desk Sit Standing MK II', price: 1499500, imgfile: './resources/images/table.png' },
]

// Lengkapi untuk menyimpan cart ke local storage agar di restart tidak hilang
let cart = []

const productsGrid = document.getElementById('productsGrid')
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const resetCartBtn = document.getElementById('resetcart');

document.addEventListener('DOMContentLoaded', function () {
    renderProductList()
    loadFromLocalStrg()
    renderCart()
})

function renderProductList() {
    productsGrid.innerHTML = ''

    products.forEach(product => {
        const productCard = document.createElement('div')
        productCard.className = 'product-card'
        productCard.innerHTML = `
        <h3>${product.name}</h3>
        <img src=${product.imgfile}>
        <p class="product-price">${formatRupiah(product.price)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        // Menggunakan petik miring ` `
        productsGrid.appendChild(productCard)
    })

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart)
    })
}

// function addToCart(e) {
//    //Yeet!
//    console.log("Yeet");
// }
// Melengkapi fungsi addToCart untuk menambahkan produk ke keranjang belanja
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imgfile: product.imgfile,
            quantity: 1
        });
    }

    renderCart();
    saveToLocalStrg();
}

// Melengkapi fungsi renderCart untuk menampilkan produk dalam keranjang belanja
// function renderCart(){
//     //Yeet!
//    console.log("Yeet");
// }
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = 'Total: ' + formatRupiah(0);
        checkoutBtn.disabled = true;
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Price: ${formatRupiah(item.price)}</p>

                    <p>Quantity: ${item.quantity}</p>
                    
                    </div>


                
                <div class="cart-item-total">${formatRupiah(itemTotal)}</div>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = 'Total: ' + formatRupiah(total);
    checkoutBtn.disabled = false;
}

// fungsi untuk menyimpan produk ke local storage
// function saveToLocalStrg() {
//     //Yeet!
//    console.log("Yeet");
// }
function saveToLocalStrg() {
    try {
        localStorage.setItem('progaming_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
}

// Fungsi untuk memuat cart dari local storage
// Perbaikan UAS
function loadFromLocalStrg() {
    try {
        const savedCart = localStorage.getItem('progaming_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        cart = []; 
    }
}

resetCartBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        renderCart();
        saveToLocalStrg();
    }
})

function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Gunakan setelah price
// hilangkan quantity jika ingin menggunakan fungi tambahan/opsional
/* <p>Quantity: ${item.quantity}</p> */

// Gunakan sebelum  class: cart-item-total
// Opsional: Menambahkan elemen HTML untuk setiap item dalam keranjang belanja
/* <div class="cart-item-controls">
    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
    <span class="quantity">${item.quantity}</span>
    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
</div>  */


// Opsional: fungsi 
// Di tempatkan setelah fungsi loadFromLocalStrg
// fungsi untuk load cart dari local storage
// function loadFromLocalStrg() {
//     //Yeet!
//    console.log("Yeet");
// }
// function loadFromLocalStrg() {
//     try {
//         const savedCart = localStorage.getItem('progaming_cart');
//         if (savedCart) {
//             cart = JSON.parse(savedCart);
//         }
//     } catch (error) {
//         console.error('Failed to load cart from localStorage:', error);
//         cart = []; // Reset to empty cart if loading fails
//     }
// }

// fungsi tambahan Opsional untuk menambah, mengurangi, dan menghapus item dari keranjang belanja
// function increaseQuantity(productId) {
//     const item = cart.find(item => item.id === productId);
//     if (item) {
//         item.quantity += 1;
//         renderCart();
//         saveToLocalStrg();
//     }
// }

// function decreaseQuantity(productId) {
//     const item = cart.find(item => item.id === productId);
//     if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         renderCart();
//         saveToLocalStrg();
//     }
// }

// function removeFromCart(productId) {
//     cart = cart.filter(item => item.id !== productId);
//     renderCart();
//     saveToLocalStrg();
// }


// fungsi tombol untuk mereset cart/keranjang belanja
// resetCartBtn.addEventListener('click', function(){
//     //Yeet!
//    console.log("Yeet");
// })