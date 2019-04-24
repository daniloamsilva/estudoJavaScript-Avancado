// Constantes que identificam os elementos da tela
const listElement = document.querySelector('#list');
const languageSelect = document.querySelector('#language-tags')
const templateWorker = new Worker('./template_worker.js')

const config = new Proxy ({
	listItem: JSON.parse(sessionStorage.getItem('listItems')) || [],
	languageTag: localStorage.getItem('lang') || 'en-US'
},{
	set: function(target, prop, value, receiver){
		if (prop === 'listItem' || prop === 'languageTag') {
			Reflect.set(...arguments);
			render();
			return true;
		}
		return false;
	}
})

// Listener para mudança de linguagem
languageSelect.addEventListener('change', changeLanguage);
languageSelect.value = config.languageTag;

// Função que é executada quando a linguagme é mudada
function changeLanguage(){
	const lang = languageSelect.value;
	localStorage.setItem('lang', lang);
	config.languageTag = lang;
}

// Função atualizar a lista da busca
export function setList(list){
	sessionStorage.setItem('listItems', JSON.stringify(list));
	config.listItem = list;
}

// Função render que lista os resultadas da busca
function render(){
	const configParam = JSON.parse(JSON.stringify(config));
	templateWorker.postMessage(configParam);

	templateWorker.onmessage = function({data}){
		listElement.innerHTML = data;
	}
	
}

(function start(){
	render();
})()