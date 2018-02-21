var productID = "Nerf-B5575-NERF-N-Strike-Mastodon";
var url = "https://www.amazon.ca/" + productID +"/product-reviews/B01BH928KM/ref=cm_cr_dp_d_show_all_top?ie=UTF8&reviewerType=all_reviews";
var html;
var reviewList;
var reviewArray = [];
var jsonString = [];
var $comments = $('#comments');
var badPage = true;
var reviewCounter = 0;
$(document).ready(function(){
    
function goToReviewPage(){
    $.get("https://cors-anywhere.herokuapp.com/" + url, function(data){
        console.log(data);
        html = $.parseHTML(data); 
        $("#pageHtml").append(html);
    });
};

function findReviews(){
//    reviewList = html[53].children[29].children[0].children[2].children[0].children[0].children[4].children[2];
//    for(var i = 0;i<10;i++){
//        reviewArray.push ({id: i,value: reviewList.children[i].children[0].children[3].innerText});
//    }
 

//each function doesnt work
$('.a-size-base review-text').each(function(){
    jsonString.push($(this).text());
});
    jsonString = JSON.stringify(reviewArray);
}

function showReviews(){
    
    $("#pageHtml").empty();//empty doesn't work
    $("#comments").append("<p>"+jsonString[0]+"</p>");
}

//while loop doesnt work
while(badPage){
    badPage = false;
    setTimeout(goToReviewPage(), 4000);
    setTimeout(function(){
        if($(".a-last").text().indexOf("Sorry, we just need to make sure you're not a robot.") != -1){
            $("#debug").append("<p>bad</p>");}
        badPage = true;
        },1000);
}
setTimeout(findReviews(), 4000);
showReviews(); 

});





