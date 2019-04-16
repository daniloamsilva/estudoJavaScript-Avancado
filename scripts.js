// Este módulo é responsavel pela parte visual da aplicação
const Template = (function(){
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
	function setList(list){
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

	// Retorno que deixa público somente o método setList()
	return {
		setList
	}

})()

// Este módulo é responsavel pelos dados da aplicação
const Data = (function($){
	// Constante que identificam o elemento de input
	const searchInput = document.querySelector('#search');

	// Listener que espera um enter para iniciar a busca
	searchInput.addEventListener('keyup', search);

	// Função de busca
	async function search(event){
		// Se o tecla digitada for enter, o busca é iniciada
		if (event && event.keyCode === 13) {
			const searchQuery = searchInput.value;
			let response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}`);
			response = await response.json();
			$.setList(response.items);
		}
	}

})(Template)