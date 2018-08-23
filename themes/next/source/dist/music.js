const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: "一首关于理想的歌",
        artist: '小闯',
        url: 'http://music.163.com/song/media/outer/url?id=406752046.mp3',
        cover: 'https://github.com/athlonreg/BlogImages/blob/master/Images/blogcover/yishouguanyulixiangdege.jpg',
      },
      {
        name: '成都',
        artist: '赵雷',
        url: 'http://music.163.com/song/media/outer/url?id=436514312.mp3',
        cover: 'https://github.com/athlonreg/BlogImages/blob/master/Images/blogcover/chengdu.jpg',
      },
      {
        name: '化身孤岛的鲸',
        artist: '李逸朗',
        url: 'http://music.163.com/song/media/outer/url?id=30987882.mp3',
        cover: 'https://github.com/athlonreg/BlogImages/blob/master/Images/blogcover/huashengudaodejing.jpg',
      }
    ]
});
