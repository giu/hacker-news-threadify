(function() {
  var s=document.createElement('script');
  s.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');

  if(typeof jQuery=='undefined') {
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  window.setTimeout(function(){
    var $$ = jQuery;

    if($$("#hnthreadified").length===0){
      $$("body").prepend("<input type='hidden' id='hnthreadified' />");
    }
    else{
      alert("This page has already been threadified!");
      return;
    }

    var expand = "[+]";
    var reduce = "[-]";

    $$(".default").each(function(i,e){
      var $comhead = $$(".comhead", $$(this));
      var $links = $$("a", $comhead);
      var delCount = 0;

      if($links.length > 0 && $links[0].innerHTML[0]===expand[0]){
        return;
      }

      if($links.length > 1){
        var id = $links[$links.length-1].href.split(/=/)[1];
        $comhead.prepend("<a class='collapselink' id='c_"+id+"' href='javascript:void(0)'>"+reduce+"</a> ");
      }
      else{ //comment has been deleted
        $$("div", $$(this)).hide();
        $$(this).prepend("<a class='collapselink' style='color:#828282' id='c_"+(++delCount)+"' href='javascript:void(0)'>"+reduce+"</a> ")
      }
      
    });

    $$(".collapselink").live("click", function(){
      var $t = $$(this);
      var id = $t.attr("id").split(/_/)[1];
      var $comment = $$(".comment", $t.closest("td"));
      var curIndentLevel = parseInt($$("td img", $t.closest("tr")).attr("width"));
      var $com = $t.closest("table");
      var $nextCom = $com.closest("tr").next(); //Following comment
      var changeToggleSign = true;
      var isExpand = $t.html() === expand;
      var toggleSingle = function(){

          if(isExpand){
            $comment.show().next().show();
            $t.html(reduce);
          }
          else{
            $comment.hide().next().hide();
            $t.html(expand);
          }

      };

      if($nextCom.length===0){
        toggleSingle();
      }

      else
      {
        while($nextCom && ($nextCom.length!==0)){
          if((parseInt($("td img", $nextCom).attr("width")) <= curIndentLevel)){
            toggleSingle();
            $nextCom = null;
          }
          else{
            if(isExpand){
              if(changeToggleSign){
                $t.html(reduce);
                changeToggleSign=false;
                $comment.show().next().show();
              }
              $$(".collapselink", $nextCom).html(reduce);
              $$(".comment", $nextCom).show();
              $nextCom.show();
            }
            else{
              if(changeToggleSign){
                $t.html(reduce);
                changeToggleSign=false;
                $comment.hide().next().hide();
              }
              $nextCom.hide();
            }

            $nextCom = $nextCom.next();
          }
        }
      }
    });
  }, 1000);
})();