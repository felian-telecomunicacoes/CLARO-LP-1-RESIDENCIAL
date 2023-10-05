let urlOrigin = window.location.href;
let eventCategory = resolveEventCategory(urlOrigin);
let tvId;
let internetId;

function contrate(internet, tv, buttonLabel) {
  internetId = internet;
  tvId = tv;
  let eventLabel = "contrate:";
  modalContainer = document.getElementById("modalContainer");
  modalContainer.classList.add("mdn-isOpen");
  if(internet == '' && tv == ''){
    eventLabel = buttonLabel
  }else{
    eventLabel += buttonLabel
  }
  croDataLayer(
    "clique:botao",
    eventLabel
  );
}

function checkAvailability() {
  this.croDataLayer("clique:botao", "consultar-disponibilidade");
  let cep = document.getElementById("cep").value;
  cep = cep.replace(/[^0-9]/g, "");
  const number = document.getElementById("number").value;

  const tvIdUrl = tvId ? `&tvId=${tvId}` : "";
  const internetIdUrl = internetId ? `&internetId=${internetId}` : "";
  const cepUrl = cep ? `&cep=${cep}` : "";
  const numberUrl = number ? `&number=${number}` : "";
  const URLquery = cepUrl+numberUrl+internetIdUrl+tvIdUrl;

  const URLbase = 'https://bitrix.com/';
  let URLroute = 'monte-sua-combinacao';
  if(internetIdUrl !== "" || tvIdUrl !== ""){
    URLroute = 'checkout/dados-pessoais';
  }
  const URLredirect = `${URLbase}${URLroute}?${URLquery}`;
  
  const paths = [
    { path: "prosp_res_bl_500_mega_rent_squad-01-wibpush", affiliateId: "rJ4An304j" },
    { path: "prosp_res_bl_500_mega_rent_squad-02-wibpush", affiliateId: "SJPz63REj" },
    { path: "prosp_res_bl_500_mega_rent_squad-03-wibpush", affiliateId: "HyiSa3AEi" },
    { path: "prosp_res_bl_500_mega_rent_squad-04-aon", affiliateId: "BymxLP$23" },
  ];
  const pathMatched = paths.find((p) => urlOrigin.includes(p.path));
  if (pathMatched) {
    window.location.replace(
      `${URLredirect}&affiliateId=${pathMatched.affiliateId}`
    );
    return;
  }

  window.location.replace(
    `${URLredirect}`
  );
};

function postDataLayer(data) {
  const obj = window;
  obj.dataLayer = obj.dataLayer || [];
  obj.dataLayer.push(data);
}

function croDataLayer(action, label) {
  const data = {
    event: "event",
    eventCategory: "claro-landing-pages:" + eventCategory,
    eventAction: action,
    eventLabel: label,
  };

  this.postDataLayer(data);
}

function resolveEventCategory() {
  let eventCategory = "500-mega-rent";

  if (urlOrigin.includes("prosp_res_bl_500_mega_rent_squad-01-wibpush")) {
    eventCategory = "500-mega-rent-squad-01-wibpush";
  } else if (urlOrigin.includes("prosp_res_bl_500_mega_rent_squad-02-wibpush")) {
    eventCategory = "500-mega-rent-squad-02-wibpush";
  } else if (urlOrigin.includes("prosp_res_bl_500_mega_rent_squad-03-wibpush")) {
    eventCategory = "500-mega-rent-squad-03-wibpush";
  } else if (urlOrigin.includes("prosp_res_bl_500_mega_rent_squad-04-aon")) {
    eventCategory = "500-mega-rent-squad-04-aon";
    let script = document.createElement('script');
    script.src = '//cdn.evgnet.com/beacon/clarosa/production/scripts/evergage.min.js';
    document.body.appendChild(script);
  }

  return eventCategory;
}

const cepInput = document.getElementById("cep");
cepInput?.addEventListener("blur", () => {
  croDataLayer("preencheu:campo", "cep");
});
cepInput?.addEventListener("click", () => {
  croDataLayer(
    "interacao:modal",
    "porteira-cep:clique:cep"
  );
});
const numberInput = document.getElementById("number");
numberInput?.addEventListener("blur", () => {
  croDataLayer("preencheu:campo", "numero");
});
numberInput?.addEventListener("click", () => {
  croDataLayer(
    "interacao:modal",
    "porteira-cep:clique:numero"
  );
});

const config = { attributes: true };
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      if (mutation.target.classList.contains("mdn-isOpen")) {
        croDataLayer(
          mutation.target.getAttribute("data-gtm-event-action"),
          mutation.target.getAttribute("data-gtm-event-label")
        );
      }
    }
  }
};

let modalIds = ["modalContainer"];

for (var i = 0; i < modalIds.length; ++i) {
  let targetNode = document.getElementById(modalIds[i]);
  this["observer" + i] = new MutationObserver(callback);
  this["observer" + i].observe(targetNode, config);
}
