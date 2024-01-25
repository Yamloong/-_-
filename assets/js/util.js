//--v 전역 상수/변수 -----------------------------------------------------------------
var _LOADING_RATE_FIXED = 0; // 로딩율 출력할 소수점 자리수
var _MY_DOMAIN = "*"; // postMessage() 파라미터용

var _MODAL_CONFIRM_PARAM = null; // modalConfirm()에서 '예'버튼 클릭시 처리에 필요한 파라미터 전달용 변수
//--^ 전역 상수/변수 -----------------------------------------------------------------

$(document).ready(function () {
	//--v Event Listener -------------------------------------------------------

	// LNB 좌우 slide
	$("#lnb .btn_lnb_control").click(function () {
		// $('#lnb').animate({left: "-230px"});
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('#lnb').animate({left: "30px"});
			$('.container').animate({"paddingLeft": "280px"});
		}else{
			$(this).addClass('on');
			$('#lnb').animate({left: "-210px"});
			$('.container').animate({"paddingLeft": "30px"});
		}
	});

	// LNB 하위메뉴 slide
	$('#lnb .menu-list > li > a').on("click", function(){
		var $this = $(this).parent();
		if($this.hasClass('on')){
			$this.removeClass('on').find('.sub-menu').slideUp('fast');
		}else{
			$this.siblings().removeClass('on').find('.sub-menu').slideUp('fast');
			$this.addClass('on').find('.sub-menu').slideDown('fast');
		}
	});
	$('#lnb .menu-list > li.on').find('.sub-menu').slideDown('fast');

	//---- select2
	$(".select2").each(function (i, select2) {
		let placeholderText = $(select2).attr("data-placeholder"); // console.log(placeholderText);
		let required = $(select2).attr("required"); // console.log(required);
		$(select2).select2({
			minimumResultsForSearch: Infinity, // 검색창 제거
			placeholder: placeholderText,
			allowClear: !required, // clear 버튼[X] 노출
		});
	});
	$(".select2_input").each(function (i, select2) {
		let placeholderText = $(select2).attr("data-placeholder"); // console.log(placeholderText);
		let required = $(select2).attr("required"); // console.log(required);
		$(select2).select2({
			//			minimumResultsForSearch: Infinity,	// 검색창 제거
			placeholder: placeholderText,
			allowClear: !required, // clear 버튼[X] 노출
		});
	});

	// .form-select에 placeholder 기능 구현
	$(".form-select")
		.on("change", function () {
			let optionColor = $(this).find("option:selected").css("color"); // console.log(optionColor);
			$(this).css("color", optionColor);
		})
		.trigger("change");

	// input에 hover & focus 되었을때 테두리 색상
	$(".input-wrap input").on("focus", function () {
		if(!$(this).attr("readonly")){
			$(this).parent().addClass("on");
		}
	});
	$(".input-wrap input").on("blur", function () {
		$(this).parent().removeClass("on");
	});

	// input.input_count textarea.input_count 등 입력 글자수 확인
	$(".input_count").on("keyup", calcInputLetters);
	$(".input_count").each(calcInputLetters); // 화면 로드시 input, textarea 초기값 글자수 계산 출력

	// input 입력값 초기화 버튼
	var btnClear = document.querySelectorAll(".btn-clear");
	btnClear.forEach(function (btn) {
		btn.addEventListener("click", function () {
			btn.parentNode.querySelector("input").value = "";
		});
	});

	// .tab-menu 제어
	$(".tab-menu li").click(function () {
		var tabM = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		// $(".tab-content .tab-section").removeClass("on").eq(tabM).addClass("on");
		tabCon(tabM);
	});

	function tabCon(index){
		// console.log(index);
		$(".tab-content").each(function(){
			$(this).find(".tab-section").removeClass('on').eq(index).addClass("on");
		});
	}
	
	// .tab-menu 제어
	$(".menu_div li").click(function () {
		var tabM = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".tab-content .tab-section").removeClass("on").eq(tabM).addClass("on");
	});

	// .tooltip 제어
	$(".tooltip-wrap .btn_tooltip").click(function () {
		$(this).parent().find('.tooltip').fadeToggle('fast');
	});
	$(".tooltip-wrap .btn_close").click(function () {
		$(this).parents('.tooltip').fadeOut('fast');
	});

	//--^ Event Listener -------------------------------------------------------

});

	
/**
 * document에 select2, bootstrap datepicker element가 동적으로 추가되면 이 함수를 호출해 줘야 함 
 */
 function	refreshBody() {
	//---- select2 초기화
	$(".select2").each(function(i, select2) {
		$(select2).select2({
			minimumResultsForSearch: Infinity,	// 검색창 제거
		});
	});
}


