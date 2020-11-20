(function($) {
  if (!$ || !$.fn.jquery) throw ReferenceError('must import jQuery!');
  $.fn.extend({
    //zTree(data,callback){}这样定义的函数不能当做构造函数使用
    zTree(data, callback) {
      
      typeof callback !== 'function'? callback=function(){}:null;
      
      let $self = this,
        n = 0;
      const getHTML = list => {
        let str = '';
        n++;
        for (var i = 0; i < list.length; i++) {
          let {
            name,
            open,
            children
          } = list[i];
          str += `<li>
            <a href="javascript:void(0);" class="title">${name}</a>
            ${children && children.length ? `<em class="icon ${open ? 'open' : ''}"></em>
            <ul class="level level${n}" style="display:${open ? 'block' : 'none'}">
              ${getHTML(children)}
            </ul>`: ``}
          </li>`;
        };
        n--;
        return str;
      };
      $self.html(`<ul class="level level0">
        ${getHTML(data)}
      </ul>`);

      //折叠展开切换
      $self.on('click',function(ev){
        let target = ev.target,
        $target = $(target);
        console.log($target)
        if(target.tagName === 'EM'){
          let $ulBox = $target.next('ul');
            $target.toggleClass('open');
            $ulBox.stop().slideToggle(300);//stop停止动画效果
            //触发回调函数
            callback($target[0],$ulBox[0]);
        }
        
        //点击选中当前项和所有子项
        if(target.tagName === 'A'){
          $target.toggleClass('selected');
          let parentA=$target.parent().parent();
          if(parentA){
            if(parentA.find('>li>.selected').length===parentA.find('>li>a').length){
                parentA.prev().prev().addClass('selected');
            }else{
              parentA.prev().prev().removeClass('selected');
            }
          }
          var course = $target.next().next()[0];
          if(!course) return;
          const filter = node => {
            return node.tagName === "A" ?
              NodeFilter.FILTER_ACCEPT :
              NodeFilter.FILTER_SKIP;
          };
          let iterator = document.createNodeIterator(course, NodeFilter.SHOW_ELEMENT, filter);
          let node = iterator.nextNode();
          while (node !== null) {
            console.log(node);
            if($target.hasClass('selected')) {
              $(node).hasClass('selected')?null:$(node).addClass('selected');
            }else {
              $(node).hasClass('selected')?$(node).removeClass('selected'):null;
            }
            node = iterator.nextNode();
          }
          
        }
      });
      
      //右键菜单
      window.oncontextmenu = function(ev){
        ev.preventDefault();
        let target = ev.target;
        console.log(target)
        if(target.tagName === 'A'){
          ev.preventDefault();
          let contextmenu = document.querySelector('.contextmenu');
          if(!contextmenu) {
            contextmenu = document.createElement('div');
            contextmenu.className="contextmenu";
            contextmenu.style.cssText =`position:fixed;width:120px;height:130px;background:green;`;
            contextmenu.innerHTML=`
              <div class="menuItem">菜单项1</div>
              <div class="menuItem">菜单项2</div>
              <div class="menuItem">菜单项3</div>
            `;  
            document.body.appendChild(contextmenu);
          }
          contextmenu.style.left = ev.clientX+ 20 +'px';
          contextmenu.style.top = ev.clientY+'px';
        }
      };

      window.onclick=function(ev){
        var target =ev.target;
        if(target.className === 'menuItem'||target.className === 'contextmenu'){
          return;
        }
        let contextmenu=document.querySelector('.contextmenu');
        if(contextmenu) document.body.removeChild(contextmenu);
      };
    }
  });
})(typeof jQuery !== 'undefined' ? jQuery : undefined);