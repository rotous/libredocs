window.onload = init;


function resizer(){
	window.addEventListener('resize', function() {
		var bodyRect = document.body.getBoundingClientRect();
		var bodyHeight = bodyRect.bottom -  bodyRect.top - 74;

		var ed = tinymce.activeEditor;
		if ( ed && bodyHeight){
			ed.iframeElement.style.height = bodyHeight + 'px' ;
		}
	});
}

function init(){
	resizer();

	var bodyRect = document.body.getBoundingClientRect();
	var bodyHeight = bodyRect.bottom -  bodyRect.top -74;

	tinymce.init({
		selector:'textarea',
		menubar: 'file edit',
		toolbar: 'bold italic underline strikethrough alignleft aligncenter alignright alignjustify',
		resize: false,
		statusbar: false,
		height: bodyHeight,
		content_style: 'body{margin:0.79in; padding:0;}'
	});
}
