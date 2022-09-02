"use strict";

const input = document.querySelector(".link-input");
const linksContainer = document.querySelector(".links-container");
const shortenBtn = document.querySelector(".cta-button");
const mobileNav = document.querySelector(".btn-mobile-nav");
const nav = document.querySelector(".main-nav");

///////////////////////////////////////////////////////
// RENDER THE SHORTENED LINK ON THE PAGE
const renderLink = function (link, short) {
  linksContainer.classList.remove("hidden");

  const html = `
       <div class="shortened new-box">
          <p class="full-link">${link}</p>
          <div class="link-btn">
            <p class="short-link"><a href="http://${short}" target="_blank">${short}</a></p>
            <button class='copy btn' id=${short}>Copy</button>
          </div>
        </div>
  `;

  linksContainer.insertAdjacentHTML("beforeend", html);

  // SCROLL DOWN TO THE LAST LINK
  const lastLink = document.querySelector(".shortened");
  const linkCoords = lastLink.getBoundingClientRect();

  linksContainer.scrollTo({
    top: linkCoords.bottom,
    behavior: "smooth",
  });

  // COPY BTN
  linksContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".copy");

    if (!clicked) return;

    clicked.classList.add("copied");
    clicked.textContent = "Copied!";

    navigator.clipboard.writeText(`${clicked.id}`);
  });
};

///////////////////////////////////////////////////////
// BTN TO CALL THE API
shortenBtn.addEventListener("click", function () {
  const link = input.value;

  if (!link) {
    input.style.border = "2px solid red";
    input.placeholder = "Please enter a link";
    return;
  }

  shortenLink(link);
  input.value = "";
});

input.addEventListener("keydown", function (e) {
  if (input.value.length >= 1) input.style.border = "none";
});

///////////////////////////////////////////////////////
// API CALL
const shortenLink = async function (url) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    const { short_link: shortLink } = data.result;
    const { original_link: original } = data.result;

    if (!data.ok) throw new Error("There was an error, please try again! :(");

    renderLink(original, shortLink);
  } catch (err) {
    console.error(`Please enter a valid link!`);
    throw err;
  }
};

///////////////////////////////////////////////////////
// OPEN MOBILE NAV
mobileNav.addEventListener("click", function () {
  nav.classList.toggle("mobile");
});
