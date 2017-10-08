var Script = function () {

//设置——员工管理删除    
$('.icon-del').click(function () {
		var box = $(this).parent().parent()
         $(box).hide();
    });
//锁定工单
$('.icon-unlock').click(function () {
            $(this).addClass("icon-lock");
            $(this).removeClass("icon-unlock"); 
   });  
 //排序
$('.sorting').click(function () {
        if ($(this).hasClass("asc")) {
            $(this).addClass("desc");
            $(this).removeClass("asc"); 
        } else {    
            $(this).addClass("asc"); 
            $(this).removeClass("desc"); 
        }
    });     
 //维修等级下拉
$('.arrow_down_btn').click(function () {
		var box = $(this).parent().find(".tag_box")
        if ($(box).hasClass("tag_box_hide")) {   
            $(box).removeClass("tag_box_hide");            
        } else {            
            $(box).addClass("tag_box_hide");
        }
    });
 
  //选择维修等级	
$(function(){
    $("input[name='tag_text']").change(function(){
        var result="";
        $("input[name='tag_text']:checked").each(function(){
               result+=$(this).val()+',';
        });
        if(result!=""){
            result=result.substring(0,result.lastIndexOf(','));
        }
        $(".ware").val(result);  
    });

}) 
 
 //弹窗删除图片	
$('.close-pic').click(function () {
		$(this).parent().parent().parent().hide(); 
    });
    
 //美化的滚动条
$(".scroll-bar").niceScroll({styler:"fb",cursorcolor:"#c2c6d3", cursorwidth: '8', cursorborderradius: '10px', background: '#e9ecf6', cursorborder: ''});
$(".dropdown-menu-list").niceScroll({styler:"fb",cursorcolor:"#c2c6d3", cursorwidth: '8', cursorborderradius: '10px', background: '#e9ecf6', cursorborder: ''});
/*$(".side-menu-sidebar").niceScroll({styler:"fb",cursorcolor:"#c2c6d3", cursorwidth: '8', cursorborderradius: '10px', background: '#e9ecf6', cursorborder: ''});
*/
}();


