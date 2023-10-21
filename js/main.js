const app = {
  init() {
    app.makeNewsletterAppear();
    app.generateSlider();
    app.checkUserEmailDomain();
    app.changeThemeColor();
    app.listenCheckboxRating();
  },
  
  // Wild newsletter
  makeNewsletterAppear() {
    const newsletterAside = document.querySelector(".newsletter");
    const newsletterBtnClose = document.querySelector(".newsletter__close");
    const newsletterLink = document.querySelectorAll("a.menu__item")[1];
    newsletterAside.classList.add('newsletter--hidden');
  
    newsletterLink.addEventListener("click", (event) => {
      event.preventDefault();
      newsletterAside.classList.toggle("newsletter--hidden");
    })
  
    newsletterBtnClose.addEventListener("click", (event) => {
      event.preventDefault();
      newsletterAside.classList.toggle('newsletter--hidden');
    })
  
    document.addEventListener("scroll", () => {
      window.scrollY > 300 ? newsletterAside.classList.remove('newsletter--hidden') : newsletterAside.classList.add('newsletter--hidden');
    })
  },
  
  // Email check
  checkUserEmailDomain() {
    const forbiddenDomains = [
      '@yopmail.com', '@yopmail.fr', '@yopmail.net', '@cool.fr.nf', 
      '@jetable.fr.nf', '@courriel.fr.nf', '@moncourrier.fr.nf', 
      '@monemail.fr.nf', '@monmail.fr.nf', '@hide.biz.st', 
      '@mymail.infos.st',
    ];
    const newsletterForm = document.querySelector("form");
  
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userEmail = document.getElementById("subscriber-email").value;
      const userDomain = userEmail.substring(userEmail.indexOf('@'), userEmail.length);
      if(forbiddenDomains.includes(userDomain)){
        alert('Ce domaine est interdit !');
      } else {
        alert('Email enregistré !');
        document.getElementById("subscriber-email").value = "";
      }
    })
  },
  
  // Slider
  generateSlider() {
  
    const sliderContainer = document.querySelector(".slider");
    const sliderImages = ["../img/canyon.jpg", "../img/city.jpg", 
    "../img/nature.jpg", "../img/ocean.jpg", "../img/road.jpg", 
    "../img/ski.jpg"];
    let indexImg = 0;
    let img = document.createElement('img');
    img.src = sliderImages[0];
    img.alt = `Photo de ${sliderImages[0].substring(sliderImages[0].indexOf('/') + 5, sliderImages[0].indexOf('p') - 2)}`
    img.classList.add('slider__img');
    img.classList.add('slider__img--current');
    sliderContainer.append(img);
  
    function changeSlide(direction = 1){
      indexImg = indexImg + direction;
      if(indexImg < 0) {
        indexImg = sliderImages.length - 1;
      } else if (indexImg > sliderImages.length - 1) {
        indexImg = 0;
      }
      img.src = sliderImages[indexImg];
      img.alt = `Photo de ${sliderImages[indexImg].substring(sliderImages[indexImg].indexOf('/') + 5, sliderImages[indexImg].indexOf('p') - 2)}`;
    }
    
    const sliderButtons = document.querySelectorAll(".slider__btn");
    for(const button of sliderButtons){
      button.addEventListener("click", (event) => {
        event.preventDefault();
        if(button.ariaLabel === "Précédent"){
          changeSlide(-1);
        } else {
          changeSlide(1);
        }
      })
    }
  },
  
  // Theme change
  changeThemeColor() {
  
    const html = document.querySelector("html");
    html.classList.add("theme-green");
    const allBtns = document.querySelectorAll("button");
    let themeBtns = [];
  
    app.sortItems(allBtns, "theme", themeBtns);
  
    for(let themeBtn of themeBtns){
      themeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if(themeBtn.id.includes("switch")){
          html.classList.toggle("theme-dark");
        } else if(html.classList.contains("theme-dark")) {
          html.classList = 'theme-dark';
          html.classList.add(`${themeBtn.id}`);
        } else {
          html.classList = '';
          html.classList.add(`${themeBtn.id}`);
        }
      })
    }
  },
  
  // Comments sorting
  listenCheckboxRating() {
  
    const reviews = document.querySelectorAll(".review");
    const allInputs = document.querySelectorAll('input');
    let checkboxRating = [];
  
    app.sortItems(allInputs, "rating", checkboxRating);
  
    for(const checkbox of checkboxRating){
      checkbox.addEventListener("click", () => {
          reviews.forEach(review => {
            if(review.getAttribute('data-rating') === checkbox.value){
              review.classList.toggle('review--hidden')
            }
          })
      })
    }
  },
  
  // Generic function
  sortItems(element, word, newArr) {
    element.forEach(el => {
      if(el.id.includes(word)){
        newArr.push(el);
      }
    })
  }
}

app.init();