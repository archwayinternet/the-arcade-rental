/*
  STRIPE PAYMENT LINKS — flyer landing pages
  ==========================================
  One map for every share page. Keys are the page slug, then the option id
  printed on that page's Buy (or contact) button as data-option.

  HOW TO TURN A BUTTON INTO A REAL CHECKOUT
  1. In the Stripe Dashboard open Payment Links and create one link per
     option, at the flyer price (fixed amount, not "customer chooses").
  2. Copy the link. It looks like:
        https://buy.stripe.com/abcdefghijklmnopqrst
     Test-mode links (https://buy.stripe.com/test_...) work too.
  3. Replace the word PLACEHOLDER for that option with the URL.
     Paste the URL only — no quotes around it inside the quotes below,
     no trailing spaces.
  4. Save this file and redeploy the site.

  Until a value is a real https://buy.stripe.com/ or https://book.stripe.com/
  URL, that button stays a mailto to TheArcadeRental@gmail.com with the
  package name filled in, and "or text Steve" stays visible (sms to
  574-527-5765, same package name). Nothing 404s while links are missing.

  christmas-party has no flyer price. Leave family-party as PLACEHOLDER
  and the button stays "Request a date". Drop in a Payment Link later
  if you add a price, and that button becomes BUY.

  OPTION KEYS
  birthday          classic | power-up | ultimate
  corporate         team-pass | team-builder | ultimate-team
  church-youth      good | better | best
  christmas-party   family-party
*/
window.ARCADE_PAYMENT_LINKS = {
  birthday: {
    // Level 1 Classic Gamer Party — $200
    "classic": "PLACEHOLDER",
    // Level 2 Power Up Party — $300
    "power-up": "PLACEHOLDER",
    // Level 3 Ultimate High Score Party — $400
    "ultimate": "PLACEHOLDER"
  },
  corporate: {
    // Good — Team Pass — $200
    "team-pass": "PLACEHOLDER",
    // Better — Team Builder — $300
    "team-builder": "PLACEHOLDER",
    // Best — Ultimate Team Event — $400
    "ultimate-team": "PLACEHOLDER"
  },
  "church-youth": {
    // Good — $200
    "good": "PLACEHOLDER",
    // Better — $300
    "better": "PLACEHOLDER",
    // Best — $400
    "best": "PLACEHOLDER"
  },
  "christmas-party": {
    // No price on the flyer. Request a date until a link is pasted.
    "family-party": "PLACEHOLDER"
  }
};

(function () {
  var LINKS = window.ARCADE_PAYMENT_LINKS || {};

  function isLive(url) {
    if (typeof url !== "string") return false;
    var trimmed = url.replace(/^\s+|\s+$/g, "");
    return /^https:\/\/(buy|book)\.stripe\.com\/[A-Za-z0-9][A-Za-z0-9_\-\/]*(\?[^\s#]*)?$/.test(trimmed);
  }

  function apply() {
    var buttons = document.querySelectorAll(".js-pay");
    for (var i = 0; i < buttons.length; i++) {
      var a = buttons[i];
      var pageLinks = LINKS[a.getAttribute("data-page")] || {};
      var url = pageLinks[a.getAttribute("data-option")];
      if (!isLive(url)) continue;
      a.href = url.replace(/^\s+|\s+$/g, "");
      a.textContent = a.getAttribute("data-buy-label") || "BUY \u25B8";
      var buyAria = a.getAttribute("data-buy-aria");
      if (buyAria) a.setAttribute("aria-label", buyAria);
      var sms = a.parentNode && a.parentNode.querySelector(".js-text");
      if (sms) sms.hidden = true;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
