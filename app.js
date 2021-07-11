
console.log('Hello World')

//REGIONS
const beyond = { element: document.querySelector('#beyond'), article: document.querySelector('#article1')};
const north = { element: document.querySelector('#north'), article: document.querySelector('#article2')};
const riverlands = { element: document.querySelector('#riverlands'), article: document.querySelector('#article3')};
const westlands = { element: document.querySelector('#westlands'), article: document.querySelector('#article4')};
const stormlands = { element: document.querySelector('#stormlands'), article: document.querySelector('#article5')};
const dorne = { element: document.querySelector('#dorne'), article: document.querySelector('#article6')};
const regions = [ beyond, north, riverlands, westlands, stormlands, dorne];
const articles = regions.map(article => article.article);

const aboutBtn = document.getElementById("authorInfo");
const aboutSection = document.querySelector("#about");
const allBtn = document.getElementById("openAll");
const allArticles = document.querySelector("#allarticles");
const closeBtn = document.querySelectorAll(".close");
const randomBtn = document.querySelector("#randomBtn");

//EVENT LISTENERS
regions.forEach( ({element, article}) => {
    element.addEventListener("mouseover", () => {
        regionHover(element);
    });
    element.addEventListener("mouseout", () => {
        regionHover(null);
    });
    element.addEventListener("click", () =>{
        openInfo(article);
    });
});

aboutBtn.addEventListener("click", () =>{
    openInfo(aboutSection);
});
allBtn.addEventListener("click", () =>{
    openInfo(allarticles);
});
randomBtn.addEventListener("click", () =>{
    openRandom();
})


//FUNCTIONS
function regionHover(region){
    if(region != null){
        document.getElementById("img").src = `images/${region.id}.png`;
    }
    else{
        document.getElementById("img").src = `images/gradients.png`;
    }
}

function openInfo(article){
    hideAll();
    getArticleData(article, article.id);
    pageChange();
    article.style.width = "40%";
}

//Hides all articles when user selects a different one.
function hideAll(){
    articles.forEach(article => {
        article.style.width = "0%";
    });
    allArticles.style.width = "0%";
    aboutSection.style.width = "0%";
}

function openRandom(){
    let random = regions[Math.floor(Math.random()*6)].article;

    hideAll();
    openInfo(random);
}

//Changes map and information positioning when articles are opened
function pageChange(){
    document.getElementById("pageinfo").style.marginLeft = "-1000px";
    document.getElementById("westerosmap").style.float = "left";
    document.getElementById("westerosmap").style.width = "60%";
    document.body.style.overflow = "hidden";
}

function getArticleData(article, articleID){
    let heading, title, author, date, imgUrl, imgAlt, imgCaption;

    if(articles.includes(article)){
        
        articleData.articles.forEach(art => {
            if(articleID == art.id){
                heading = art.heading;
                title = art.title;
                author = art.author;
                date = art.date;
                imgUrl = art.imgUrl;
                imgAlt = art.imgAlt;
                imgCaption = art.imgCaption;
                articleBody = art.body;
            }
        });

        article.innerHTML = `
            <h4 onClick="closeInfo();"><button class = "close" >X - Close</button></h4>
                
            <div class="heading">
                <h1>${heading}</h1>
            </div>
                
            <h2>${title}</h2>
            <div class="imgcaption">
                <p>By <b>${author} </b>on ${date}</p>
            </div>	
            
            <img src="${imgUrl}" alt="${imgAlt}" class="img">
            
            <div class="imgcaption">
                <p><em>${imgCaption}</em></p>
            </div>
            <br>
            <div>
                ${articleBody};
            </div>
        `; 
    }   
}