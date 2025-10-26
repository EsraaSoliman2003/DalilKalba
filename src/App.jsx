import "./App.css";
import logoLight from "./assets/logoLight.png";
import { useState, useEffect } from "react";
import {
  // Instagram,
  // Music2,
  // Twitter,
  // Youtube,
  Facebook,
  Ghost,
  Menu,
  X,
} from "lucide-react";

import emailjs from "emailjs-com";
import { useRef } from "react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // إضافة ref للقائمة
  const menuButtonRef = useRef(null); // إضافة ref لزر الموبايل

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const formRef = useRef();
  const [messageStatus, setMessageStatus] = useState(null); // ✅ حالة الرسالة
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل (اللودر)
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageStatus(null);

    emailjs
      .sendForm(
        "service_9mxubqg",
        "template_40qi4dh",
        formRef.current,
        "7LjUOeFIH_3CGasy6"
      )
      .then(
        () => {
          setIsLoading(false);
          setMessageStatus({
            type: "success",
            text: "✅ تم إرسال الرسالة بنجاح",
          });
          formRef.current.reset();
        },
        () => {
          setIsLoading(false);
          setMessageStatus({
            type: "error",
            text: "❌ حدث خطأ أثناء الإرسال",
          });
        }
      );

    setTimeout(() => setMessageStatus(null), 5000);
  };

  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // تحديث القسم النشط
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="App">
      {/* الهيدر المحسن */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            {["home", "about", "attractions", "social", "map", "contact"].map(
              (section) => (
                <button
                  key={section}
                  className={`nav-link ${
                    activeSection === section ? "active" : ""
                  }`}
                  onClick={() => {
                    scrollToSection(section);
                    setIsMenuOpen(false); // إغلاق القائمة بعد الاختيار
                  }}
                >
                  {getSectionName(section)}
                </button>
              )
            )}
          </nav>
          <div className="logo-wrapper">
            <img src={logoLight} alt="شعار كلباء" className="header-logo" />
          </div>

          {/* زر فتح/إغلاق القائمة في الموبايل */}
          <button
            ref={menuButtonRef}
            className="mobile-menu-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={40} /> : <Menu size={40} />}
          </button>


          {/* <div className="nav-actions">
            <button className="cta-button">تسجيل الدخول</button>
          </div> */}
        </div>
      </header>

      {/* القسم الرئيسي المحسن */}
      <section id="home">
        <div className="hero">
          <div className="hero-background">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">وجهة الطبيعة والتراث</div>
              <h1 className="hero-title">
                <span className="title-main">دليل كلباء</span>
                <span className="title-sub">جوهرة الساحل الشرقي</span>
              </h1>
              <p className="hero-subtitle">
                حيث يلتقي البحر بالجبل، والطبيعة بالتاريخ في إمارة الشارقة
              </p>

              <div className="hero-actions">
                <button
                  className="btn-primary"
                  onClick={() => scrollToSection("attractions")}
                >
                  اكتشف الأماكن
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => scrollToSection("about")}
                >
                  تعرف على المدينة
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="logo-orb">
                <img src={logoLight} alt="شعار كلباء" />
                <div className="orb-glow"></div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </section>

      {/* عن كلباء - محسن */}
      <section id="about">
        <div className="about-section">
          <div className="section-header">
            <h2>عن كلباء</h2>
            <div className="section-divider"></div>
            <p>اكتشف جمال الطبيعة والتراث</p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <div className="feature-highlights">
                <div className="feature">
                  <div className="feature-icon">🌊</div>
                  <div className="feature-text">
                    <h4>شواطئ خلابة</h4>
                    <p>شواطئ هادئة تلتقي مع جبال حفيت</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon">🌿</div>
                  <div className="feature-text">
                    <h4>محميات طبيعية</h4>
                    <p>محمية القرم وموائل فريدة</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon">🏺</div>
                  <div className="feature-text">
                    <h4>تراث عريق</h4>
                    <p>تاريخ يمتد لآلاف السنين</p>
                  </div>
                </div>
              </div>

              <p className="about-description">
                تقع مدينة كلباء على الساحل الشرقي لدولة الإمارات العربية
                المتحدة، وتُعد من أجمل المدن التابعة لإمارة الشارقة. تتميز
                بطبيعتها الخلابة وشواطئها الهادئة ومواقعها البيئية الفريدة مثل
                محمية القرم وبيت القصب التاريخي.
              </p>
            </div>

            <div className="about-gallery">
              <div className="gallery-main">
                <img src="/public/kalba.jpg" alt="منظر من كلباء" />
              </div>
              <div className="gallery-thumbnails">
                <div className="thumbnail"></div>
                <div className="thumbnail"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* الأماكن السياحية - محسن */}
      <section id="attractions">
        <div className="attractions-section">
          <div className="section-header">
            <h2>الأماكن السياحية</h2>
            <div className="section-divider"></div>
            <p>اكتشف أجمل الوجهات في كلباء</p>
          </div>

          <div className="attractions-grid">
            {attractionsData.map((attraction, index) => (
              <div key={index} className="attraction-card">
                <div className="card-image">
                  <img src={attraction.image} alt={attraction.title} />
                  <div className="card-overlay">
                    <button className="explore-btn">استكشف</button>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{attraction.title}</h3>
                  <p>{attraction.description}</p>
                  <div className="card-features">
                    {attraction.features.map((feature, i) => (
                      <span key={i} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* باقي الأقسام بنفس مستوى التحسين */}
      <section id="social" className="social-section">
        <h2>تابعنا على</h2>
        <div className="social-icons">
          {/* <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon instagram"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon tiktok"
          >
            <Music2 size={28} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon twitter"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon youtube"
          >
            <Youtube size={28} />
          </a> */}
          <a
            href="https://www.facebook.com/dlil.kalba"
            target="_blank"
            rel="noreferrer"
            className="social-icon facebook"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://snapchat.com/t/VWO8YtR3"
            target="_blank"
            rel="noreferrer"
            className="social-icon snapchat"
          >
            <Ghost size={28} />
          </a>
        </div>
      </section>

      <section id="map">
        <div className="map-section">
          <h2>موقع كلباء</h2>
          <div
            className="map-frame"
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.697188207848!2d56.3508!3d25.0973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef47497efb6a0e3%3A0xfedbfccaa9bfa31d!2z2YXYt9i52YUg2KfZhNi52YTZiiDZhNmE2KfZhdi52YUg2KfZhNin2YXZiiDZhNmE2LnZhdmI2KfZhQ!5e0!3m2!1sar!2sae!4v1700000000000!5m2!1sar!2sae"
              style={{
                width: "100%",
                height: "100%",
                border: "0",
                pointerEvents: "auto", // مهم جدًا لتفعيل السحب والتفاعل
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="خريطة كلباء"
            ></iframe>
          </div>{" "}
        </div>
      </section>

      <section id="contact">
        <div className="contact-section">
          <div className="section-header">
            <h2>تواصل معنا</h2>
            <div className="section-divider"></div>
            <p>نحن هنا للإجابة على استفساراتك</p>
          </div>

          <div className="contact-container">
            {/* معلومات التواصل */}
            <div className="contact-info">
              <div className="contact-header">
                <h3>ابق على تواصل</h3>
                <p>نحن سعداء بتواصلكم معنا في أي وقت</p>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-content">
                    <h4>العنوان</h4>
                    <p>مدينة كلباء، إمارة الشارقة</p>
                    <span>الإمارات العربية المتحدة</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-content">
                    <h4>ساعات العمل</h4>
                    <p>الأحد - الخميس: 8:00 - 16:00</p>
                    <span>الجمعة والسبت: مغلق</span>
                  </div>
                </div>
              </div>
              {/* 
              <div className="social-links">
                <h4>تابعنا على</h4>
                <div className="social-icons-mini">
                  <a href="#" className="social-mini">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-mini">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-mini">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="social-mini">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div> */}
            </div>

            {/* نموذج التواصل */}
            <div className="contact-form">
              <div className="form-header">
                <h3>أرسل رسالة</h3>
                <p>سنكون سعداء بسماع منك</p>
              </div>

              <form ref={formRef} onSubmit={sendEmail} className="message-form">
                <div className="form-group">
                  <label htmlFor="name">الاسم الكامل</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">الموضوع</label>
                  <select id="subject" required>
                    <option value="">اختر الموضوع</option>
                    <option value="inquiry">استفسار عام</option>
                    <option value="tourism">معلومات سياحية</option>
                    <option value="event">الفعاليات</option>
                    <option value="partnership">شراكة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">الرسالة</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loader"></span>
                      <span style={{ marginLeft: "8px" }}>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال الرسالة</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>

                {/* الرسالة تظهر هنا */}
                {messageStatus && (
                  <p
                    className={`status-message ${
                      messageStatus.type === "success"
                        ? "success-message"
                        : "error-message"
                    }`}
                  >
                    {messageStatus.text}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logoLight} alt="شعار كلباء" />
          </div>
          <p>&copy; 2025 مدينة كلباء - جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

// بيانات المساعد
const attractionsData = [
  {
    title: "شاطئ كلباء",
    description:
      "شاطئ هادئ يتميز بمياهه النقية وإطلالاته الرائعة على خليج عمان.",
    image: "/public/kalba-beach.jpg",
    features: ["شاطئ", "عائلات", "مناظر طبيعية"],
  },
  {
    title: "محمية القرم",
    description:
      "واحدة من أهم المحميات الطبيعية في الدولة وتضم تنوعاً بيئياً غنياً.",
    image: "/public/mangrove.jpg",
    features: ["محمية", "طبيعة", "طيور"],
  },
  {
    title: "بيت القصب",
    description: "موقع أثري وتراثي يروي تاريخ المدينة العريق وحياة الأجداد.",
    image: "/public/kalba-museum.jpg",
    features: ["تراث", "تاريخ", "ثقافة"],
  },
];

const getSectionName = (section) => {
  const names = {
    home: "الرئيسية",
    about: "عن كلباء",
    attractions: "الأماكن السياحية",
    social: "تابعنا",
    map: "الخريطة",
    contact: "تواصل معنا",
  };
  return names[section] || section;
};

export default App;
