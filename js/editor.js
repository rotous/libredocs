(function(){
	"use strict";

	var editor;

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
			content_style: 'body{margin:0.79in; padding:0;font-size:20px;}',
			setup: setupEditor
		});
	}

	function setupEditor(ed){
		editor = ed;

		editor.addMenuItem('MyFileMenu', {
			text: 'Open',
			context: 'file',
			onclick: onOpenFile
		});
	}

	var openfileInput;

	function onOpenFile(){
		if ( !openfileInput ){
			openfileInput = document.createElement('input');

			openfileInput.setAttribute('type', 'file');
			openfileInput.setAttribute('id', 'openfileinput');
			openfileInput.setAttribute('multiple', false);

			openfileInput.addEventListener('change', onOpenFileSelect);
		}

		openfileInput.click();
	}

	function onOpenFileSelect(event){
		event.preventDefault(); // prevent navigation to "#"

		var file = this.files[0];
		var fr = new FileReader();
		fr.onload = function(progressEvent){
//			console.log('fileReader loaded', progressEvent.target.result);
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if ( xhr.readyState < 4 ) return;
				var response;
				try {
					response = JSON.parse(xhr.response);
				} catch (ex){
					response = {html:'ERROR!!!'};
				}

				console.log('response:', response);

				editor.setContent(response.html);

			};
			xhr.open('POST', 'php/convert.php', true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send('data='+progressEvent.target.result);
		};
		fr.readAsDataURL(file);
	}
}());