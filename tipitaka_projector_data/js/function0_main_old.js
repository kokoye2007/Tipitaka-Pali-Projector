// This function( toUniRegEx) is from "Digital Pali Reader (DPR)".
//
// GNU General Public License version 2.0 (GPLv2)
// https://sourceforge.net/projects/digitalpali/
// Related links https://pali.sirimangalo.org/
function toUniRegEx(input) {
	if(!input || input == '') return input;
	var nigahita = 'ṃ';
	var Nigahita = 'Ṃ';

	input = input.replace(/\-.r/g, 'ṝ').replace(/\.r/g, 'ṛ').replace(/\.R/g, 'Ṛ');
	input = input.replace(/\-.l/g, 'ḹ').replace(/\.h/g, 'ḥ');
	input = input.replace(/\"S/g, 'Ś').replace(/\"s/g, 'ś').replace(/\.S/g, 'Ṣ').replace(/\.s/g, 'ṣ');
	input = input.replace(/ee/g, 'ē').replace(/oo/g, 'ō');

	input = input.replace(/aa/g, 'ā').replace(/ii/g, 'ī').replace(/uu/g, 'ū').replace(/\.t/g, 'ṭ').replace(/\.d/g, 'ḍ').replace(/\"nk/g, 'ṅk').replace(/\"ng/g, 'ṅg').replace(/\.n/g, 'ṇ').replace(/\.m/g, nigahita).replace(/\u1E41/g, nigahita).replace(/\~n/g, 'ñ').replace(/\.l/g, 'ḷ').replace(/AA/g, 'Ā').replace(/II/g, 'Ī').replace(/UU/g, 'Ū').replace(/\.T/g, 'Ṭ').replace(/\.D/g, 'Ḍ').replace(/\"N/g, 'Ṅ').replace(/\.N/g, 'Ṇ').replace(/\.M/g, Nigahita).replace(/\~N/g, 'Ñ').replace(/\.L/g, 'Ḷ').replace(/\"n/g, 'ṅ');
	return input;
}

function replacei(str, sub, f){
	let A = str.toLowerCase().split(sub.toLowerCase());
	let B = [];
	let x = 0;
	for (let i = 0; i < A.length; i++) {
		let n = A[i].length;
		B.push(str.substr(x, n));
		if (i < A.length-1)
			B.push(f(str.substr(x + n, sub.length)));
		x += n + sub.length;
	}
	return B.join('');
}

function toTranslate(input) {
	out = '';
	input = '' + input;
	switch (view_left) {
		case 'Roman' :
			out = input;
			break;
		case 'Myanmar' :
			out = toMyanmar(input);
			break;
		case 'Sinhala' :
			out = toSinhala(input);
			break;
		case 'Thai' :
			out = toThai(input);
			break;
		case 'Devanagari' :
			out = toDevar(input);
			break;									 
	}
	return(out);
}

function toTranslateRight(input) {
	out = '';
	input = '' + input;
	switch (view_right) {
		case 'Roman' :
			out = input;
			break;
		case 'Myanmar' :
			out = toMyanmar(input);
			break;
		case 'Sinhala' :
			out = toSinhala(input);
			break;
		case 'Thai' :
			out = toThai(input);
			break;
		case 'Devanagari' :
			out = toDevar(input);
			break;									 
	}
	return(out);
}


    function change_tab(id) {
      document.write = localStorage.setItem('main_content', id);
      for (var i =1; i<=5; i++) { 
        document.getElementById("page" + i +"_desc").style.display = "none";
          document.getElementById("page" + i).className="notselected";
      }  
      document.getElementById(id).className="selected";
      document.getElementById(id + "_desc").style.display = "inline";

      if (id == "page2") {    // declension 
        document.getElementById('DictionaryKey').style.display = 'none';
        document.getElementById('GoDictionary').style.display = 'none';
        document.getElementById('DeclensionKey').style.display = 'inline';
        document.getElementById('GoDeclension').style.display = 'inline';

        var val = document.getElementById('DeclensionKey').value.trim();
        document.getElementById('DeclensionKey').value = val;
        
        DeclensionSearch();
        DeclensionTable(val);
        // document.getElementById('DeclensionKey').focus();
      } else {
        document.getElementById('DictionaryKey').style.display = 'inline';
        document.getElementById('GoDictionary').style.display = 'inline';
        document.getElementById('DeclensionKey').style.display = 'none';
        document.getElementById('GoDeclension').style.display = 'none';
      }

      if (id == "page4") {    // TOC
        PaliHistoryList();
      }
      if (id == "page5") {    // history
        DictHistoryList();
      }
     }


$.getScript("js/z_english.js");
$.getScript("js/z_grammar.js");
$.getScript("js/z_inflect.js");
//$.getScript("js/z_Pali_Keys.js");
$.getScript("js/z_translit.js");
$.getScript("js/z_tipitaka_Maps.js");
$.getScript("js/pali_sutta_no.js");

var ary = window.location.toString().split('.htm');
var html_file = ary[0].slice(-4) + '.htm';
var html_no = ary[0].slice(-4);

M_LOC = [];
file = 'pali/MyNote/' + html_no + '.js'; 
$.getScript(file); 

M_SCT = [];		// sutta_center;
DictionaryBackground = '';

function GetTrId(val) {
	document.write = localStorage.setItem('tr_id', val);

	h = parseInt(document.getElementById('main_div').style.height) - Math.max(34, parseInt(document.getElementById('main_div').style.top) + parseInt(document.getElementById('main_content').offsetTop));

	// document.getElementById('main_content').style.height = h + "px";

	Message(val);		// put message

	copystatus = document.getElementById('copystatus').value;
	if (copystatus == 'fetching') {
		copy1 = document.getElementById('copy1').value; 
		copy2 = document.getElementById('copy2').value; 
		if (copy1 == '*') {	// start
			document.getElementById('copy1').value = val;
			document.getElementById('copystatus').value = 'fetching';
			document.getElementById('m' + val).innerHTML = '<input type="checkbox" checked="">' + document.getElementById('m' + val).innerHTML;
		} else { 
			if (copy2 == '') {
				copy2 = val;
			}
			var s1 = Math.min(Number(val), Math.min(Number(copy1), Number(copy2)));
			var s2 = Math.max(Number(val), Math.max(Number(copy1), Number(copy2)));
			for (i=s1; i<=s2; i++) {
				if (P_HTM[i] != undefined) {
					document.getElementById('m' + i).innerHTML = document.getElementById('m' + i).innerHTML.replace('<input type="checkbox" checked="">', '');
				}
			}

			var s1 = Math.min(Number(copy1), Number(val));
			var s2 = Math.max(Number(copy1), Number(val));
			for (i=s1; i<=s2; i++) {
				if (P_HTM[i] != undefined) {
					document.getElementById('m' + i).innerHTML = '<input type="checkbox" checked="">' + document.getElementById('m' + i).innerHTML;
				}		
			} 
			document.getElementById('copy2').value = val; 
		}
	}	
}
 
//=============================================================
function sel_on_off() {
	contentdisplay = localStorage.getItem('contentdisplay');
	if (!contentdisplay) {
		contentdisplay = '0';
		document.write = localStorage.setItem('contentdisplay', contentdisplay);
	}

	if (localStorage.getItem('contentdisplay') == '0') {
		if (document.getElementById('main_div').style.display == 'none') {
			document.getElementById('main_div').style.display = 'inline';
		} else {
			document.getElementById('main_div').style.display = 'none';
		}
	}	
}

function RedrawTable(w) {
	//sc = screen.width;
	w1 = w;		//parseInt(w /screen.width * 100);
	w2 = document.body.getBoundingClientRect().width - w1;

	if (localStorage.getItem('contentposition') == '0') {  // float panel
		document.getElementById('main_td2').style.left = "0px";
		document.getElementById('main_td2').style.top = "0px";
		document.getElementById('main_td2').style.width = document.body.getBoundingClientRect().width + "px";
		document.getElementById('main_td2').style.height = window.innerHeight+ "px";
		
		w1 = parseInt(document.getElementById('main_div').style.width) + parseInt(document.getElementById('main_div').style.height);
		if (w1 < 600) {
			document.getElementById('main_div').style.width = '300px';
			document.getElementById('main_div').style.height = '300px';
		}
	} else {	// fixed panel
		document.getElementById('main_div').style.left = "0px";
		document.getElementById('main_div').style.top = "0px";
		document.getElementById('main_div').style.width= w1 + "px";
		document.getElementById('main_div').style.height= (window.innerHeight -30) + "px";
		document.getElementById('main_td2').style.left= w1 + "px";	
		document.getElementById('main_td2').style.width= w2 + "px";	
	}	 
	// document.getElementById('main_content').style.height = document.getElementById('main_div').style.height + "px"
}

function MATurlGo(no) {		// id = id number , no=1=mula, 2=att, 3=tika 4= anutika
	var tr_id = localStorage.getItem('tr_id'); 
	tr_id = parseInt(tr_id);

	// tr_id convert into Myanmar paragraph no.
	var para = 1;
	for (para=(P_Par.length-1); 0<para; para--) {
		if (P_Par[para] != null) {
			v1 = parseInt(P_Par[para].substring(1));
			if (v1<=  tr_id) {
				break;
			}
		}	
	} 	 
	//alert(tr_id + '   ' + para);

    v1 = T_Maps[html_no][no];
	var url = '';
	if (v1.indexOf(',') == -1) {
		url = v1;			// nnnn.htm 8 bytes
	} else {
		var ary = v1.split(',');
		for (i = (ary.length-1); 0 <= i; i--) {
			if (parseInt(T_Maps[ary[i]][5]) <= parseInt(para)) {
			  url = ary[i] ;
			  break;
			}
		}
	}

	url = url + '.htm#R' + para;
	//alert(url);
	document.write = localStorage.setItem('history_pos', url); 
	PaliHistoryGoUrl(url); 
}	

/*
@ CHANGE DEFAULT CSS BACKGROUND COLOR, FONT COLOR, TEXT SIZE
@ WARNING: It shall SLOWDOWN  the page load obviously, so if you know with value is suitable for your device, fix your text-size number in projector_style.css
@ default text-size is delared in the projector_style.css
@ Default values left column text-size: 25pt, right column 20pt;
@ This function help to custom text-size on small-screen devices.
*/
var isPopupMode = localStorage.getItem("popupword");

//---------------------------------
// 1. Left Font-size, Line-Height
var load_size_left = localStorage.getItem('size_left');
if (!load_size_left) { load_size_left = '1.0'; document.write = localStorage.setItem('size_left', load_size_left); }

// 4. Left Font-Family
var load_font_left = localStorage.getItem('font_left');
if (!load_font_left) { load_font_left = 'DejaVuSansCondensed'; document.write = localStorage.setItem('font_left', load_font_left); }

// 6. Background-Color
var load_bg_color = localStorage.getItem('bg_color');
if (!load_bg_color) { load_bg_color = '#f3ddb6'; document.write = localStorage.setItem('bg_color', load_bg_color); }

// 2. Right Font-size, Line-Height
var load_size_right = localStorage.getItem('size_right');
if (!load_size_right) { load_size_right = '1.0'; document.write = localStorage.setItem('size_right', load_size_right); }

// 5. Right Font-Family
var load_font_right = localStorage.getItem('font_right');
if (!load_font_right) { load_font_right = 'DejaVuSansCondensed'; document.write = localStorage.setItem('font_right', load_font_right); }
//---------------------------------

var view_left = localStorage.getItem("view_left");
if (!view_left) { view_left = 'Roman'; document.write = localStorage.setItem('view_left', view_left); }

var view_right = localStorage.getItem("view_right");
if (!view_right) { view_right = 'Space'; document.write = localStorage.setItem('view_right', view_right); }

var newscript = document.createElement('script');
newscript.setAttribute('type', 'text/javascript');
newscript.setAttribute('src', 'pali/' + html_no + '.js');
var head = document.getElementsByTagName('head')[0];
head.appendChild(newscript);

var newscript = document.createElement('script');
newscript.setAttribute('type', 'text/javascript');
newscript.setAttribute('src', 'pali/' + html_no + 'a.js');
var head = document.getElementsByTagName('head')[0];
head.appendChild(newscript);

if (view_right == 'Suttacentral') {
	file = 'pali/Suttacentral/' + html_no + '.js'; 
	$.getScript(file); 	
} 

$(window).on('load', function () {
	$(".r1").click(function () { 
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)
        if (latestElementClickedJqueryObject) {
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
        }
        $(this).addClass("recentClickedCSSright");

        GetTrId($(this).attr('id').substring(1));

		word_click();
		if (t.length > 0) {
			//lookupCoordinator(t, 0);	//$changecolor = $ns % 2; /
			document.getElementById('main_div').style.display = 'inline';
			
			if (localStorage.getItem('main_content') == 'page1') {
				DictionaryKeyGo();
			} else {	
				if (localStorage.getItem('main_content') == 'page2') {
					change_tab('page2');
				} else {
					if (localStorage.getItem('main_content') == 'page3') {
						ParagraphAnalysis();
						window.location= '#G_' + t;
					}
				}
			}	 
		}
	});

	$(".m1").bind('click', function () {
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)
        if (latestElementClickedJqueryObject) {
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
        }
        $(this).addClass("recentClickedCSSleft");
        latestElementClickedJqueryObject = $(this);

        GetTrId($(this).attr('id').substring(1));

		if ((localStorage.getItem('contentdisplay') == '0') && (localStorage.getItem('contentposition') == '0')) {
			if (document.getElementById('main_div').style.display == 'none') {
				document.getElementById('main_div').style.display = 'inline';
			} else {	
				document.getElementById('main_div').style.display = 'none';
			}	
		}

		if (localStorage.getItem('main_content') == 'page3') { // grammer 
			ParagraphAnalysis();
		}	
	}); 

	$(".pages").click(function () {
		word_click();
		if (t.length > 0) {
			DictionaryKeyGo();
			change_tab('page1');

			if ((hee1 ==1) && (localStorage.getItem("speech_repeat") != '0')) {
				for (var idx=1; idx<=localStorage.getItem("speech_repeat"); idx++) {
					speakSynthesis(t);//repeat 2 times
				}
			}
		}
	});


	//------------
	//------------
	var s1 = '';

	var para_no = '1';

	var Sr_key = localStorage.getItem("Sr_key");
	if (Sr_key) {
		var Sr_ary = Sr_key.split(' ');
	}
	var Sr_id = localStorage.getItem('Sr_id'+ html_no);

	for (var idx in P_HTM) {
		var Sr_run = '';
		if (Sr_key) {
			if (Sr_id) {
				if (Sr_id.indexOf(';' + idx + ';') != -1) {
					var Sr_run = '1';
				}
			}
		}

		var pali2 = P_HTM[idx].split('*');
		var tags2 = P_Tag[idx].split('*');

		// get para_no
		var s0 = 'p' + idx;
		var s0 = P_Par.findIndex(key => key === s0);
		if (s0 != -1) {
			para_no = s0;
		}

		var n1 = '{!@#' + idx + '#@!}';
		var pali = P_HTM[idx].split('*');
		var tags = P_Tag[idx].split('*');

		s1 = '';
		s2 = '';

		for (var idy in pali) {
			if (idy == 20) {
				break;
			}
			//
			pali[idy] = toTranslate(pali[idy]);
			if (Sr_run == '1') {
				for (var Sr_ndx in Sr_ary) {
					pali[idy] = replacei(pali[idy], toTranslate(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toTranslate(Sr_ary[Sr_ndx]) + "</span>");
				}
			}
			s1 = s1 + pali[idy] + tags[idy];

			if ((view_right != 'Space') && (view_right != 'MyNote') && (view_right != 'Suttacentral')) {
				pali2[idy] = toTranslateRight(pali2[idy]);
				if (Sr_run == '1') {
					for (var Sr_ndx in Sr_ary) {
						pali2[idy] = replacei(pali2[idy], toTranslateRight(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toTranslateRight(Sr_ary[Sr_ndx]) + "</span>");
					}
				}
				s2 = s2 + pali2[idy] + tags2[idy].replace('<p class="', '<p class="m1_');
			}
		}

		if (view_right == 'MyNote') {
			tmp = localStorage.getItem('n' + html_no + '_'+idx);

			if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
				s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
				M_LOC[idx] = tmp;
			} else {	
				tmp = M_LOC[idx];
				if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
					document.write = localStorage.setItem('n' + html_no + '_'+idx, tmp);
					s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
				}
			}	
		}

		if (view_right == 'Suttacentral') {
			tmp = M_SCT[idx];
			if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
				s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
			}	
		}
		document.getElementById('p' +idx).innerHTML = s1;
		document.getElementById('m' +idx).innerHTML = s2;
	}

	if (localStorage.getItem('Pali_note') == 'none') {
		$(".note").css("display", 'none');
	} else {
		$(".note").css("display", 'inline');
	}

	if (Sr_id != null) {
		document.getElementById('Sr_Div').style.visibility = '';
		document.getElementById('Sr_Next').innerHTML = Sr_id.split(';').length - 2;
		if (Sr_id.length < 2) {
			document.getElementById('Sr_Div').style.visibility = 'hidden';
		}
	}

    // 1. Left Font-size, Line-Height
	$("select#size_left").val(load_size_left);
	var p24 = parseInt(load_size_left * 24);
	var p30 = parseInt(load_size_left * 30);
	var p33 = parseInt(load_size_left * 33);
	var p36 = parseInt(load_size_left * 36);
	var r1 =  parseInt(load_size_left * 25); 
	$(".r1").css("font-size",	r1  + "pt");	//--------td
	$(".b1").css("font-size",	p24 + "pt");	//bodytext
	$(".b2").css("font-size",	p33 + "pt");	//book
	$(".c3").css("font-size",	p24 + "pt");	//centered
	$(".c4").css("font-size", 	p30 + "pt");	//chapter
	$(".g5").css("font-size", 	p24 + "pt");	//gatha1
	$(".g6").css("font-size", 	p24 + "pt");	//gatha2
	$(".g7").css("font-size", 	p24 + "pt");	//gatha3
	$(".g8").css("font-size",	p24 + "pt");	//gathalast
	$(".h9").css("font-size",	p24 + "pt");	//hangnum
	$(".ia").css("font-size",	p24 + "pt");	//indent
	$(".nb").css("font-size",	p36 + "pt");	//nikaya
	$(".sc").css("font-size", 	p24 + "pt");	//subhead
	$(".sd").css("font-size", 	p24 + "pt");	//subsubhead
	$(".te").css("font-size", 	p24 + "pt");	//title
	$(".uf").css("font-size", 	p24 + "pt");	//unindented
 
    // 2. Right Font-size, Line-Height
	$("select#size_right").val(load_size_right);
	var p24 = parseInt(load_size_right * 24);
	var p30 = parseInt(load_size_right * 30);
	var p33 = parseInt(load_size_right * 33);
	var p36 = parseInt(load_size_right * 36);
	var m1 =  parseInt(load_size_right * 25); 
	$(".m1").css("font-size",	m1  + "pt");	//--------td
	$(".m_b1").css("font-size",	p24 + "pt");	//bodytext
	$(".m_b2").css("font-size",	p33 + "pt");    //book
	$(".m_c3").css("font-size",	p24 + "pt");    //centered
	$(".m_c4").css("font-size",	p30 + "pt");    //chapter
	$(".m_g5").css("font-size",	p24 + "pt");    //gatha1
	$(".m_g6").css("font-size",	p24 + "pt");    //gatha2
	$(".m_g7").css("font-size",	p24 + "pt");    //gatha3
	$(".m_g8").css("font-size",	p24 + "pt");    //gathalast
	$(".m_h9").css("font-size",	p24 + "pt");    //hangnum
	$(".m_ia").css("font-size",	p24 + "pt");    //indent
	$(".m_nb").css("font-size",	p36 + "pt");    //nikaya
	$(".m_sc").css("font-size",	p24 + "pt");    //subhead
	$(".m_sd").css("font-size",	p24 + "pt");    //subsubhead
	$(".m_te").css("font-size",	p24 + "pt");    //title
	$(".m_uf").css("font-size",	p24 + "pt");    //unindented 

	p = localStorage.getItem('contentposition');
	if (!p) {
		p = '0';		// floating
		document.write = localStorage.setItem('contentposition', '0'); 
	} 

	t = localStorage.getItem('main_top');
	l = localStorage.getItem('main_left');
	w = localStorage.getItem('main_width');
	h = localStorage.getItem('main_height');
	if (p == '0') {		// floating
		if (!t) {
			t = 0;
		} 
		t = parseInt(t);
		t = Math.max(0, Math.min(t, parseInt(window.innerHeight * 0.90)));

		if (!l) {
			l =0;
		}
		l = parseInt(l);
		l = Math.max(0, Math.min(l, parseInt(window.innerWidth * 0.90)));
		
		if (!w) {
			w = window.innerWidth;
		} 
		w = parseInt(w);
		w = Math.max(250, Math.min(w, parseInt(window.innerWidth -l -20)));

		if (!h) {
			h = 150;
		}
		h = parseInt(h);
		h = Math.max(150, Math.min(h, parseInt(window.innerWidth -t -30)));
	} else {
		t = '0';
		l = '0';

		w = localStorage.getItem('main_width');
		if (!w) {
			w = parseInt(window.innerWidth * 0.50);
		} 
		if ((parseInt(w) < 10) || (parseInt(w)> parseInt(window.innerWidth *0.80))) {
			w = parseInt(window.innerWidth * 0.50);
		}

		h = localStorage.getItem('main_height');
		if (!h) {
			h = parseInt(window.innerHeight * 0.95);
		} 
		if ((h < parseInt(window.innerWidth *0.9)) || (parseInt(h)> parseInt(window.innerWidth *0.95))) {
			h = parseInt(window.innerHeight * 0.95);
		}
	}	

	document.write = localStorage.setItem('main_top', t); 
	document.write = localStorage.setItem('main_left', l); 
	document.write = localStorage.setItem('main_width', w); 
	document.write = localStorage.setItem('main_height', h); 

	document.getElementById('main_div').style.top = '' + t + 'px';
	document.getElementById('main_div').style.left = '' + l + 'px';
	document.getElementById('main_div').style.height = '' + h + 'px';
	document.getElementById('main_div').style.width = '' + w + 'px';

	document.getElementById('main_td2').style.width = (document.body.getBoundingClientRect().width - w) + 'px';

	tx = parseInt(document.getElementById('main_div').style.top);
	tx2 = document.getElementById('main_content').offsetTop;
	// document.getElementById('main_content').style.height = (h - tx2 - tx + 20)+ "px";

	if (p == '0') {		// floating
		RedrawTable(0);

		$('.page4').css('height', '98%');
		document.getElementById('page4break1').innerHTML = '<br>';

		$('.page5').css('height', '98%');
	} else {

		$('#iPadDirection').css('display', 'none');
		$('#iPadH').css('display', 'none');
		$('#iPadHeight').css('display', 'none');

		RedrawTable(parseInt(w));

		//page4 TOC
		$('.page4').css('width', '98%');
		$('.page4').css('height', '48%');
		document.getElementById('page4break1').innerHTML = '<br>';
		document.getElementById('page4break2').innerHTML = '<br>';
		document.getElementById('page4break3').innerHTML = '<br>'; 

		$('.page5').css('width', '98%');
		$('.page5').css('height', '32%');
		document.getElementById('page5break1').innerHTML = '<br>';
		document.getElementById('page5break2').innerHTML = '<br>';

		document.getElementById('divDragIcon').style.display = "none";
		document.getElementById('ResizeBottom').style.display = "none";
	}

	k = localStorage.getItem('contentmode');
	if (!k) {
		k = 'PC';
		document.write = localStorage.setItem('contentmode', k);
	}
	if (k == 'iPad') {
		document.getElementById('iPad').style.display = 'inline';
		document.getElementById('PC').style.display = 'none';
	} else {	
		document.getElementById('iPad').style.display = 'none';
		document.getElementById('PC').style.display = 'inline';
	}
	e = document.getElementById('iPadWidth');
	w1 = window.innerWidth - 25;
	for (i=30; i<=100; i=i+5) {
		w2 = parseInt(i * w1/100);
		e.options.add(new Option(i +'%', w2)); 
	}
	e = document.getElementById('iPadHeight');
	h1 = window.innerHeight - 35;
	for (i=30; i<=100; i=i+5) {
		h2 = parseInt(i * h1/100);
		e.options.add(new Option(i +'%', h2)); 
	}

	e = document.getElementById('AnkiDictionary');
	for (i in aryTemp) {
		if (aryTemp[i] == '1')	{	// enabled
			e.options.add(new Option(aryAbbr[i], i)); 
		}	
	}

	// 3. Left and Right width	p = localStorage.getItem('contentposition');
	if (view_right != 'Space') {
		var width_r1 = localStorage.getItem('width_left');
		var width_m1 = localStorage.getItem('width_right');
	} else {	//else {},  use css default r1 85%, m1 15% (15% width for empty place to click on touch screen)
		width_r1 = 92;
		width_m1 = 8;
	}
	$(".r1").css("width", width_r1 + '%');
	$(".m1").css("width", width_m1 + '%'); 

    // 4. Left Font-Family
	$("select#font_left").val(load_font_left);
	$(".r1").css("font-family", load_font_left);

    // 5. Right Font-Family
	$("select#font_right").val(load_font_right);
	$(".m1").css("font-family", load_font_right);

	// 6. Background-Color
    $("select#bg_color").val(load_bg_color);//reference https://stackoverflow.com/a/16979926
	document.getElementById('main_table').style.backgroundColor = load_bg_color;
	document.getElementById('main_div').style.backgroundColor = load_bg_color;

	// 7. Font Color
	var font_color = {
	'#f3ddb6':['#000000'],
	'#fff8dc':['#000000'],
	'#1f3763':['#fffffe'],
	'#000001':['#ffffff'],
	'#121212':['#b0b0b0'],
	'#010101':['#937811'],
	'#1e1e1e':['#628754'],
	'#090c11':['#2d3d4a'],
	'#3c3c3c':['#cecece'],
	'#5a5a5a':['#cacaca'],
	'#d7d4cd':['#626262'],
	'#e0e0e0':['#202020'],
	'#f0f0f0':['#008000'],
	'#fefefe':['#000000'],
	'#d8cbab':['#000001'],
	'#e2bdb4':['#010101']}
	var bld_color = {
	'#f3ddb6':['brown'],
	'#fff8dc':['brown'],
	'#1f3763':['#ffff00'],
	'#000001':['brown'],
	'#121212':['brown'],
	'#010101':['brown'],
	'#1e1e1e':['brown'],
	'#090c11':['brown'],
	'#3c3c3c':['brown'],
	'#5a5a5a':['brown'],
	'#d7d4cd':['brown'],
	'#e0e0e0':['brown'],
	'#f0f0f0':['brown'],
	'#fefefe':['brown'],
	'#d8cbab':['brown'],
	'#e2bdb4':['brown']}
	$(".r1").css("color", font_color[load_bg_color]);
	$(".m1").css("color", font_color[load_bg_color]);
	$(".bld").css("color", bld_color[load_bg_color]);
	// end of Pali script
 
	if (localStorage.getItem('contentdisplay') == '0') {
		document.getElementById('main_div').style.display = 'none';
	} else {	
		document.getElementById('main_div').style.display = 'inline';
	}

	r = localStorage.getItem('contentbackgroundR');
	if (!r) {
		r = 207;
	}
	g = localStorage.getItem('contentbackgroundG');
	if (!g) {
		g = 255;
	}
	b = localStorage.getItem('contentbackgroundB');
	if (!b) {
		b = 207;
	}
	document.getElementById('main_div').style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

	r = parseInt(r * 0.8);
	g = parseInt(g * 0.8);
	b = parseInt(b * 0.8);
	DictionaryBackground = 'background-color:rgb(' + r + ',' + g + ',' + b + ')';

	r = localStorage.getItem('contentfontcolorR');
	if (!r) {
		r = 0;
	}
	g = localStorage.getItem('contentfontcolorG');
	if (!g) {
		g = 0;
	}
	b = localStorage.getItem('contentfontcolorB');
	if (!b) {
		b = 0;
	}
	document.getElementById('main_div').style.color= 'rgb(' + r + ',' + g + ',' + b + ')';

	lineheight = localStorage.getItem('contentlineheight');
	if (!lineheight) {
		lineheight = '200';
	}
	document.getElementById('main_div').style.lineHeight= lineheight + '%';

	fontsize = localStorage.getItem('contentfontsize');
	if (!fontsize) {
		fontsize = '12';
	}
	$(".pages").css('font-size', fontsize + 'pt');
	$(".pages2").css('font-size', fontsize + 'pt');
	v1 = parseInt(fontsize * 0.9 + 0.5);
	//page3ResultStyle = page3ResultStyle + 'font-size:' + v1 + 'pt;';
	
	fontname =  localStorage.getItem('contentfontname');
	if (!fontname) {
		fontname = 'Tahoma';
	}
	$(".pages").css('font-family', fontname);
	$(".pages2").css('font-family', fontname);
	//page3ResultStyle = page3ResultStyle + 'font-family:"' + fontname +'";'; 

	change_tab('page1');

	// go to history position  ------------------------
	if (localStorage.getItem('history_pos') != null) {
		if (localStorage.getItem('history_pos') != '') {
			var pos = localStorage.getItem('history_pos');	// pos #MP
 
			if (pos.indexOf('p') != -1) {	// for id
				loc = pos.substring(1); 
				document.getElementById(loc).scrollIntoView();
			} else {
				if ((pos.indexOf('M') != -1) || (pos.indexOf('P') != -1)){		// myanmar or PTS page
					loc = pos.substring(1);
					var tr = document.getElementsByClassName('r1');
					for (var i=0; i<tr.length; i++) {
						if (tr[i].innerHTML.indexOf(loc) != -1) {
							document.getElementById('p' + (i +1)).scrollIntoView();
							Get(i+1);
							break;
						}
					}
				} else {			// R= from paragraph number to id
					pos = '#para' + pos.substring(2);
					window.location = pos;
				}
			} 
			document.write = localStorage.setItem('history_pos', ''); 
		}
	} 

	// Change Page4 TOC at none Roman Script
	if (view_left != 'Roman') {
		v1 = document.getElementById('Toc');
		try { 
			cx = v1.options.length
		    for(var i=0; i<cx; i++){ 
		        var e = v1.options[i];  
		        e.text = toTranslate(e.text);
		    } 
		 } catch(e) {
		} 
		if (view_left == 'Myanmar') {
			v1.style.fontfamily = 'Myanmar Text';
		}

	}  

	// Turn on/off MAT icons
	ary1 = [];
	ary1[1] = "Mūla";
	ary1[2] = "Aṭṭhakathā";
	ary1[3] = "Ṭīkā";
	ary2 = [];
	ary2[1] = 'M';
	ary2[2] = 'A';
	ary2[3] = 'T';
	for (i=1; i<=3; i++) { 
		if (T_Maps[html_no] == undefined) {
			document.getElementById('Pali' + i).innerHTML = ary2[i];
			document.getElementById('Pali' + i).style.color = '#777777';
		} else {	
			if ((html_no.substring(1,1) == i) || (T_Maps[html_no][i] == 'x') || (T_Maps[html_no][i] == '#'))  { 
				document.getElementById('Pali' + i).innerHTML = ary2[i];
				document.getElementById('Pali' + i).style.color = '#777777';
			}
		}	
	}	 

	// ----
	// Panel Drag & Resize
      var oDiv=document.getElementById("ResizeDrag");
      var omain_div=document.getElementById("main_div");
      //var h2=omain_div.getElementsByTagName("h2")[0];  
      var ResizeRight=document.getElementById("ResizeRight");
      var ResizeBottom=document.getElementById("ResizeBottom");
      var ResizeLeft=document.getElementById("ResizeLeft");
      var mouseStart={};
      var divStart={};  
      var rightStart={}; 
      var bottomStart={};  

	  // Resize Right
      ResizeRight.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        rightStart.x=ResizeRight.offsetLeft;
        if(ResizeRight.setCapture){
          ResizeRight.onmousemove=doResizeRight;
          ResizeRight.onmouseup=stopResizeRight;
          ResizeRight.setCapture();
        }
        else{
          document.addEventListener("mousemove",doResizeRight,true);
          document.addEventListener("mouseup",stopResizeRight,true);
        }
      };
      function doResizeRight(ev){
        var oEvent=ev||event;
        var l=oEvent.clientX-mouseStart.x+rightStart.x;
        var w=l+oDiv.offsetWidth;
		
		lx = parseInt(document.getElementById('main_div').style.left);
		w = Math.max(250, Math.min(w, window.innerWidth -lx -20));

        omain_div.style.width = w + "px";
		document.write = localStorage.setItem('main_width', w);
		
		RedrawTable(w);
      };
      function stopResizeRight(){
        if(ResizeRight.releaseCapture){
          ResizeRight.onmousemove=null;
          ResizeRight.onmouseup=null;
          ResizeRight.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doResizeRight,true);
          document.removeEventListener("mouseup",stopResizeRight,true);
        }
      };

      // Resize Down
      ResizeBottom.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        bottomStart.y=ResizeBottom.offsetTop;
        if(ResizeBottom.setCapture){
          ResizeBottom.onmousemove=doResizeBottom;
          ResizeBottom.onmouseup=stopResizeBottom;
          ResizeBottom.setCapture();
        }
        else{
          document.addEventListener("mousemove",doResizeBottom,true);
          document.addEventListener("mouseup",stopResizeBottom,true);
        }
      };
      function doResizeBottom(ev){
        var oEvent=ev||event;
        var t=oEvent.clientY-mouseStart.y+bottomStart.y;
        var h=t+oDiv.offsetHeight;
       
		tx = parseInt(document.getElementById('main_div').style.top);
		h = Math.max(100, Math.min(h, window.innerHeight -tx -30));
 
        omain_div.style.height=h+"px";
        document.write = localStorage.setItem('main_height', h);

		tx2 = document.getElementById('main_content').offsetTop;
		// document.getElementById('main_content').style.height = (h - tx2 - tx + 20)+ "px";
		
		RedrawTable(0);
      };
      function stopResizeBottom(){
        if(ResizeBottom.releaseCapture){
          ResizeBottom.onmousemove=null;
          ResizeBottom.onmouseup=null;
          ResizeBottom.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doResizeBottom,true);
          document.removeEventListener("mouseup",stopResizeBottom,true);
        }
      }; 

      // Resize All
      oDiv.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        divStart.x=oDiv.offsetLeft;
        divStart.y=oDiv.offsetTop;
        if(oDiv.setCapture){
          oDiv.onmousemove=doDrag;
          oDiv.onmouseup=stopDrag;
          oDiv.setCapture();
        }
        else{
          document.addEventListener("mousemove",doDrag,true);
          document.addEventListener("mouseup",stopDrag,true);
        }
      };
      function doDrag(ev){
        var oEvent=ev||event;
        var l=oEvent.clientX-mouseStart.x+divStart.x;
        var t=oEvent.clientY-mouseStart.y+divStart.y;
       
        var w=l+oDiv.offsetWidth;
        var h=t+oDiv.offsetHeight;
	   
		lx = parseInt(document.getElementById('main_div').style.left);
		tx = parseInt(document.getElementById('main_div').style.top);

		w = Math.max(250, Math.min(w, window.innerWidth -lx -20));
		h = Math.max(100, Math.min(h, window.innerHeight -tx -30));
 
        omain_div.style.width=w+"px";
        omain_div.style.height=h+"px";
        document.write = localStorage.setItem('main_width', w);
		document.write = localStorage.setItem('main_height', h);

		tx2 = document.getElementById('main_content').offsetTop;
		// document.getElementById('main_content').style.height = (h - tx2 - tx + 20)+ "px"
		
		RedrawTable(w);
      };
      function stopDrag(){
        if(oDiv.releaseCapture){
          oDiv.onmousemove=null;
          oDiv.onmouseup=null;
          oDiv.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doDrag,true);
          document.removeEventListener("mouseup",stopDrag,true);
        }
      };
      
      // Drag
      divDragIcon.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        divStart.x=omain_div.offsetLeft;
        divStart.y=omain_div.offsetTop;
       
        if(divDragIcon.setCapture){
          divDragIcon.onmousemove=doDrag3;
          divDragIcon.onmouseup=stopDrag3;
          divDragIcon.setCapture();
        }
        else{
          document.addEventListener("mousemove",doDrag3,true);
          document.addEventListener("mouseup",stopDrag3,true);
        }
      };
      function doDrag3(ev){
        var oEvent=ev||event;
        var l=oEvent.clientX-mouseStart.x+divStart.x;
        var t=oEvent.clientY-mouseStart.y+divStart.y;
        if(l<0){
          l=0;
        }
        else if(l>document.documentElement.clientWidth-omain_div.offsetWidth){
          l=document.documentElement.clientWidth-omain_div.offsetWidth;
        }
        if(t<0){
          t=0;
        }
        else if(t>document.documentElement.clientHeight-omain_div.offsetHeight){
          t=document.documentElement.clientHeight-omain_div.offsetHeight;
        }

		if (localStorage.getItem('contentposition') == '1') {
			l = 0;
			t = 0;
		}

        omain_div.style.left=l+"px";
        omain_div.style.top=t+"px";
        document.write = localStorage.setItem('main_left', l);
        document.write = localStorage.setItem('main_top', t);
      };
      function stopDrag3(){
        if(divDragIcon.releaseCapture){
          divDragIcon.onmousemove=null;
          divDragIcon.onmouseup=null;
          divDragIcon.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doDrag3,true);
          document.removeEventListener("mouseup",stopDrag3,true);
        }
	  }  
});
