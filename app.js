//MAP REGIONS
const beyond = document.querySelector('#beyond');
const north = document.querySelector('#north');
const riverlands = document.querySelector('#riverlands');
const westlands = document.querySelector('#westlands');
const stormlands = document.querySelector('#stormlands');
const dorne = document.querySelector('#dorne');
const regions = [ beyond, north, riverlands, westlands, stormlands, dorne];

//SECTIONS
const westerosMap = document.querySelector("#westeros-map");
const articleWindow = document.querySelector("#article-window");
const pageInfo = document.querySelector(".pageInfo")
const articleWindowHeading = document.querySelector("#article-window-heading");
const articleWindowContent = document.querySelector("#article-window-content");

//BUTTONS
const aboutBtn = document.querySelector("#authorInfo");
const allBtn = document.querySelector("#openAll");
const closeBtn = document.querySelectorAll("#close");
const randomBtn = document.querySelector("#randomBtn");

//EVENT LISTENERS
regions.forEach( (region) => {
    region.addEventListener("mouseover", () => regionHover(region));
    region.addEventListener("mouseout", () => regionHover(null));
    region.addEventListener("click", () => onRegionSelect(region));
});

aboutBtn.addEventListener("click", () => onAuthorButtonSelect());
allBtn.addEventListener("click", () => onAllSelect());
randomBtn.addEventListener("click", () => onRandomSelect());


//FUNCTIONS
function regionHover(region){
    document.getElementById("img").src = (region != null) ? `images/${region.id}.png` : `images/gradients.png`
}

function onRegionSelect(region){
    let { heading, articleContent} = getArticleData(region);
    openWindow(heading, articleContent);
}

function openWindow(heading, content){
    scrollToTop();

    pageInfo.style.transform = "translateX(-100%)";
    westerosMap.style.width = "60%";
    document.body.style.overflow = "hidden";

    articleWindow.style.transform = 'translateX(0%)';
    articleWindowHeading.innerHTML = heading;
    articleWindowContent.innerHTML = content;
}

//Closes all articles when user clicks the close button.
function closeInfo(){
    closeWindow();
    pageInfo.style.transform = "translateX(0%)";
    westerosMap.style.width = "100%";
    document.body.style.overflowY = "scroll";
}	

function getArticleData(region){
    let articleDataRes;

    if(regions.includes(region)){    
        articleData.articles.forEach(({id, heading, title, author, date, imgUrl, imgAlt, imgCaption, body}) => {
            if(region.id == id){
                const articleContent = `
                <h2>${title}</h2>
    
                <div class="imgcaption">
                    <p>By <b>${author} </b>on ${date}</p>
                </div>	
                
                <img src="${imgUrl}" alt="${imgAlt}" class="img">
                
                <div class="imgcaption">
                    <p><em>${imgCaption}</em></p>
                </div>
    
                <div>
                    ${body}
                </div>
            `;
                articleDataRes = { heading, articleContent };
            };
        });
    }
    
    return articleDataRes;
}

//Hides all articles when user selects a different one.
function closeWindow(){
    articleWindow.style.transform = 'translateX(100%)';
}

//Resets page to top if user has scrolled down and clicks on one of the buttons
function scrollToTop(){
    scroll(0,0)
}

function onAllSelect(){
    let articleDetails = '';

    articleData.articles.forEach(article => {
        articleDetails += `
            <div class="articlePreview">
                <h2 onClick="closeInfo(); onRegionSelect(${article.id});">${article.title}</h2>
                <div class="imgcaption">
                    <p>By <b>${article.author}</b> on ${article.date}</p>
                </div>
                <img src="${article.imgUrl}" alt="${article.imgAlt}" class="imgsmall">
                <p>${article.description}</p>
            </div>
        `;
    });

    openWindow('All Articles', articleDetails);
}

function onRandomSelect(){
    //Get random region from regions array
    let random = regions[Math.floor(Math.random()*regions.length)];
    onRegionSelect(random);
}

function onAuthorButtonSelect(){
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

    openWindow('About the Authors', authorDetails);
}