//--v datepicker -----------------------------------------------------
$(document).ready(function () {
	let today = new Date();
	//--v Default -----------------------------------------------------
	$(".datepicker").datepicker({
		todayHighlight: true,
		dateFormat: "yy.mm.dd",
		monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		changeMonth: false, // 연도 셀렉트 선택 미사용
	});
	//--^ Default -----------------------------------------------------

	//--v 기간입력 -----------------------------------------------------
	var dateFormat = "mm/dd/yy",
		from = $(".from")
			.datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				numberOfMonths: 1, //보여지는 달력 갯수
				dateFormat: "yy.mm.dd",
				monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
				dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				// minDate: -20, maxDate: "+1M +10D", // 최소날짜, 최대날짜 설정시
				changeMonth: false, // 연도 셀렉트 선택 미사용
			}),
		to = $(".to")
			.datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				numberOfMonths: 1, //보여지는 달력 갯수
				dateFormat: "yy.mm.dd",
				monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
				dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				// minDate: -20, maxDate: "+1M +10D", // 최소날짜, 최대날짜 설정시
				changeMonth: false, // 연도 셀렉트 선택 미사용
			});

	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}
		return date;
	}
	//--^ 기간입력 -----------------------------------------------------
});

//--^ datepicker -----------------------------------------------------

//--v 날짜 관련 함수 -----------------------------------------------------------------
/**
 * Date.dateAdd() 멤버함수 추가.
 * 초/분/시간/일 +/- 연산 제공. 월/년은 추가 개발 필요
 * @param {String} interval - s/n/h/d
 * @param {Number} value - +/- 할 값
 * @returns {Date}
 */
Date.prototype.dateAdd = function (interval, value) {
	let dateReturn = new Date(this);
	switch (interval) {
		case "d": // 일
			dateReturn.setTime(dateReturn.getTime() + value * 1000 * 60 * 60 * 24);
			break;
			break;
		case "ww": // 주
			dateReturn.setTime(dateReturn.getTime() + value * 1000 * 60 * 60 * 24 * 7);
			break;
			break;
	}
	return dateReturn;
};
/**
 * periodCode에 따른 기간 입력창 set
 * @param periodCode {String} periodCode
 * @param $inputS {} 시작일 입력창
 * @param $inputE {} 종료일 입력창
 */
function setInputPeriod(button, periodCode, $inputS, $inputE) {
	let periodResult = calcDates(periodCode);

	if (typeof $inputS === "undefined" && typeof $inputE === "undefined") {
		let $inputS = $(button).parents(".input_period_wrap").find(".from");
		let $inputE = $(button).parents(".input_period_wrap").find(".to");

		if ($.fn.datepicker) {
			$inputS.datepicker("setDate", periodResult.dateS); //console.log( $inputS.val() );
			$inputE.datepicker("setDate", periodResult.dateE); //console.log( $inputE.val() );
		}
	} else {
		if ($.fn.datepicker) {
			$inputS.datepicker("setDate", periodResult.dateS); //console.log( $inputS.val() );
			$inputE.datepicker("setDate", periodResult.dateE); //console.log( $inputE.val() );
		}
	}
}

/**
 * 기간 코드에 따라 시작일, 종료일 계산
 * @param periodCode {String} 기간 코드
 * @returns { dateS, dateE } : 시작일, 종료일
 */
