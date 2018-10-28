const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: '怀念青春',
        artist: '刘刚',
        url: 'http://music.163.com/song/media/outer/url?id=29800567.mp3',
        cover: 'https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/blogcover/huainianqingchun.jpg',
      },
      {
        name: '一首关于理想的歌',
        artist: '小闯',
        url: 'http://music.163.com/song/media/outer/url?id=406752046.mp3',
        cover: 'https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/blogcover/yishouguanyulixiangdege.jpg',
      },
      {
        name: '成都',
        artist: '赵雷',
        url: 'http://music.163.com/song/media/outer/url?id=436514312.mp3',
        cover: 'https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/blogcover/chengdu.jpg',
      },
      {
        name: '化身孤岛的鲸',
        artist: '李逸朗',
        url: 'http://music.163.com/song/media/outer/url?id=30987882.mp3',
        cover: 'https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/blogcover/huashengudaodejing.jpg',
      },
      {
        name: '沙漠骆驼',
        artist: '展展与罗罗',
        url: 'http://music.163.com/song/media/outer/url?id=486814412.mp3',
        cover: 'https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/blogcover/shamoluotuo.jpg',
      }
    ]
});
