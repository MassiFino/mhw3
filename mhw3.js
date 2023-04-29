

function onJson(json){
	console.log(json);
	const album = document.querySelector('#album-view');
	album.innerHTML = '';

	for(let element of json.data){
		const title = element.attributes.canonicalTitle;
		if(element.attributes.coverImage=== null)
			break;
		const image_url = element.attributes.coverImage.original;
		const description = element.attributes.description;
		const start_date = element.attributes.startDate;
		const sezione = document.createElement('div');
		sezione.classList.add('blocco');
		const image = document.createElement('img');
		image.src = image_url;
		const caption= document.createElement('h4');
		caption.textContent= title;
		const descrizione = document.createElement('span');
		const botton = document.createElement('div');
		botton.classList.add('grassetto');
		botton.textContent= 'traduci';
		const testo = document.createElement('span');
		testo.textContent=description;
		descrizione.appendChild(testo);
		descrizione.appendChild(botton);
		sezione.appendChild(caption);
		sezione.appendChild(image);
		sezione.appendChild(descrizione);
		album.appendChild(sezione);

		botton.addEventListener('click', Selected);

		function Selected(event){
			console.log('sono nella selected');
			const bottone = event.currentTarget;
			const sezione = bottone.parentNode;
			const descr = sezione.querySelector('span');
			console.log(descr);

			fetch('https://rapid-translate-multi-traduction.p.rapidapi.com/t',{
  					method: 'POST',
  					headers:{
  						'content-type': 'application/json',
  						'X-RapidAPI-Key': '4e9e3b60cdmsh49cc360e9f89322p1de689jsn0a8fdbe676c2',
							'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
  					},
  					body: JSON.stringify({
  						from: 'en',
  						to: 'it',
  						q: descr.textContent
  					})
  			}).then(onResponse2).then(onJson2);

  			bottone.removeEventListener('click', Selected);;
		}

		function onResponse2(response){
  			return response.json();
  		}

  		function onJson2(json){
			console.log(json);
			descrizione.textContent=json;
		}

	}
}


function search(event){
  		event.preventDefault();
  		const valore_input = document.querySelector('#tipo');
  		const valore_c = encodeURIComponent(valore_input.value);
  		const content_input = document.querySelector('#content')
		const content_value = encodeURIComponent(content_input.value);

		console.log('Eseguo ricerca: ' + content_value);
		if(valore_c ==='immagine'){

  		fetch('https://kitsu.io/api/edge/anime?filter[text]'+ content_value,{
    			headers: {
        					'Accept':'application/vnd.api+json',
        					'Authorization':token_data.token_type + '' + token_data.access_token,
        					'Content-Type':'application/x-wwwform-urlencoded'
    			}
		}).then(onResponse).then(onJson);
  	}
  }

  function onResponse(response){
    return response.json();
}

  function onTokenJson(json){
	console.log(json);
	token = json.access_token;
}
function getToken(json){
	token_data = json;
	console.log(json);
}


const form = document.querySelector('form');
form.addEventListener('submit', search);
 



const api_key='';
const email= 'masssifino@gmail.com';
const password = 'ciaociao1';

let token_data;
fetch('https://kitsu.io/api/oauth/token',{
    method:'POST',
    body:'grant_type=password&username='+email+'&password='+password,
    headers:{ 
        'Content-Type':'application/x-www-form-urlencoded'
    }
}).then(onTokenResponse).then(getToken);

function onTokenResponse(response){
    return response.json();
}
