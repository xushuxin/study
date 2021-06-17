import { onMounted, reactive, toRefs } from "vue";

//根据两点的水平坐标差和垂直坐标差，计算两点之间距离
function getDistance(x1, y1, x2, y2) {
  console.log(x1, y1, x2, y2)
  var _x = Math.abs(x1 - x2);
  var _y = Math.abs(y1 - y2);
  return Math.sqrt(_x * _x + _y * _y);
}

function useTouch(props, {
  onDragStart,
  onDragMove,
  onDragStop,
  onThrowStart,
  onThrowDone,
  onThrowFail,
}) {
  const cardOneState = reactive({
    left: 0,//卡片相对于父级定位的left值
    top: 0,//卡片相对于父级定位的top值
    startLeft: 0,
    startTop: 0,
    isDrag: false,
    isThrow: false,
    needBack: false,
    isAnimating: false,
  });
  function touchStart(e) {
    //动画过程
    if (cardOneState.isAnimating) return;

    cardOneState.isDrag = true;//开始拖动
    cardOneState.needBack = false;//不需要回弹
    cardOneState.isThrow = false;//开始飞牌
    var curTouch = e.touches[0];//获取触摸点的Touch对象
    //curTouch.clientX/clientY 返回相对于浏览器视口左边缘的触摸点的X,Y坐标，不包括任何滚动偏移量
    //cardOneState.left/top 初始值就是手指的位置
    cardOneState.startLeft = curTouch.clientX - cardOneState.left;
    cardOneState.startTop = curTouch.clientY - cardOneState.top;

    onDragStart();//触发拖拽开始事件
  }
  function touchMove(e) {
    if (cardOneState.isAnimating) return;//动画过程

    var curTouch = e.touches[0];//获取触摸点Touch对象
    //根据用户传入的拖拽方向的限制修改卡片的位置
    //水平方向
    if (
      props.dragDirection == "all" ||
      props.dragDirection == "horizontal"
    )
      //手指向左划多少，则卡片向左偏移多少
      cardOneState.left = curTouch.clientX - cardOneState.startLeft;
    //垂直方向
    if (
      props.dragDirection == "all" ||
      props.dragDirection == "vertical"
    )
      //手指向上划多少，则卡片向上偏移多少
      cardOneState.top = curTouch.clientY - cardOneState.startTop;
    //以卡片左上角为原点，根据偏移的x,y轴距离，计算卡片拖动的距离（求三角形非直角边长度）
    var distance = getDistance(0, 0, cardOneState.left, cardOneState.top);

    //触发自定义的拖动中事件
    onDragMove({
      left: cardOneState.left,
      top: cardOneState.top,
      distance: distance,
    });
  }
  //手指松开时触发（touchcancel、touchend事件）
  function touchCancel(e) {
    //获取卡片的拖动距离
    var distance = getDistance(0, 0, cardOneState.left, cardOneState.top);

    cardOneState.isDrag = false;
    //触发停止拖拽事件
    onDragStop({
      left: cardOneState.left,
      top: cardOneState.top,
      distance: distance,
    });
    if (cardOneState.isAnimating) return;

    var distance = getDistance(0, 0, cardOneState.left, cardOneState.top);

    //如果拖动卡片的距离超过了用户设置的触发距离，飞出卡片
    if (distance > props.throwTriggerDistance) {
      makeCardThrow();//卡片飞出
    } else {
      makeCardBack();//卡片回到原位
    }
  }

  const otherCardsState = reactive({
    left2: 0,
    top2: 0,
    width2: 0,
    height2: 0,

    left3: 0,
    top3: 0,
    width3: 0,
    height3: 0,

    left4: 0,
    top4: 0,
    width4: 0,
    height4: 0,
    opacity4: 0,
  });

  //初始化状态（外部需要删除第一项，否则，第一张图片又回到原位）
  function resetAllCardDown() {
    cardOneState.left = 0;
    cardOneState.top = 0;

    //从第二张牌开始每一张的width比上一张小leftPad * 2（-），left比上一张向右偏移leftPad（+）
    //height比上一张小topPad * 2（-）；top比上一张向下偏移topPad（+），并且要加上减小的高度topPad*2才可以实现效果，所以为 +topPad*3
    otherCardsState.width2 = props.cardWidth - props.leftPad * 2;
    otherCardsState.height2 = props.cardHeight - props.topPad * 2;
    otherCardsState.left2 = props.leftPad;
    otherCardsState.top2 = props.topPad * 3;

    otherCardsState.width3 = props.cardWidth - props.leftPad * 4;
    otherCardsState.height3 = props.cardHeight - props.topPad * 4;
    otherCardsState.left3 = props.leftPad * 2;
    otherCardsState.top3 = props.topPad * 6;

    otherCardsState.width4 = props.cardWidth - props.leftPad * 6;
    otherCardsState.height4 = props.cardHeight - props.topPad * 6;
    otherCardsState.left4 = props.leftPad * 3;
    otherCardsState.top4 = props.topPad * 9;
    otherCardsState.opacity4 = 0;
  }
  function resetAllCard() {
    resetAllCardDown();
  }
  function makeCardThrow() {
    cardOneState.isThrow = true;//正在飞出卡片
    cardOneState.needBack = false;//不需要还原卡片
    //atan2计算当前坐标的弧度值
    var angle = Math.atan2(cardOneState.top - 0, cardOneState.left - 0);
    //根据弧度计算余弦长度（x轴），乘以用户传递的卡片飞行距离，得到x轴的飞行距离，设置给当前卡片的left
    cardOneState.left = Math.cos(angle) * props.throwDistance;
    //根据弧度计算正弦长度（y轴），乘以用户传递的卡片飞行距离，得到y轴的飞行距离，设置给当前卡片的top
    cardOneState.top = Math.sin(angle) * props.throwDistance;
    
    //上面的操作之后,最上面的一张卡片被移出视口
    //以下是调整下面几张卡片的宽高位置
    otherCardsState.width2 = props.cardWidth;
    otherCardsState.height2 = props.cardHeight;
    otherCardsState.left2 = 0;
    otherCardsState.top2 = 0;

    otherCardsState.width3 = props.cardWidth - props.leftPad * 2;
    otherCardsState.height3 = props.cardHeight - props.topPad * 2;
    otherCardsState.left3 = props.leftPad;
    otherCardsState.top3 = props.topPad * 3;

    otherCardsState.width4 = props.cardWidth - props.leftPad * 4;
    otherCardsState.height4 = props.cardHeight - props.topPad * 4;
    otherCardsState.left4 = props.leftPad * 2;
    otherCardsState.top4 = props.topPad * 6;
    otherCardsState.opacity4 = 1;//修改opacitiy: 0=>1，制造最后一张从隐藏到显示的切换效果


    cardOneState.isAnimating = true;//opacity left top width height 等属性的过渡效果（0.4s）

    onThrowStart();//触发自定义开始飞牌的事件
    setTimeout(function () {
      cardOneState.isThrow = false;
      cardOneState.isAnimating = false;
      onThrowDone();//触发自定义飞牌结束的事件（需要用户自己在这个钩子函数中删除飞出的牌）
      resetAllCard();//重置所有卡片到初始状态
    }, 400);//定时器与过渡时间保持一致
  }
  function makeCardBack() {
    cardOneState.isThrow = false;
    cardOneState.needBack = true;
    //还原当前卡片的位置
    if (cardOneState.needBack) {
      cardOneState.left = 0;
      cardOneState.top = 0;
    }

    cardOneState.isAnimating = true;//开启过渡状态
    setTimeout(function () {
      onThrowFail();//自定义飞牌失败事件
      cardOneState.isAnimating = false;//关闭过渡状态
      cardOneState.needBack = true;
    }, 600);//600? why not 400?
  }
  onMounted(() => {
    resetAllCard()//首次加载页面，初始化所有卡牌的状态
  })
  
  return {
    ...toRefs(cardOneState),
    ...toRefs(otherCardsState),
    touchStart,
    touchMove,
    touchCancel,
  };
}

export default useTouch;
