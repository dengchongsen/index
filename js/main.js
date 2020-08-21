$(function(){
    let $txt = $(".input-group #txt01")
    let $btn = $(".input-group-btn .btn");
    $btn.click(function(){
        alert($txt.val());
        window.location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+ $txt.val();
        });
    })




