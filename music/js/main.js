window.onload = function(){
  /*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
  var app = new Vue({
    el: ".main",
    data: {
      keywords:"",
      songs_obj:[],
      id:0,
      musicUrl:'flag',
      hotWords:[],
      song_pic:"./images/person01.png",
      song_name:"",
      mvid:0,
      mvUrl:""
    },
  methods:{
    // 搜索歌曲
    searchMusic:function(){
      this.songs_obj=[];
      let that = this;
      axios.get('https://autumnfish.cn/search?keywords='+this.keywords)
      .then(function(res){
          console.log("搜索",res);
          res.data.result.songs.forEach(v => {
            that.songs_obj.push(v);
          });
          // console.log("歌曲列表"+ that.songs_obj);
      },
      function(err){
        console.log(err);
      }
      )
    },// 搜索歌曲
    // 播放音乐
    playMusic:function(e){
      console.log("音乐索引",e);
      this.id=this.songs_obj[e.i].id;
      let that = this;
      axios.get('https://autumnfish.cn/song/url?id='+this.id)
      .then(
        function(res){
          that.musicUrl=res.data.data[0].url;
          console.log("获取URL",res);
          if(res.data.data[0].url===null){
            console.log("暂未获得该歌曲的播放链接");
          }
        },
        function(err){
          console.log(err);
        }

      );
      // 获取热评
      axios.get("https://autumnfish.cn/comment/hot?type=0&id="+this.id)
      .then(
        function(res){
          // console.log('热评',res);
          that.hotWords=res.data.hotComments;
          // console.log("热评",that.hotWords);
        }
      );
      // 获取音乐详情
      axios.get('https://autumnfish.cn/song/detail?ids='+this.id)
      .then(
        function(res){
          // console.log("详情",res);
          that.song_pic = res.data.songs[0].al.picUrl;
          that.song_name= res.data.songs[0].name;
        },
        function(err){
          console.log(err);
        }
      );
      },// 播放音乐

      // 播放mve
      playMv(e){
        console.log("MV方法",e);
        let mid = e.v.mvid;
        console.log(mid);
        let that = this;
        axios.get("https://autumnfish.cn/mv/url?id="+mid)
        .then(
          function(res){
            console.log("获取mvid",res);
            that.mvUrl=res.data.data.url;
          },
          function(err){
            console.log(err);
          }

        )
      },
      mvPause(){
        $(".MV").removeClass("mvPlay").addClass("mvPause");
        $(".mask").removeClass("maskActive");
        $('.MV').trigger('pause');

      }
    
  }//methods
  

});//Vue
$(".audio")[0].addEventListener("play", function () {   //开始播放时触发
  $(".player_bar").removeClass("pause").addClass("act");
  $(".song_img").addClass("active");
  console.log("播放");
});

$(".audio")[0].addEventListener("pause", function () {   // 暂停时会触发，当播放完一首歌曲时也会触发
$(".player_bar").removeClass("act").addClass("pause");
$(".song_img").removeClass("active");
console.log("暂停")
});
$(".MV")[0].addEventListener("play",function(){
  $('.audio').trigger('pause');
  $(".MV").removeClass("mvPause").addClass("mvPlay");
  $(".mask").addClass("maskActive");
})


}
