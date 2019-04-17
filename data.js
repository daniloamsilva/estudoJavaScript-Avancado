import * as $ from './template.js';

// Constante que identificam o elemento de input
const searchInput = document.querySelector('#search');

// Listener que espera um enter para iniciar a busca
searchInput.addEventListener('keyup', search);

// Função de busca
export default async function search(event){
	// Se o tecla digitada for enter, o busca é iniciada
	if (event && event.keyCode === 13) {
		const searchQuery = searchInput.value;
		let response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}`);
		response = await response.json();
		$.setList(response.items);
	}
}