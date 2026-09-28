import { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    title: "چراغ رومیزی Galaxy",
    category: "دکور و ترند",
    price: 1290000,
    oldPrice: 1690000,
    badge: "ترند",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "کیف دوشی مینیمال Luna",
    category: "اکسسوری",
    price: 890000,
    oldPrice: 1190000,
    badge: "محبوب",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "هدفون بی‌سیم AirBeat",
    category: "گجت هوشمند",
    price: 2190000,
    oldPrice: 2790000,
    badge: "جدید",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    title: "عینک آفتابی Retro",
    category: "اکسسوری",
    price: 690000,
    oldPrice: 920000,
    badge: "ترند",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    title: "چراغ خواب هوشمند Aura",
    category: "گجت هوشمند",
    price: 1490000,
    oldPrice: 1890000,
    badge: "ویژه",
    image:
      "https://images.unsplash.com/photo-1555488205-8a0d7b4f0c8a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    title: "گردنبند زنجیری Nova",
    category: "اکسسوری",
    price: 540000,
    oldPrice: 720000,
    badge: "محبوب",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    title: "ساعت هوشمند Pulse",
    category: "گجت هوشمند",
    price: 3290000,
    oldPrice: 3990000,
    badge: "جدید",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    title: "ماگ سرامیکی Cloud",
    category: "لایف‌استایل",
    price: 390000,
    oldPrice: 490000,
    badge: "ترند",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = [
  { title: "محصولات ترند", icon: "✦", className: "pink" },
  { title: "اکسسوری", icon: "◇", className: "violet" },
  { title: "گجت هوشمند", icon: "⌁", className: "blue" },
  { title: "لایف‌استایل", icon: "♡", className: "orange" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("fa-IR").format(price) + " تومان";

function App() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === "همه" || product.category === activeCategory;

      const searchMatch =
        product.title.includes(search) ||
        product.category.includes(search);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app" dir="rtl">
      <div className="announcement">
        <span>✦ ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان</span>
        <span className="announcement-desktop">محصولات ترند، اکسسوری و گجت‌های خاص</span>
      </div>

      <header className="navbar">
        <a className="brand" href="#top" aria-label="وین کالا">
          <span className="brand-mark">W</span>
          <span>
            <strong>Win</strong>
            <small>Kala</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#top" onClick={() => setMenuOpen(false)}>خانه</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>فروشگاه</a>
          <a href="#trends" onClick={() => setMenuOpen(false)}>ترندها</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>درباره ما</a>
        </nav>

        <div className="nav-actions">
          <label className="search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصول..."
              aria-label="جستجوی محصول"
            />
          </label>

          <button
            className="icon-button"
            onClick={() => setCartOpen(true)}
            aria-label="سبد خرید"
          >
            🛍
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="باز کردن منو"
          >
            ☰
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />

          <div className="hero-copy">
            <span className="eyebrow">WIN KALA / TREND EDIT</span>
            <h1>
              چیزهایی که
              <br />
              <span>ترند می‌شوند،</span>
              <br />
              اینجا هستند.
            </h1>
            <p>
              انتخابی از محصولات خاص پینترستی، اکسسوری‌های جذاب و گجت‌های
              هوشمند؛ برای کسانی که دوست دارند همیشه یک قدم جلوتر باشند.
            </p>

            <div className="hero-buttons">
              <a className="primary-button" href="#products">
                کشف محصولات <span>←</span>
              </a>
              <a className="ghost-button" href="#trends">
                دیدن ترندها
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>+۵۰۰</strong>
                <span>محصول خاص</span>
              </div>
              <div>
                <strong>۴.۹</strong>
                <span>رضایت مشتری</span>
              </div>
              <div>
                <strong>۲۴/۷</strong>
                <span>پشتیبانی</span>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-card back-card">
              <span>NEW DROP</span>
              <strong>2026</strong>
            </div>
            <div className="hero-product">
              <div className="product-orbit orbit-one" />
              <div className="product-orbit orbit-two" />
              <div className="hero-product-inner">
                <span className="floating-star star-one">✦</span>
                <span className="floating-star star-two">✧</span>
                <span className="hero-bubble">TREND<br />NOW</span>
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90"
                  alt="گجت ترند وین کالا"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPLORE</span>
              <h2>دسته‌بندی‌ها</h2>
            </div>
            <p>هر چیزی که برای خاص‌تر شدن استایل و فضای زندگی‌ات لازم داری.</p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.title}
                className={`category-card ${category.className}`}
                onClick={() => {
                  setActiveCategory(category.title === "محصولات ترند" ? "همه" : category.title);
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="category-icon">{category.icon}</span>
                <span>
                  <small>WIN KALA</small>
                  <strong>{category.title}</strong>
                </span>
                <i>↗</i>
              </button>
            ))}
          </div>
        </section>

        <section className="trend-banner" id="trends">
          <div>
            <span className="eyebrow">TREND ALERT</span>
            <h2>ترندهای پینترستی را<br /><span>زودتر از بقیه پیدا کن.</span></h2>
            <p>
              ویترین وین کالا برای محصولاتی ساخته شده که ظاهرشان را می‌بینی و
              همان لحظه می‌گویی: «این دقیقاً همونه!»
            </p>
          </div>
          <div className="trend-pills">
            <span>Cool Blue</span>
            <span>Wilderkind</span>
            <span>Extra Celestial</span>
            <span>Glamoratti</span>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading products-heading">
            <div>
              <span className="section-kicker">SHOP THE DROP</span>
              <h2>محصولات منتخب</h2>
            </div>

            <div className="filter-tabs">
              {["همه", "اکسسوری", "گجت هوشمند", "لایف‌استایل"].map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.title} />
                  <span className="product-badge">{product.badge}</span>
                  <button
                    className={`favorite ${favorites.includes(product.id) ? "liked" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="افزودن به علاقه‌مندی"
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>
                  <button className="quick-add" onClick={() => addToCart(product)}>
                    افزودن به سبد
                  </button>
                </div>

                <div className="product-info">
                  <span>{product.category}</span>
                  <h3>{product.title}</h3>
                  <div className="price-row">
                    <strong>{formatPrice(product.price)}</strong>
                    <del>{formatPrice(product.oldPrice)}</del>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              محصولی با این مشخصات پیدا نشد.
            </div>
          )}
        </section>

        <section className="newsletter" id="about">
          <div className="newsletter-icon">W</div>
          <div>
            <span className="section-kicker">WIN KALA CLUB</span>
            <h2>ترند بعدی را قبل از همه ببین.</h2>
            <p>برای دریافت محصولات جدید و تخفیف‌های محدود عضو شو.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="ایمیل شما" aria-label="ایمیل شما" />
            <button type="submit">عضویت</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">W</span>
            <span><strong>Win</strong><small>Kala</small></span>
          </div>
          <p>ویترین محصولات ترند، اکسسوری و گجت‌های خاص.</p>
        </div>
        <div className="footer-links">
          <a href="#products">فروشگاه</a>
          <a href="#trends">ترندها</a>
          <a href="#about">باشگاه وین کالا</a>
          <a href="#top">بازگشت به بالا ↑</a>
        </div>
        <span className="copyright">© 2026 WinKala</span>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div>
                <span className="section-kicker">YOUR BAG</span>
                <h2>سبد خرید</h2>
              </div>
              <button onClick={() => setCartOpen(false)}>×</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛍</span>
                <h3>سبدت هنوز خالیه</h3>
                <p>یک محصول ترند انتخاب کن و شروع کنیم.</p>
                <button onClick={() => setCartOpen(false)}>ادامه خرید</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div>
                        <h3>{item.title}</h3>
                        <strong>{formatPrice(item.price)}</strong>
                        <div className="quantity">
                          <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>مجموع</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <button className="checkout-button">ادامه و ثبت سفارش ←</button>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
