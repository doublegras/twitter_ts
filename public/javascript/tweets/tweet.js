window.addEventListener('DOMContentLoaded', () => {
  //bindTweet est récursive pour recréer les listener sur la nouvelle liste de tweet
  bindTweet();
})

function bindTweet() {
  const elements = document.querySelectorAll('.boutonDelete');
  const tweetContainer = document.querySelector('#tweet-list-container');

  elements.forEach(element => {
    element.addEventListener('click', (e) => {
      const tweetId = e.target.getAttribute('tweetid');
      axios.delete('/tweets/' + tweetId)
           .then( response => {
             tweetContainer.innerHTML = response.data;
             bindTweet();
           }).catch( err => console.log(err));
    })
  })
}