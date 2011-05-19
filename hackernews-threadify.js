(function() {
  var s=document.createElement('script');
  s.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js');

  if(typeof jQuery=='undefined') {
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  window.setTimeout(function(){
    var $$ = jQuery;

    $$(".default").each(function(i,e){
      var $comhead = $$(".comhead", $$(this));
      var $links = $$("a", $comhead);
      console.log(i);
      if($links.length==2){
        //TODO REMOVE COMMENT
        var id = 1//$links[1].attr("href").split(/=/)[1];       
        $comhead.prepend("<a class='collapselink' id='c_"+id+"' href='javascript:void(0)'>[-]</a> ");
      }
      else{ //comment has been deleted
        //TODO DOESN'T DISPLAY CORRECTLY
        $$("div .comment",$$(this)).prepend("<a class='collapselink' id='c_"+id+"' href='javascript:void(0)'>[-]</a> ")
      }
      
    });

    $$(".collapselink").live("click", function(){
      var id = $$(this).attr("id").split(/_/)[1];
      var $vote = $$("#up_"+id);

      var curIndentLevel = parseInt($$("td img", $vote.closest("tr")).attr("width"));

      var $com = $vote.closest("table");

      var $nextCom = $com.closest("tr").next(); //Following comment

      var isExpand = ($$(this).html() === "[+]");

      var changeToggleSign = true;

      while($nextCom && ($nextCom.length!==0)){
        //has a child
        if(parseInt($$("td img", $nextCom).attr("width")) !== curIndentLevel){
          if(changeToggleSign){
            $$(this).html(((isExpand) ? "[-]" : "[+]"));
            changeToggleSign=false;
          }
          $nextCom.css({"display":((isExpand) ? "inline" : "none")});
          $nextCom = $nextCom.next();
        }
        else{
          $nextCom = null;
        }        
      }
    });
  }, 1000)


})();

