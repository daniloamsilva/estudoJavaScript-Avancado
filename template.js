// Constantes que identificam os elementos da tela
const listElement = document.querySelector('#list');
const languageSelect = document.querySelector('#language-tags')

// Lista de resultados estáticos para testes
let listItem = [];

// Variável de controle da linguagem
let languageTag = 'en-US';

// Listener para mudança de linguagem
languageSelect.addEventListener('change', changeLanguage);

// Função que é executada quando a linguagme é mudada
function changeLanguage(){
	languageTag = languageSelect.value;
	render();
}

// Função atualizar a lista da busca
export function setList(list){
	listItem = list;
	render();
}

// Função render que lista os resultadas da busca
function render(){
	let html = '';

	// Formatadores para datas e números
	const numberFormatter = new Intl.NumberFormat(languageTag);
	const dateFormatter = new Intl.DateTimeFormat(languageTag, {week: 'long', year: 'numeric', month: 'long', day: 'numeric'});

	// Cada elemento da lista é passado para o html
	listItem.forEach(item => {

		// Os formatadores são atribuidos a datas e os forks
		const forks = numberFormatter.format(item.forks);
		const createdAt = dateFormatter.format( new Date(item.created_at));

		html += `
			<li>
				<div>
					<b>Name:</b> ${item.full_name}
				</div>
				<div>
					<b>Created At:</b> ${createdAt}
				</div>
				<div>
					<b>Forks:</b> ${forks}
				</div>
			</li>
		`;
	})
	listElement.innerHTML = html;
}