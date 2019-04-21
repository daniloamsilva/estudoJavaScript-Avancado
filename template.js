// Constantes que identificam os elementos da tela
const listElement = document.querySelector('#list');
const languageSelect = document.querySelector('#language-tags')
const templateWorker = new Worker('./template_worker.js')

const config = new Proxy ({
	listItem: [],
	languageTag: 'en-US'
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

// Função que é executada quando a linguagme é mudada
function changeLanguage(){
	config.languageTag = languageSelect.value;
}

// Função atualizar a lista da busca
export function setList(list){
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