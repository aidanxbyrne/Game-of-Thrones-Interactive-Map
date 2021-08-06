
const beyond = document.querySelector('#beyond');
const north = document.querySelector('#north');
const riverlands = document.querySelector('#riverlands');
const westlands = document.querySelector('#westlands');
const stormlands = document.querySelector('#stormlands');
const dorne = document.querySelector('#dorne');
const regions = [ beyond, north, riverlands, westlands, stormlands, dorne];
const articles = regions.map(article => article.article);

//BUTTONS
const aboutBtn = document.getElementById("authorInfo");
const aboutSection = document.querySelector("#about");
const allBtn = document.getElementById("openAll");
const closeBtn = document.querySelectorAll("#close");
const randomBtn = document.querySelector("#randomBtn");

//NEW STUFF
const articleWindow = document.querySelector("#article-window");

regions.forEach( (region) => {
    region.addEventListener("mouseover", () => {
        regionHover(region);
    });
    region.addEventListener("mouseout", () => {
        regionHover(null);
    });
    region.addEventListener("click", () =>{
        openInfo(region);
    });
});

aboutBtn.addEventListener("click", () =>{
    openAuthor();
});
allBtn.addEventListener("click", () =>{
    openAll();
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

function openInfo(region){
    hideAll();
    getArticleData(region);
    pageChange();
    toTop();
    articleWindow.style.width = "40%";
}

//Closes all articles when user clicks the close button.
function closeInfo(){
    hideAll();
    document.getElementById("pageinfo").style.marginLeft = "-10px";
    document.getElementById("westerosmap").style.width = "100%";
    document.body.style.overflowY = "scroll";
}	

function getArticleData(region){
    let heading, title, author, date, imgUrl, imgAlt, imgCaption;

    console.log(region);
    if(regions.includes(region)){
        
        articleData.articles.forEach(art => {
            if(region.id == art.id){
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

        articleWindow.innerHTML = `
            <div class="heading">
                <h1>${heading}</h1>
                <h3 id="close" onClick="closeInfo();"">X</h3>
            </div>

            <div class="articleBody">
                <h2>${title}</h2>

                <div class="imgcaption">
                    <p>By <b>${author} </b>on ${date}</p>
                </div>	
                
                <img src="${imgUrl}" alt="${imgAlt}" class="img">
                
                <div class="imgcaption">
                    <p><em>${imgCaption}</em></p>
                </div>

                <div>
                    ${articleBody}
                </div>
            </div>
        `; 
    }   
}

//Hides all articles when user selects a different one.
function hideAll(){
    articleWindow.style.width = "0%";
}

//Changes map and information positioning when articles are opened
function pageChange(){
    document.getElementById("pageinfo").style.marginLeft = "-1000px";
    document.getElementById("westerosmap").style.float = "left";
    document.getElementById("westerosmap").style.width = "60%";
    document.body.style.overflow = "hidden";
} 

//Resets page to top if user has scrolled down and clicks on one of the buttons
function toTop(){
    scroll(0,0)
}

function openAll(){
    hideAll();
    pageChange();
    articleWindow.style.width = "40%";

    let articleDetails = '';

    articleData.articles.forEach(article => {
        articleDetails += `
            <div class="articlePreview">
                <h2 onClick="hideAll(); pageChange(); openInfo(${article.id});">${article.title}</h2>
                <div class="imgcaption">
                    <p>By <b>${article.author}</b>on ${article.date}</p>
                </div>
                <img src="${article.imgUrl}" alt="${article.imgAlt}" class="imgsmall">
                <p>${article.description}</p>
                <br>
            </div>
        `;
    });

    articleWindow.innerHTML = `
        <div class="heading">
        <h1>All Articles</h1>
        <h3 id="close" onClick="closeInfo();"">X</h3>
        </div>

        <div class="articleBody">
            ${articleDetails}
        </div>
    `
}

function openRandom(){
    let random = regions[Math.floor(Math.random()*6)];

    hideAll();
    openInfo(random);
}

function openAuthor(){
    hideAll();
    pageChange();
    articleWindow.style.width = "40%";

    let authorDetails = '';

    articleData.authors.forEach(author => {
        authorDetails += `
            <div class="authors authorDetail">
                <div class="authorimg">
                    <img src="${author.authorImgUrl}" alt="${author.authorImgAlt}">
                </div>
                <div class="authorabout">
                    <h2>${author.name}</h2>
                    <p>${author.about}</p>
                </div>
            </div>
        `;
    });

    articleWindow.innerHTML = `
        <div class="heading">
        <h1>About the Authors</h1>
        <h3 id="close" onClick="closeInfo();"">X</h3>
        </div>

        <div class="articleBody">
            ${authorDetails}
        </div>
    `
}