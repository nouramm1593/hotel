document.addEventListener("DOMContentLoaded", () => {
  // القائمة المتنقلة: بنية القائمة موجودة مباشرة داخل كل ملف HTML.
  const menuToggle = document.getElementById("menu-toggle");
  const mobileLinks = document.getElementById("mobile-links");

  if (menuToggle && mobileLinks) {
    menuToggle.addEventListener("click", () => {
      const opened = mobileLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(opened));
      menuToggle.setAttribute("aria-label", opened ? "إغلاق القائمة" : "فتح القائمة");
      menuToggle.textContent = opened ? "×" : "☰";
    });

    mobileLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        menuToggle.textContent = "☰";
      });
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // نموذج الحجز: تحقق محلي فقط، من دون إرسال إلى خادم.
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    const checkIn = document.getElementById("check-in");
    const checkOut = document.getElementById("check-out");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
    if (checkIn) checkIn.min = localToday;
    if (checkOut) checkOut.min = checkIn?.value || localToday;

    checkIn?.addEventListener("change", () => {
      if (!checkIn.value) return;
      checkOut.min = checkIn.value;
      if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
      }
    });

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = document.getElementById("booking-message");
      if (checkIn.value && checkOut.value && checkOut.value <= checkIn.value) {
        status.textContent = "يرجى اختيار تاريخ مغادرة بعد تاريخ الوصول.";
        status.className = "mt-4 text-sm text-red-700";
        checkOut.focus();
        return;
      }
      status.textContent = "تم التحقق من البيانات محلياً. هذا طلب تجريبي، ويجب التواصل مع الفندق لتأكيد الحجز.";
      status.className = "notice mt-4";
    });
  }

  // نموذج التواصل تجريبي ولا يرسل بيانات إلى خادم.
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = document.getElementById("contact-message-status");
      status.textContent = "تم تجهيز الرسالة تجريبياً. يلزم ربط النموذج بخادم لإرسالها فعلياً.";
      status.className = "notice mt-3";
      contactForm.reset();
    });
  }

  // فتح وإغلاق الأسئلة الشائعة.
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      answer.classList.toggle("hidden", expanded);
      const symbol = button.querySelector(".faq-symbol");
      if (symbol) symbol.textContent = expanded ? "＋" : "−";
    });
  });
});
