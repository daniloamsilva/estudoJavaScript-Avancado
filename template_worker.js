self.onmessage = function({data}){
	const template = render(data);
	postMessage(template);
}

function render({listItems, languageTag}){
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
	return html;
}




	