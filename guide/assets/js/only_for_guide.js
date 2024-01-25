/**
 * 이 파일에는 가이드 목적으로만 작성된 js 코드, 함수 등이 들어있습니다.
 * 가이드 목적으로만 작성된 함수는 함수명이 "GUIDE_"로 사직합니다.
 * 가이드 목적으로만 작성된 전역 변수는 변수명이 "guide_"로 사직합니다.
 */

/**
 * Date.dateDiff() 멤버함수 추가.
 * 두 날짜 차이
 * @param {String/Date} valDate - 비교일자
 * @returns {Number}
 */
Date.prototype.dateDiff = function (valDate) {
	var dateComp;
	if (valDate instanceof Date) dateComp = valDate;
	else {
		if (valDate.toString().trim() == "") dateComp = new Date();
		else dateComp = new Date(Date.parse(valDate));
	}
	var timeDiff = this.getTime() - dateComp.getTime();
	var diffDays = Math.floor(timeDiff / 86400000); //(1000 * 3600 * 24)
	return diffDays;
};

let _codeMirror = null;

$(document).ready(function () {
	/**
	 * 문서의 모든 버튼(.btn_view_source)을 찾아서 해당 버튼이 들어 있는 .contents 블럭에서.
	 * 1) .guide_html(들)을 찾아서 .guide_html 안의 html을 뽑아냄. .contents 안에는 여러개의 .guide_html가 있을 수 있음.
	 * 2) .guide_js(들)을 찾아서 .guide_js 안의
	 * 찾아낸 html, css, js를 버튼의 data-target값이 id인 .source_viewer 안에 출력함.
	 */
	let viewerId, $htmls, $jscripts, viewer;
	$(".btn_view_source").each(function (i, button) {
		viewerId = $(button).attr("data-target"); // console.log( viewerId );
		$htmls = $(button).parents(".contents").find(".guide_html"); // console.log( $htmls );
		$jscripts = $(button).parents(".contents").find(".guide_js"); // console.log( $jscripts );

		GUIDE_setSourceViewer(viewerId, $htmls, $jscripts);
	});

	/**
	 * [사용안함] HTML, HTML+JS 버튼 클릭 시 처리
	 * - 소스로 보여질 부분 상위 태그에 .guide_html 추가해야 함.
	 * - .btn_view_source가 들어 있는 상위 .contents 안에 .source-viwer 블럭이 있어야 함.
	 */
	$(".btn_view_source").on("click", function (event) {
		let $button = $(event.currentTarget); // console.log( $button );
		let $viewer = $(event.currentTarget.dataset.target); // console.log( $viewer );
		let $htmls = $button.parents(".contents").find(".guide_html"); // console.log( $htmls );
		$viewer.slideToggle();
		//	setSourceViewer($viewer, $htmls);
	});
});

/**
 * $viewer에 $htmls를 출력
 * @param {String} viewerId : 이곳에 소스(html, css, js)를 출력함.  앞에 '#'이 붙어있음.
 * @param {jquery array} $htmls : html, css, js 소스 리스트
 */
function GUIDE_setSourceViewer(viewerId, $htmls, $jscripts) {
	let source_html = "";
	let source_js = "";

	// html 소스 가져오기
	$htmls.each(function (i, html) {
		// console.log( html );
		source_html += `\n<!-- HTML (${i + 1}) -->
${String($(html).html()).replace(/^\n/g, "").trim()}
`;
	});
	// console.log( source_html );

	// javascript 소스 가져오기
	$jscripts.each(function (i, js) {
		// console.log( js );
		source_js += `<!-------------------->
<!-- Javascript (${i + 1}) -->
<!-------------------->
${String($(js).html()).replace(/^\n/g, "").trim()}\n
`;
	});
	// console.log( source_js );

	if (source_html === "" && source_js === "") return;

	$(viewerId).removeClass("hide");

	// CodeMirror 설치
	_codeMirror = CodeMirror(document.getElementById(viewerId.replace("#", "")), {
		theme: "rubyblue",
		mode: "htmlmixed",
		lineNumbers: true,
		styleActiveLine: true,
		lineWrapping: true,
		readOnly: true,
		autofocus: false,
	});
	_codeMirror.setValue(source_html.trim() + (source_js !== "" ? "\n\n" + source_js.trim() : ""));

	// display:none인 곳에 codeMirror 출력이 바로 안되는 증상이 있어서 .hide를 setValue 이후에 추가함.
	$(viewerId).addClass("hide");
}

/**
 * Preloader + 진행율 테스트용
 * 해당 문서의 모든 element가 로딩된 상태인지를 확인함.
 */
function GUIDE_loadingProgress() {
	let allElems = [...document.getElementsByTagName("*")];
	let allElemsLength = allElems.length;
	console.log(allElems, allElemsLength);
	allElems.forEach(function (elem, i) {
		setTimeout(function () {
			GUIDE_checkLoadedElement(elem, i, allElemsLength);
		}, 0);
	});
}

/**
 * Preloader + 진행율 테스트용
 * @param {Object} element - 페이지 로딩율
 * @param {Number} index - element의 순서
 * @param {Number} allElemsCount - 문서 전체의 element 수
 */
function GUIDE_checkLoadedElement(element, index, allElemsCount) {
	if ($(element).on()) {
		setPreloaderProgress(((index + 1) * 100) / allElemsCount);
	} else {
		console.log(`==== Reload ${index}`, element);
		GUIDE_checkLoadedElement(element, index, allElemsCount);
	}
}
