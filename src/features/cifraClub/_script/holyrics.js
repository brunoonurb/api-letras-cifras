createUrlToSearch(input) {
  /** Monta a url para listar as músicas, dado
  o termo de busca.
  "key" e "cx" foram obtidos conforme explicado em: 
  https://developers.google.com/custom-search/v1/introduction?hl=pt-br#identify_your_application_to_google_with_api_key
  A configuração "cx" precisa conter apenas o site do vagalume. Visite o link acima para saber como criá-la. 
  */
  return 'https://www.googleapis.com/customsearch/v1?key={YOUR_GOOGLE_API_SECRET}&cx={YOUR_CX_CONFIG_ID}&q=' 
  	+ encodeURI(input.text);
}

function parseSearchResponseToList(response) {
 /*Lê o response da busca e monta a lista de exibição
 dentro do programa.*/
  var json = JSON.parse(response)['items'];
  var songs = [];
  for (var i = 0; i < json.length; i++) {
    var titleWithArtist = json[i]['title'].split('-')
    var title = titleWithArtist[0];
    var artist = titleWithArtist[1];
    var id = title + '#' + artist;
    songs.push({
      'id': id,
      'title': title,
      'artist_or_author': artist,
    });
  }
  return songs;
}

function createUrlToGetById(id) {
  /* Monta a URL responsável por capturar a letra da
  música desejada pelo usuário.
  A apiKey do Vagalume foi obtida conforme explicado aqui: 
  https://api.vagalume.com.br/docs/letras/
  */
  if(id == null)
  	return null;

  var songAndArtist = id.split("#");
  var song = songAndArtist[0].trim();
  var artist = songAndArtist[1].trim();
  return "https://api.vagalume.com.br/search.php?"  
  	+ "art=" + encodeURI(artist)
  	+ "&mus=" + encodeURI(song)
         + "&apikey=" + "{YOUR_VAGALUME_API_SECRET}";
}

function parseGetResponseToSong(response) {
  /* Monta o map de exibição da letra da música no painel direito.*/
  var json = JSON.parse(response);
  return {
    'title': json.mus[0].name,
    'artist': json.art.name,
    //'author': json.art.url,
    'lyrics': json.mus[0].text
  };
}