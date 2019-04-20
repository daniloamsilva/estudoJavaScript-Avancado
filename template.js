// Constantes que identificam os elementos da tela
const listElement = document.querySelector('#list');
const languageSelect = document.querySelector('#language-tags')
const templateWorker = new Worker('./template_worker.js')

const config = {
	listItem: [],
	languageTag: 'en-US'
}

// Listener para mudança de linguagem
languageSelect.addEventListener('change', changeLanguage);

// Função que é executada quando a linguagme é mudada
function changeLanguage(){
	config.languageTag = languageSelect.value;
	render();
}

// Função atualizar a lista da busca
export function setList(list){
	config.listItem = list;
	render();
}

// Função render que lista os resultadas da busca
function render(){
	templateWorker.postMessage(config);

	templateWorker.onmessage = function({data}){
		listElement.innerHTML = data;
	}
	
}