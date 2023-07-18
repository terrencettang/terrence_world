var social_media_path = '../../img/social_media/';
var social_media_links = [
  { alt: 'Facebook', href: 'https://www.facebook.com/terrencettang' },
  { alt: 'Instagram', href: 'https://www.instagram.com/terrencettang/' },
  { alt: 'Twitter', href: 'https://twitter.com/terrencettang' },
  { alt: 'Youtube', href: 'https://www.youtube.com/channel/UCY97ihGF8LQn_eGBNQdL72g' },
  { alt: 'Weibo', href: 'https://weibo.com/u/1926353997' },
  { alt: 'Reddit', href: 'https://www.reddit.com/user/terrencetang' },
  { alt: 'Pinterest', href: 'https://ro.pinterest.com/terrencettang' },
  { alt: 'Tumblr', href: 'https://www.tumblr.com/blog/terrencetangt-blog' },
  { alt: 'LinkedIn', href: 'https://www.linkedin.com/in/terrencettang/' },
  { alt: 'GitHub', href: 'https://github.com/terrencettang' },
  { alt: 'Kaggle', href: 'https://www.kaggle.com/terrencetangt' }
];
for (var i = 0; i < social_media_links.length; i++) {
  var img = document.createElement('img');
  img.alt = social_media_links[i].alt;
  img.src = social_media_path + social_media_links[i].alt + '.png';
  var a = document.createElement('a');
  a.href = social_media_links[i].href;
  a.target = '_blank';
  a.appendChild(img);
  document.querySelector('.social').appendChild(a);
}