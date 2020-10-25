const displayYoutube = (media) => {
    let playerHtml = document.createElement('div');
    //console.log(playerHtml.data-plyr-provider);
    playerHtml.setAttribute('id', 'player');
    playerHtml.setAttribute('data-plyr-provider', media.service);
    playerHtml.setAttribute('data-plyr-embed-id', media.id);

    document.body.appendChild(playerHtml);
}