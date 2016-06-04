(function() {
	
	var state = {};

	function saveState() {
		$('form input, form select').each(function (i, el) {
			state[ $(el).attr('name') ] = $(el).val();
		});
	}

	function restoreState() {
		for (var key in state) {
			if (!state.hasOwnProperty(key))
				continue;

			var el = $('form input[name="'+key+'"], form select[name="'+key+'"]');

			if (!el || state[key] === null || state[key] === undefined)
				continue;

			if (el.tagName == 'SELECT') {
				$(el).find('option[value="'+state[key]+'"]').prop('selected', true);

			} else {
				$(el).val(state[key]);
			}
		}
	}

	function fetchForm() {
		var name;

		switch ($('#entity-type').val()) {
		case 'fyzicka':
			name = 'fyzicka-osoba';
			break;

		case 'pravnicka':
			name = 'pravnicka-osoba';
			break;

		default:
			return;
		}

		saveState();

		$.ajax({
			url: '/prihlaska/'+name+'/form.html',
			success: function (data) {
				$('#form-placeholder').html(data);
				restoreState();
			}
		});
	}

	$('#continue').remove();
	$('#entity-type').change(fetchForm);

	$('form').attr('action', 'send.php');
	fetchForm();

}());