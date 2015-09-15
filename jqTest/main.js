$(document).ready(function(){
  
  $("#year").text(new Date().getFullYear());
  
  $("#menu_sales").click(function(){
    $("#sales_entry").dialog();
  });
  
  $("#new").click(function(){
    $("#invoicing").dialog();
  });
  
  
});


function main() {
  
}


