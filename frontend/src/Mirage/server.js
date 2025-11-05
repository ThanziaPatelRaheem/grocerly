import { createServer, Model } from "miragejs";
import { Server, Response } from "miragejs";

// --- Helper function for cleaner data generation ---
const processProduct = (product, isTrending = false, isRecommended = false) => {
  const baseName = product.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const stockCount = Math.floor(Math.random() * 46) + 5;
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    unit: product.weight, // Renamed 'weight' to 'unit' for clarity
    category: product.category,
    stock: stockCount,
    // Add Richer Detail Properties
    description: `Fresh and high-quality ${product.name} (${product.weight}). Essential groceries for your kitchen.`,

    // Image Array for Carousel (Using placeholder structure)
    images: [
      `/images/apples.png`,

      `/images/apples-1.png`,
      `/images/apples-2.png`,
    ],

    // Filtering Properties
    isTrending: isTrending,
    isRecommended: isRecommended,

    // Reviews and Rating
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 100) + 10,
  };
};
// 🛑 CORRECTION: The helper function must end here (removed misplaced closing brace)

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      product: Model,
      user: Model,
      order: Model,
    },

    seeds(server) {
      // --- 30 Product Items ---

      // 1. FRUITS (Trending/Recommended)
      server.create(
        "product",
        processProduct(
          {
            id: "101",
            name: "Organic Red Apples",
            price: 2.99,
            weight: "1 lb bag",
            category: "fruits",
          },
          true,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "103",
            name: "Bananas (Dozen)",
            price: 1.89,
            weight: "1 dozen",
            category: "fruits",
          },
          false,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "104",
            name: "Hass Avocados",
            price: 1.5,
            weight: "each",
            category: "fruits",
          },
          true,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "105",
            name: "Seedless Red Grapes",
            price: 4.99,
            weight: "2 lb container",
            category: "fruits",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "106",
            name: "Strawberries",
            price: 4.25,
            weight: "16 oz container",
            category: "fruits",
          },
          true,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "107",
            name: "Blueberries",
            price: 5.5,
            weight: "6 oz container",
            category: "fruits",
          },
          false,
          true
        )
      );

      // 2. DAIRY & EGGS
      server.create(
        "product",
        processProduct(
          {
            id: "102",
            name: "Fresh Whole Milk",
            price: 4.5,
            weight: "1 gallon",
            category: "dairy",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "210",
            name: "Large Brown Eggs",
            price: 3.89,
            weight: "1 dozen",
            category: "dairy",
          },
          true,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "211",
            name: "Unsalted Butter",
            price: 5.25,
            weight: "1 lb",
            category: "dairy",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "212",
            name: "Greek Yogurt Plain",
            price: 5.99,
            weight: "32 oz tub",
            category: "dairy",
          },
          true,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "213",
            name: "Sharp Cheddar Slices",
            price: 4.75,
            weight: "8 oz pack",
            category: "dairy",
          },
          false,
          false
        )
      );

      // 3. VEGETABLES
      server.create(
        "product",
        processProduct(
          {
            id: "205",
            name: "Organic Arugula Salad Mix",
            price: 3.25,
            weight: "5 oz bag",
            category: "vegetables",
          },
          false,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "301",
            name: "Roma Tomatoes",
            price: 0.99,
            weight: "per lb",
            category: "vegetables",
          },
          true,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "302",
            name: "Baby Carrots",
            price: 1.79,
            weight: "12 oz bag",
            category: "vegetables",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "303",
            name: "Red Onion",
            price: 0.75,
            weight: "each",
            category: "vegetables",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "304",
            name: "Broccoli Crowns",
            price: 2.19,
            weight: "per lb",
            category: "vegetables",
          },
          false,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "305",
            name: "Russet Potatoes",
            price: 3.5,
            weight: "5 lb bag",
            category: "vegetables",
          },
          true,
          false
        )
      );

      // 4. MEATS
      server.create(
        "product",
        processProduct(
          {
            id: "401",
            name: "Ground Beef (80/20)",
            price: 6.99,
            weight: "1 lb pack",
            category: "meat & poultry",
          },
          true,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "402",
            name: "Boneless Chicken Breast",
            price: 9.5,
            weight: "2 lb pack",
            category: "meat & poultry",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "403",
            name: "Pork Chops",
            price: 7.25,
            weight: "1 lb pack",
            category: "meat & poultry",
          },
          false,
          false
        )
      );

      // 5. BAKERY
      server.create(
        "product",
        processProduct(
          {
            id: "501",
            name: "Whole Wheat Bread",
            price: 3.49,
            weight: "1 loaf",
            category: "snacks & candy",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "502",
            name: "Chocolate Chip Cookies",
            price: 5.99,
            weight: "12 count",
            category: "snacks & candy",
          },
          true,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "503",
            name: "English Muffins",
            price: 2.75,
            weight: "6 count",
            category: "snacks & candy",
          },
          false,
          true
        )
      );

      // 6. BEVERAGES
      server.create(
        "product",
        processProduct(
          {
            id: "601",
            name: "Sparkling Water",
            price: 7.99,
            weight: "12 pack",
            category: "beverages",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "602",
            name: "Orange Juice",
            price: 3.99,
            weight: "52 oz carton",
            category: "beverages",
          },
          true,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "603",
            name: "Black Coffee Grounds",
            price: 8.5,
            weight: "12 oz bag",
            category: "beverages",
          },
          false,
          false
        )
      );

      // 7. FROZEN (New Category)
      server.create(
        "product",
        processProduct(
          {
            id: "701",
            name: "Frozen Peas",
            price: 2.49,
            weight: "16 oz bag",
            category: "frozen foods",
          },
          false,
          false
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "702",
            name: "Frozen French Fries",
            price: 3.89,
            weight: "20 oz bag",
            category: "frozen foods",
          },
          true,
          false
        )
      );

      // 8. PANTRY (New Category)
      server.create(
        "product",
        processProduct(
          {
            id: "801",
            name: "Canned Black Beans",
            price: 0.99,
            weight: "15 oz can",
            category: "pantry",
          },
          true,
          true
        )
      );
      server.create(
        "product",
        processProduct(
          {
            id: "802",
            name: "Pasta Spaghetti",
            price: 1.5,
            weight: "1 lb box",
            category: "pantry",
          },
          false,
          false
        )
      );
      // Demo user for login
      server.create("user", {
        id: "u1",
        name: "Demo User",
        email: "demo@example.com",
        password: "secret123",
        role: "user",
        createdAt: new Date().toISOString(),
      });
      server.create("user", {
        id: "admin1",
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
      });
    },

    routes() {
      this.namespace = "api"; // Base namespace for all routes

      // GET /api/me
      this.get("/me", (schema, request) => {
        // (A) simplest: always return the first user
        const user = schema.users.first();

        // If you want a tiny auth check, uncomment B and remove A:
        // (B) token check (expects "Authorization: Bearer mock-jwt-token")
        // const auth = request.requestHeaders?.Authorization || "";
        // if (!auth.startsWith("Bearer ")) {
        //   return new Response(401, { "Content-Type": "application/json" }, { message: "Unauthorized" });
        // }
        // const token = auth.replace("Bearer ", "");
        // if (token !== "mock-jwt-token") {
        //   return new Response(401, { "Content-Type": "application/json" }, { message: "Invalid token" });
        // }
        // const user = schema.users.first();

        if (!user) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            { message: "User not found" }
          );
        }

        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              createdAt: user.attrs.createdAt,
            },
          }
        );
      });

      this.post("/register", (schema, request) => {
        const { name, email, password } = JSON.parse(
          request.requestBody || "{}"
        );

        // 1) Basic validation
        if (!name || !email || !password) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "Name, email and password are required" }
          );
        }

        // 2) Duplicate check
        const existing = schema.users.findBy({ email });
        if (existing) {
          return new Response(
            409,
            { "Content-Type": "application/json" },
            { message: "Email already exists" }
          );
        }

        // 3) Create user (Mirage stores this in memory)
        const user = schema.users.create({
          // you can generate an id as you like:
          id: `u_${Date.now()}`,
          name,
          email,
          password,
          role: "user",
          createdAt: new Date().toISOString(), // ⚠️ plain text only for mock server; never do this in real backend
        });

        // 4) Return a similar payload to /login for consistency
        return new Response(
          201,
          { "Content-Type": "application/json" },
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              createdAt: user.attrs.createdAt,
            },
            token: "mock-jwt-token",
          }
        );
      });

      // ⬇️ add this below namespace (order doesn’t matter vs /products)
      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody || "{}");

        if (!email || !password) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            {
              message: "Email and password are required",
            }
          );
        }

        const user = schema.users.findBy({ email });
        if (!user || user.password !== password) {
          return new Response(
            401,
            { "Content-Type": "application/json" },
            {
              message: "Invalid email or password",
            }
          );
        }

        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              createdAt: user.attrs.createdAt,
            },
            token: "mock-jwt-token",
          }
        );
      });

      // server.js
      this.post("/logout", () => {
        return new Response(
          200,
          { "Content-Type": "application/json" },
          { success: true, message: "Logged out" }
        );
      });

      this.patch("/me/update", (schema, request) => {
        const attrs = JSON.parse(request.requestBody || "{}");
        const user = schema.users.first();

        if (!user) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            { message: "User not found" }
          );
        }

        // (Optional) basic email uniqueness check
        if (attrs.email) {
          const existing = schema.users.findBy({ email: attrs.email });
          if (existing && existing.id !== user.id) {
            return new Response(
              409,
              { "Content-Type": "application/json" },
              { message: "Email already in use" }
            );
          }
        }

        // Only allow specific fields
        const allowed = ["name", "email"];
        const updates = {};
        for (const k of allowed)
          if (attrs[k] !== undefined) updates[k] = attrs[k];

        user.update(updates);

        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              createdAt: user.attrs.createdAt,
            },
          }
        );
      });

      // Change password
      this.patch("/me/update-password", (schema, request) => {
        const { currentPassword, newPassword, confirmPassword } = JSON.parse(
          request.requestBody || "{}"
        );

        // 1) Basic payload checks
        if (!currentPassword || !newPassword || !confirmPassword) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "All fields are required" }
          );
        }

        // 2) Simple password rules (mirror your UI rules)
        if (newPassword.length < 6) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "New password must be at least 6 characters" }
          );
        }

        if (newPassword !== confirmPassword) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "New password and confirm password do not match" }
          );
        }

        // 3) Find "current" user (simple demo: first user)
        const user = schema.users.first();
        if (!user) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            { message: "User not found" }
          );
        }

        // 4) Verify current password
        if (user.password !== currentPassword) {
          return new Response(
            401,
            { "Content-Type": "application/json" },
            { message: "Current password is incorrect" }
          );
        }

        // 5) Prevent reusing the same password
        if (currentPassword === newPassword) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "New password must be different from current password" }
          );
        }

        // 6) Update password
        user.update({ password: newPassword });

        // 7) Return a simple success payload (no user object needed)
        return new Response(
          200,
          { "Content-Type": "application/json" },
          { success: true, message: "Password updated" }
        );
      });

      // request reset
      this.post("/auth/forgot-password", (schema, request) => {
        const { email } = JSON.parse(request.requestBody || "{}");
        // Always 200 with generic message (don’t leak which emails exist)
        const user = schema.users.findBy({ email });
        if (user) {
          const token = Math.random().toString(36).slice(2);
          const expires = Date.now() + 1000 * 60 * 15; // 15 minutes
          user.update({ resetToken: token, resetTokenExpires: expires });
          // In a real app you'd email `token` as a link
        }
        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            message: "If that email exists, we’ve sent a reset link.",
          }
        );
      });

      // reset with token
      this.post("/auth/reset-password", (schema, request) => {
        const { token, newPassword, confirmPassword } = JSON.parse(
          request.requestBody || "{}"
        );
        if (!token || !newPassword || !confirmPassword) {
          return new Response(400, {}, { message: "All fields are required" });
        }
        if (newPassword !== confirmPassword) {
          return new Response(400, {}, { message: "Passwords do not match" });
        }
        const user = schema.users.findBy({ resetToken: token });
        if (
          !user ||
          !user.resetTokenExpires ||
          Date.now() > user.resetTokenExpires
        ) {
          return new Response(400, {}, { message: "Invalid or expired token" });
        }
        user.update({
          password: newPassword,
          resetToken: null,
          resetTokenExpires: null,
        });
        return new Response(
          200,
          { "Content-Type": "application/json" },
          { message: "Password reset successful" }
        );
      });

      this.post("/orders/new", (schema, request) => {
        const {
          shippingInfo,
          orderItems = [], // ← your key
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          paymentInfo = {}, // { status: "Not Paid" | "Paid" | ... }
          paymentMethod, // "COD" | "Card"
        } = JSON.parse(request.requestBody || "{}");

        // Basic validation
        if (!orderItems.length) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "orderItems are required" }
          );
        }
        if (!paymentMethod) {
          return new Response(
            400,
            { "Content-Type": "application/json" },
            { message: "paymentMethod is required" }
          );
        }

        // Normalize casing for internal logic
        const method = String(paymentMethod).toLowerCase(); // "cod" | "card"

        // In a real backend, you'd re-calc totals on the server.
        // For Mirage mock, we'll trust the client values if provided, else compute.
        const computedItemsPrice = Number(
          orderItems
            .reduce(
              (sum, i) => sum + Number(i.price) * Number(i.quantity || 1),
              0
            )
            .toFixed(2)
        );
        const safeItemsPrice = itemsPrice ?? computedItemsPrice;
        const safeShippingPrice =
          shippingPrice ?? (safeItemsPrice >= 50 ? 0 : 4.99);
        const safeTaxPrice =
          taxPrice ?? Number((safeItemsPrice * 0.07).toFixed(2));
        const safeTotalPrice =
          totalPrice ??
          Number(
            (safeItemsPrice + safeShippingPrice + safeTaxPrice).toFixed(2)
          );

        const user = schema.users.first();

        // You can either store "orderItems" as-is, or map to "items"
        const order = schema.create("order", {
          id: `ord_${Date.now()}`,
          userId: user?.id ?? null,
          orderItems, // keep your client key
          shippingInfo,
          paymentMethod, // "COD" | "Card"
          paymentInfo: {
            status:
              paymentInfo.status ??
              (method === "card" ? "Pending" : "Not Paid"),
          },
          status: "created",
          itemsPrice: safeItemsPrice,
          shippingPrice: safeShippingPrice,
          taxPrice: safeTaxPrice,
          totalPrice: safeTotalPrice,
          createdAt: new Date().toISOString(),
        });

        return new Response(
          201,
          { "Content-Type": "application/json" },
          {
            success: true,
            order: order.attrs,
          }
        );
      });

      // 🛑 CRITICAL: Route needs to be defined from the namespace down.
      // If baseQuery is '/api/v1', the route here should be '/v1/products'
      this.get("/products", (schema, request) => {
        let filteredProducts = schema.products.all().models;
        // console.log("Total Products in Mirage:", filteredProducts.length);
        const queryParams = request.queryParams;
        const keyword = request.queryParams.keyword;

        // --- 1. SEARCH FILTER LOGIC (MUST come first) ---
        if (keyword) {
          const lowerCaseKeyword = keyword.toLowerCase();

          // Filter products where the name OR description contains the keyword
          filteredProducts = filteredProducts.filter((p) => {
            const nameMatch = p.name.toLowerCase().includes(lowerCaseKeyword);
            const descriptionMatch = p.description
              .toLowerCase()
              .includes(lowerCaseKeyword);

            return nameMatch || descriptionMatch;
          });
        }
        // --- 3. PRICE FILTERING LOGIC (NEWLY ADDED) ---
        const minPrice = queryParams["price[gte]"];
        const maxPrice = queryParams["price[lte]"];

        if (minPrice || maxPrice) {
          filteredProducts = filteredProducts.filter((product) => {
            // Ensure price is treated as a number
            const price = product.price;

            // Check if the price is greater than or equal to the minimum
            const minCheck = minPrice ? price >= parseFloat(minPrice) : true;

            // Check if the price is less than or equal to the maximum
            const maxCheck = maxPrice ? price <= parseFloat(maxPrice) : true;

            return minCheck && maxCheck;
          });
        }
        const isTrending = request.queryParams.isTrending;
        const isRecommended = request.queryParams.isRecommended;

        if (isTrending === "true") {
          // If the query is set to true, apply the filter
          filteredProducts = filteredProducts.filter((p) => p.isTrending);
        }
        if (isRecommended === "true") {
          // If the query is set to true, apply the filter
          filteredProducts = filteredProducts.filter((p) => p.isRecommended);
        }
        const category = request.queryParams.category;
        if (category) {
          const wanted = String(category).toLowerCase();
          filteredProducts = filteredProducts.filter(
            (p) => String(p.category || "").toLowerCase() === wanted
          );
        }

        console.log("Products AFTER FILTERING:", filteredProducts.length);

        const page = parseInt(request.queryParams.page) || 1;
        const limit = parseInt(request.queryParams.limit) || 12;

        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / limit);

        const skip = limit * (page - 1);

        const paginatedProducts = filteredProducts.slice(skip, skip + limit);

        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            success: true,
            products: paginatedProducts,
            totalProducts,
            totalPages,
            itemsPerPage: limit,
            currentPage: page,
            keyword: keyword || null,
          }
        );
      });

      this.get("/products/:id", (schema, request) => {
        return schema.products.find(request.params.id);
      });
    },
  });
}
