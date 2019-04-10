// Constantes que identificam os elementos da tela
const listElement = document.querySelector('#list');
const searchInput = document.querySelector('#search');

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

// Função render que lista os resultadas da busca
function render(){
	let html = '';
	// Cada elemento da lista é passado para o html
	listItem.forEach(item => {
		html += `
			<li>
				<div>
					<b>Name:</b> ${item.full_name}
				</div>
				<div>
					<b>Created At:</b> ${item.created_at}
				</div>
				<div>
					<b>Forks:</b> ${item.forks}
				</div>
			</li>
		`;
	})
	listElement.innerHTML = html;
}

render();