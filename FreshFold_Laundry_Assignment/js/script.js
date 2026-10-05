/*
      ==========================================================
      EMAILJS SETUP
      ==========================================================
      1. Create an account at https://www.emailjs.com/
      2. Create an Email Service.
      3. Create an Email Template with variables such as:
         {{fullName}}, {{email}}, {{phone}}, {{orderDetails}}, {{totalAmount}}
      4. Replace the 3 placeholder values below.
      5. In the EmailJS template, set the recipient email to YOUR email address.
    */
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

    if (window.emailjs) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const services = [
      { id: 1, name: "Dry Cleaning", price: 200, icon: "🧺" },
      { id: 2, name: "Wash & Fold", price: 100, icon: "👕" },
      { id: 3, name: "Ironing", price: 30, icon: "♨️" },
      { id: 4, name: "Stain Removal", price: 500, icon: "🧼" },
      { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "🧥" },
      { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
    ];

    const cart = new Map();

    const serviceList = document.getElementById("serviceList");
    const cartBody = document.getElementById("cartBody");
    const emptyCart = document.getElementById("emptyCart");
    const totalAmount = document.getElementById("totalAmount");

    function formatPrice(value) {
      return "₹" + value.toLocaleString("en-IN");
    }

    function renderServices() {
      serviceList.innerHTML = services.map(service => {
        const added = cart.has(service.id);
        return `
          <div class="service-row">
            <div class="service-info">
              <div class="service-icon">${service.icon}</div>
              <div>
                <div class="service-name">${service.name}</div>
                <div class="service-price">${formatPrice(service.price)}</div>
              </div>
            </div>
            <div class="service-actions">
              <button class="remove-btn" onclick="removeItem(${service.id})">Remove Item ⊖</button>
              <button class="add-btn" onclick="addItem(${service.id})">
                ${added ? "Added ✓" : "Add Item ⊕"}
              </button>
            </div>
          </div>
        `;
      }).join("");
    }

    function addItem(id) {
      if (!cart.has(id)) cart.set(id, 1);
      render();
    }

    function removeItem(id) {
      cart.delete(id);
      render();
    }

    function renderCart() {
      if (cart.size === 0) {
        cartBody.innerHTML = "";
        emptyCart.style.display = "block";
        totalAmount.textContent = "₹0";
        return;
      }

      emptyCart.style.display = "none";
      let total = 0;
      let number = 1;

      cartBody.innerHTML = [...cart.keys()].map(id => {
        const service = services.find(s => s.id === id);
        total += service.price;
        return `<tr>
          <td>${number++}</td>
          <td>${service.name}</td>
          <td>${formatPrice(service.price)}</td>
        </tr>`;
      }).join("");

      totalAmount.textContent = formatPrice(total);
    }

    function render() {
      renderServices();
      renderCart();
    }

    document.getElementById("heroBookBtn").addEventListener("click", () => {
      document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("bookingForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const errorBox = document.getElementById("formError");
      const successBox = document.getElementById("successMessage");
      errorBox.style.display = "none";
      successBox.style.display = "none";

      if (cart.size === 0) {
        errorBox.textContent = "Please add at least one service to the cart before booking.";
        errorBox.style.display = "block";
        return;
      }

      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();

      const orderDetails = [...cart.keys()]
        .map(id => {
          const s = services.find(item => item.id === id);
          return `${s.name} - ${formatPrice(s.price)}`;
        })
        .join(", ");

      const total = [...cart.keys()]
        .reduce((sum, id) => sum + services.find(s => s.id === id).price, 0);

      const templateParams = {
        fullName: name,
        email: email,
        phone: phone,
        orderDetails: orderDetails,
        totalAmount: formatPrice(total),
        to_email: "YOUR_EMAIL@example.com"
      };

      /*
        During development, the assignment still works as a UI demo if
        EmailJS credentials are not filled. For actual email delivery,
        replace the placeholders above with your EmailJS credentials.
      */
      const credentialsReady =
        !EMAILJS_PUBLIC_KEY.includes("YOUR_") &&
        !EMAILJS_SERVICE_ID.includes("YOUR_") &&
        !EMAILJS_TEMPLATE_ID.includes("YOUR_");

      try {
        if (credentialsReady) {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
          );
        } else {
          console.warn("EmailJS credentials are placeholders. Add your EmailJS credentials to enable email delivery.");
        }

        successBox.style.display = "block";
        document.getElementById("bookingForm").reset();
        cart.clear();
        render();
      } catch (error) {
        console.error(error);
        errorBox.textContent = "Booking was created, but the confirmation email could not be sent. Check your EmailJS credentials.";
        errorBox.style.display = "block";
      }
    });

    document.getElementById("newsletterForm").addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById("newsletterMsg").style.display = "block";
      event.target.reset();
    });

    document.getElementById("menuBtn").addEventListener("click", () => {
      document.getElementById("navLinks").classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("open");
      });
    });

    render();