function calcDates(periodCode) {
	let today = new Date(); // 오늘
	let weekday; // 계산용
	let dateS = new Date();
	let dateE = new Date(); // return용 - 시작일, 종료일

	switch (periodCode) {
		case "d0": //오늘
			// dateS = today;
			break;
		case "d-1": //어제
			dateS = today.dateAdd("d", -1); // 어제부터
			break;
		case "d+1": //내일까지
			dateE = today.dateAdd("d", 1);
			break;
		case "d-3": //최근 3일
			dateS = today.dateAdd("d", -2);
			break;
		case "d-7": //최근 7일
			dateS = today.dateAdd("d", -6);
			break;
		case "d-14": //최근 14일
			dateS = today.dateAdd("d", -14);
			break;
		case "d-15": //최근 15일
			dateS = today.dateAdd("d", -15);
			break;
		case "d-30": //최근 30일
			dateS = today.dateAdd("d", -30);
			break;

		case "w0": //금주
			weekday = today.getDay();
			dateS = today.dateAdd("d", -weekday);
			dateE = dateS.dateAdd("d", 6); // 오늘까지로 하고자하면 이 줄을 remarking
			break;
		case "w-1": //전주
			weekday = today.getDay();
			dateS = dateS.dateAdd("d", -(weekday + 7));
			dateE = dateS.dateAdd("d", 6);
			break;
		case "w+1": //다음주
			weekday = today.getDay();
			dateS = dateS.dateAdd("d", 7 - weekday);
			dateE = dateS.dateAdd("d", 6);
			break;

		case "m0": //금월
		case "M0":
			dateS.setDate(1);
			//			dateE = new Date(today.getFullYear(), today.getMonth()+1, 0);	// 이번달 말일까지로 하고자하면 해당 줄 주석 해제
			break;
		case "m-1": //전월
			dateS = new Date(today.getFullYear(), today.getMonth() - 1, 1);
			dateE = new Date(today.getFullYear(), today.getMonth(), 0);
			break;

		case "lm-1": //최근1개월
			dateS = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
			break;
		case "lm-3": //최근1개월
			dateS = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
			break;

		case "y0": //금년
			dateS.setMonth(0);
			dateS.setDate(1);
			dateE = new Date(today.getFullYear(), 11, 31); // 오늘까지로 하고자하면 이 줄을 remarking
			break;
		case "y-1": //작년
			dateS.setYear(dateS.getFullYear() - 1);
			dateS.setMonth(0);
			dateS.setDate(1);
			dateE = new Date(dateS.getFullYear(), 11, 31);
			break;

		case "M-1": //전월 ~금월
			dateS = new Date(today.getFullYear(), today.getMonth() - 1, 1);
			break;
		case "M-3": //3개월(금월 포함)
			dateS = new Date(today.getFullYear(), today.getMonth() - 2, 1);
			break;
		case "M-6": // 6개월(금월 포함)
			dateS = new Date(today.getFullYear(), today.getMonth() - 5, 1);
			break;
		case "M-12": // 6개월(금월 포함)
			dateS = new Date(today.getFullYear(), today.getMonth() - 11, 1);
			break;
	}
	//	console.log( dateS, dateE );
	return { dateS: dateS, dateE: dateE };
}
//--^ 날짜 관련 함수 -----------------------------------------------------------------

//--v 숫자 관련 함수 -----------------------------------------------------------------
/*
 * 숫자를 문자열로 변환하기
 */
function numberLocaleString(input, fractionDigits) {
	let val = String(input.value).replace(/[^0-9.\-]/g, ""); // 숫자/./- 문자만 남기고 제거

	input.addEventListener("keyup", function (e) {
		let value = e.target.value;
		value = Number(value.replaceAll(",", ""));
		if (isNaN(value)) {
			input.value = 0;
		} else {
			var formatValue = value.toLocaleString("ko-KR");
			input.value = formatValue;
		}
	});
}

//--^ 숫자 관련 함수 -----------------------------------------------------------------

