// Constantes que identificam os elementos da tela
const listElement = document.querySelector('#list');
const searchInput = document.querySelector('#search');
const languageSelect = document.querySelector('#language-tags')

// Variável de controle da linguagem
let languageTag = 'en-US';

// Lista de resultados estáticos para testes
let listItem = [
	{
		full_name: 'JavaScript',
		created_at: '2020-07-25T20:10:50Z',
		forks: 300300
	},
	{
		full_name: 'JavaScript 2',
		created_at: '2020-07-25T20:10:50Z',
		forks: 18300
	},
	{
		full_name: 'JavaScript 3',
		created_at: '2020-07-25T20:10:50Z',
		forks: 730
	}
]

// Listener para mudança de linguagem
languageSelect.addEventListener('change', changeLanguage);

// Função que é executada quando a linguagme é mudada
function changeLanguage(){
	languageTag = languageSelect.value;
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

render();