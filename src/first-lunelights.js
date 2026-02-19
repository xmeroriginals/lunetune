window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 333);
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lunelights-container");
  const firstLunelights = [
    {
      name: "Melek",
      imageUrl:
        "https://lunetune.xmeroriginals.com/the-first-lunelights/Melek.jpg",
    },
  ];

  firstLunelights.sort(() => Math.random() - 0.5);
  firstLunelights.forEach((user) => {
    const wrapper = document.createElement("div");
    wrapper.className = "profile-card-wrapper";
    const card = document.createElement("div");
    card.className =
      "profile-card flex flex-col items-center justify-center text-center bg-[#232642] backdrop-blur-xl p-6 rounded-2xl shadow-lg";
    card.innerHTML = `<img src="${user.imageUrl}" alt="${user.name}" class="w-20 sm:w-24 aspect-square rounded-full object-cover border-4 border-white/20 mb-4 shadow-md"><h3 class="text-lg font-semibold text-white">${user.name}</h3>`;
    wrapper.appendChild(card);
    container.appendChild(wrapper);
  });
});
