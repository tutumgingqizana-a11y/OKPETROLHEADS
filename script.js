(() => {
  "use strict";
  const cars = window.OKUHLE_CARS || [];
  const $ = id => document.getElementById(id);
  const grid = $("carGrid"), search = $("searchInput");
  const brand = $("brandFilter"), category = $("categoryFilter");
  const count = $("resultCount"), empty = $("noResults");
  const dialog = $("carDialog"), dialogContent = $("dialogContent");
  const close = $("closeDialog"), reset = $("resetFilters");

  if (!grid || !search || !brand || !category || !count || !empty ||
      !dialog || !dialogContent || !close || !reset) {
    console.error("Missing required HTML element. Check index.html IDs.");
    return;
  }

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function fillFilters() {
    [...new Set(cars.map(c => c.brand))].sort().forEach(v => brand.add(new Option(v, v)));
    [...new Set(cars.map(c => c.category))].sort().forEach(v => category.add(new Option(v, v)));
  }

  function cardFor(car) {
    const card = el("article", "car-card");
    const img = el("img", "car-image");
    img.src = car.image;
    img.alt = `${car.brand} ${car.model} — illustrative car photograph`;
    img.loading = "lazy";
    img.onerror = () => { img.hidden = true; };

    const body = el("div", "card-body");
    body.append(el("p", "brand", car.brand), el("h3", "", car.model));
    const tags = el("div", "tags");
    tags.append(el("span", "tag", car.category), el("span", "tag", car.fuel));
    body.append(tags, el("p", "", car.description));

    const button = el("button", "spec-button", "View specifications");
    button.type = "button";
    button.addEventListener("click", () => showDetails(car));
    body.append(button);
    card.append(img, body);
    return card;
  }

  function render(list) {
    grid.replaceChildren();
    count.textContent = `${list.length} vehicle(s) found`;
    empty.hidden = list.length > 0;
    list.forEach(car => grid.append(cardFor(car)));
  }

  function filterCars() {
    const q = search.value.trim().toLowerCase();
    const b = brand.value, c = category.value;
    render(cars.filter(car => {
      const searchable = [car.brand, car.model, car.category, car.fuel, car.description].join(" ").toLowerCase();
      return searchable.includes(q) && (b === "all" || car.brand === b) &&
        (c === "all" || car.category === c);
    }));
  }

  function showDetails(car) {
    dialogContent.replaceChildren();
    dialogContent.append(el("p", "eyebrow", car.brand.toUpperCase()));
    dialogContent.append(el("h2", "", car.model));
    const img = el("img", "dialog-image");
    img.src = car.image;
    img.alt = `${car.brand} ${car.model} — illustrative car photograph`;
    img.onerror = () => img.remove();
    dialogContent.append(img);

    const dl = el("dl", "specs");
    [
      ["Brand", car.brand], ["Model", car.model], ["Category", car.category],
      ["Fuel", car.fuel], ["Engine", car.engine], ["Drivetrain", car.drivetrain],
      ["Availability", car.availabilityNote], ["Description", car.description]
    ].forEach(([label, value]) => dl.append(el("dt", "", label), el("dd", "", value)));
    dialogContent.append(dl);
    dialogContent.append(el("p", "small-note",
      "Specifications depend on model year and derivative. This starter catalogue is not a live dealer inventory or a verified exhaustive list. Confirm exact local specifications and availability with the South African manufacturer."));
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  search.addEventListener("input", filterCars);
  brand.addEventListener("change", filterCars);
  category.addEventListener("change", filterCars);
  reset.addEventListener("click", () => {
    search.value = "";
    brand.value = "all";
    category.value = "all";
    filterCars();
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();

  fillFilters();
  render(cars);
})();