//--v GRID 메세지 함수 -----------------------------------------------------------------
/**
 * GRID에 메시지용 box element를 추가함.
 */
function Grid_appendMessageBox() {
	$("#ib-container").append(`
<div class="grid-message-wrap">
	<div class="message-body">
		<div class="msgText"></div>
		<i class="icon-warning"></i>
	</div>
</div>
`);
}
function Grid_showMessage(msg) {
	$msgBox = $("#ib-container").find(".grid-message-wrap");
	$msgBox.addClass("show");
	$msgBox.find(".msgText").html(msg);
}
function Grid_hideMessage() {
	$msgBox = $("#ib-container").find(".grid-message-wrap");
	$msgBox.removeClass("show");
}
//--^ GRID 메세지 함수 -----------------------------------------------------------------

//--v 모달 관련 함수 -----------------------------------------------------------------
$(document).ready(function () {
	// 레이어 활성화
	$(".btn_layer").on("click", function (event) {
		let $button = $(event.currentTarget);
		let $popupName = $(event.currentTarget.dataset.target);
		$popupName.fadeIn("fast");
		$("body").addClass("scroll_lock");
	});
	// 레이어 비활성화
	$(".layerPopup .btn_close").on("click", function () {
		$(this).parents(".layerPopup").fadeOut("fast");
		$("body").removeClass("scroll_lock");
	});
});
//--^ 모달 관련 함수 -----------------------------------------------------------------

//--v Preloader 관련 함수 ----------------------------------------------------------
function preloader(show, text, isTest) {
	if (show === "show") {
		$(".preloader_backdrop").fadeIn();
		$(".preloader_text").html(text).addClass("ON");
		$("body").addClass("scroll_lock");

		if (isTest) {
			setTimeout(function () {
				preloader("hide");
			}, 2000);
		}
	} else {
		$(".preloader_backdrop").fadeOut();
		$(".preloader_text").removeClass("ON");
		$("body").removeClass("scroll_lock");
	}
}

function preloader_progress(show, isTest) {
	if (show === "show") {
		$(".preloader_backdrop").fadeIn();
		$(".preloader_rate").addClass("ON");
		$("body").addClass("scroll_lock");

		if (isTest) GUIDE_loadingProgress();
	} else {
		$("body").removeClass("scroll_lock");
		$(".preloader_rate").removeClass("ON");
		$(".preloader_backdrop").fadeOut();
	}
}

/**
 * Progress rate에 표시를 함.
 * @param {Number} loadingRate - 페이지 로딩율
 */
function setPreloaderProgress(loadingRate) {
	$(".preloader_rate").find(".value").text(parseFloat(loadingRate).toFixed(_LOADING_RATE_FIXED));
	if (loadingRate >= 99.999999) {
		preloader_progress("hide");
	}
}
//--^ Preloader 관련 함수 ----------------------------------------------------------

//--v 기타 함수 --------------------------------------------------------------------

/**
 * [.input_count keyup 이벤트 리스너] .input_count 입력글자수 계산.
 */
function calcInputLetters() {
	if ($(this).find(" + .text_len > .cur_len").length === 0) return;

	let letters = $(this).val().length; // console.log(letters);
	let maxlength = $(this).attr("maxlength"); // console.log(maxlength);
	$(this).find(" + .text_len > .cur_len").html(letters);
	if (letters >= maxlength) {
		// alert(`최대 입력글자수(${maxlength}자)를 초과하였습니다.`);
		$(this).val($(this).val().substring(0, maxlength));
		$(this).find(" + .text_len > .cur_len").html(maxlength);
	}
}

/**
 * input[type=text] oninput 이벤트에서 호출하여 패턴 문자만 입력가능하게 함.
 * @param {Object} input element
 * @param {String} pattern 입력가능한 문자 pattern
 */
function checkInputPattern(input, pattern) {
	let regex = new RegExp("[^" + pattern + "]", "g"); //console.log( regex );
	input.value = input.value.replace(regex, "").replace(/(\..*)\./g, "$1");
}
