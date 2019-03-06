const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: '怀念青春',
        artist: '刘刚',
        url: 'https://gitee.com/athlonreg/blog-music/attach_files/download?i=213491&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F06%2FCE%2FPaAvDFx_UKSAfbeAAKVVlKysTVQ515.mp3%3Ftoken%3Dd2bfc17e3f99541f6c219ac211b4973b%26ts%3D1551847588%26attname%3Dhuainianqingchun.mp3',
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
        name: '一曲相思',
        artist: '半阳',
        url: 'http://music.163.com/song/media/outer/url?id=1313558186.mp3',
        cover: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=f65ae70fffd3572c72ef948eeb7a0842/77c6a7efce1b9d1601712a87fedeb48f8d5464a6.jpg',
      }
    ]
});
