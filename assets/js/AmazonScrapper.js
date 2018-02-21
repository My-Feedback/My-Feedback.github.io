var productID = "Nerf-B5575-NERF-N-Strike-Mastodon";
var url = "https://www.amazon.ca/" + productID +"/product-reviews/B01BH928KM/";
var html;
var reviewList;
var reviewArray = [];
var jsonString = [];
var badPage = true;
var reviewCounter = 0;
var review;
var robot;
var lastPage;
var currentPage = 1;
$(document).ready(function(){
    
function goToReviewPage(){
    $.get("https://cors-anywhere.herokuapp.com/" + url, function(data){
        console.log(data);
        html = $.parseHTML(data); 
        $("#pageHtml").append(html);
        //robot = document.getElementsBy
        setTimeout(function(){
            review= document.getElementsByClassName("review-text");
            var pageBar = document.getElementsByClassName("a-pagination");//1,2,3,4,6 are differentpages
            lastPage = pageBar[0].childNodes[6].textContent;
            findReviews();  
            if(currentPage<lastPage){
                nextPage();
                goToReviewPage();
            }
            $("#pageHtml").empty();
            //showReviews();
        },500);        
    });
    
};

function findReviews(){
    for(var i=0;i<review.length;i++){
        reviewArray.push(review[i].innerText);
    }       
    jsonString = JSON.stringify(reviewArray);
}
//for debugging
function showReviews(){
    
    $("#pageHtml").empty();//empty doesn't work
    $("#comments").append("<p>"+jsonString[0]+"</p>");
}

//while loop maybe doesnt work. Im not getting robot msg since its in but cant prove it works.
while(badPage){
    badPage = false;
    goToReviewPage();
    setTimeout(function(){
        if($(".a-last").text().indexOf("Sorry, we just need to make sure you're not a robot.") != -1){
            $robot = $(".a-last").text();
            $("#debug").append("<p>bad</p>");}
        badPage = true;
        },1000);
}

function nextPage(){
    currentPage++;   
    url = "https://www.amazon.ca/" + productID +"/product-reviews/B01BH928KM/?pageNumber="+currentPage;    
}
});





