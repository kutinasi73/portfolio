
function changeImg_1() {
    document.querySelector(".item_0").src = "images/img/m-hp1.png";
}
function changeImg_2() {
    document.querySelector(".item_0").src = "images/img/m-hp2.png";
}
function changeImg_3() {
    document.querySelector(".item_0").src = "images/img/m-hp3.png";
}
function changeImg_4() {
    document.querySelector(".item_0").src = "images/img/m-hp4.png";
}
document.querySelector(".item_1").addEventListener("mouseover", function () {
    changeImg_1();
})
document.querySelector(".item_2").addEventListener("mouseover", function () {
    changeImg_2();
})
document.querySelector(".item_3").addEventListener("mouseover", function () {
    changeImg_3();
})
document.querySelector(".item_4").addEventListener("mouseover", function () {
    changeImg_4();
})

$('.nav-link').on('mouseover', function (e) {
    e.preventDefault(); // ページ遷移防止
    $('.nav-link').removeClass('is-active'); // 全部のactiveをリセット
    $(this).addClass('is-active'); // クリックしたものにactiveクラスを付与
});