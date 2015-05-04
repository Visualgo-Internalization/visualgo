const PHP_DOMAIN = "http://algorithmics.comp.nus.edu.sg/~onlinequiz/";
var fbAccessToken = "";

// check status of facebook login
function fbStatusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // sync facebook session with server
        // Logged into your app and Facebook.
        FB.api('/me', function(response) {
            $('#login-link').html('Logout <b>' + response.name + '</b>');
        });
    } else {
        $('#login-link').text('Login');
    }

	if (response.authResponse !== undefined) {
		fbAccessToken = response.authResponse.accessToken;
	}
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '519543441523397',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });

    // This function gets the state of the person visiting this page and can return one of three states to the callback you provide.  They can be:
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into your app or not.
    FB.getLoginStatus(function(response) {
        fbStatusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//surprise colour!
//Referenced to in  home.js and viz.js also
var colourArray = ["#52bc69", "#d65775"/*"#ed5a7d"*/, "#2ebbd1", "#d9513c", "#fec515", "#4b65ba", "#ff8a27", "#a7d41e"];
//green, pink, blue, red, yellow, indigo, orange, lime

function disableScroll() {
    $('html').css('overflow', 'hidden');
}

function enableScroll() {
    $('html').css('overflow', 'visible');
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function getColours() {
    var generatedColours = new Array();
    while (generatedColours.length < 4) {
        var n = (Math.floor(Math.random() * colourArray.length));
        if ($.inArray(n, generatedColours) == -1) {
            generatedColours.push(n);
        }
    }
    return generatedColours;
}

function customAlert(msg) {
    $('#custom-alert p').html(msg);
    var m = -1 * ($('#custom-alert').outerHeight() / 2);
    $('#custom-alert').css('margin-top', m + 'px');
    $('#dark-overlay').fadeIn(function() {
        $('#custom-alert').fadeIn(function() {
            setTimeout(function() {
                $('#custom-alert').fadeOut(function() {
                    $('#dark-overlay').fadeOut();
                });
            }, 1000);
        });
    });
}

function showLoadingScreen() {
    $('#loading-overlay').show();
    $('#loading-message').show();
}

function hideLoadingScreen() {
    $('#loading-overlay').hide();
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return "";
}

// function languagePreferences() {
//     var content = "<h4>Language Settings</h4><img class='close-overlay' src='img/cross_white.png' /><div class='content'>";
//     content += "<p>Select the languages you want to see in the languages bar</p>";
//     content += "<input type='checkbox' name='language' id='English-bar' value='English'>English<br>";
//     content += "<input type='checkbox' name='language' id='Chinese-bar' value='Chinese'>Chinese<br>";
//     content += "<input type='checkbox' name='language' id='Indonesian-bar' value='Indonesian'>Indonesian<br>";
//     content += "<input type='checkbox' name='language' id='Vietnamese-bar' value='Vietnamese'>Vietnamese<br>";
//     content += "<p>Select the default language</p>";
//     content += "<input type='radio' name='defaultLanguage' id='English-default' value='English'>English<br>";
//     content += "<input type='radio' name='defaultLanguage' id='Chinese-default' value='Chinese'>Chinese<br>";
//     content += "<input type='radio' name='defaultLanguage' id='Indonesian-default' value='Indonesian'>Indonesian<br>";
//     content += "<input type='radio' name='defaultLanguage' id='Vietnamese-default' value='Vietnamese'>Vietnamese<br>";
//     content += "<input type='submit' id='preference-save' value='Save'>";
//     content += "</div>";
//     return content;
// }

// function showLanguageOptions() {
//     var languagePreferences = JSON.parse(localStorage["languagePreferences"]);
//     var content = "";
//     if(languagePreferences.length == 0) {
//         languagePreferences = ["English", "Chinese", "Indonesian", "Vietnamese"];
//     }
//     for(var x = 0; x < languagePreferences.length; x++) {
//         content += "<div id='" + languagePreferences[x] + "' class='languages'>";
//         content += "<p>" + languagePreferences[x] + "</p>";
//         content += "</div>";
//     }
//     content += "<div id='trigger-language' class='languages'><p>Settings</p></div>";
//     return content;
// }

var generatedColours = getColours();
var surpriseColour = colourArray[generatedColours[0]];
var colourTheSecond = colourArray[generatedColours[1]];
var colourTheThird = colourArray[generatedColours[2]];
var colourTheFourth = colourArray[generatedColours[3]];

$(document).ready(function() {
    $('#login-link').click(function() {
        if ($('#login-link').text() == 'Login') {
            $('#login-overlay').fadeIn('fast');
            $('#login-overlay-content').show();
            disableScroll();
        } else {
            FB.logout(function(response) {
                fbStatusChangeCallback(response);
            });
        }
    });
    /*-------LOG IN AUTHENTICATION-------*/
    $('#login-overlay-content #login-go').click(function() {
        FB.login(function(response) {
            fbStatusChangeCallback(response);
            $('#login-overlay').fadeOut('fast');
            $('#login-overlay-content').hide();
        });
    });
    /*-------LOG IN CSS-------*/
    $('#login-id').focusin(function() {
        $(this).css('box-shadow', '0px 0px 3px ' + surpriseColour + ' inset');
        if ($(this).val() == "user id") {
            $(this).css('color', 'black');
            $(this).val("");
        }
    }).focusout(function() {
        $(this).css('box-shadow', '0px 0px 3px #929292 inset');
        if ($(this).val() == "") {
            $(this).css('color', '#aaa');
            $(this).val("user id");
        }
    });
    $('#login-pw').focusin(function() {
        $(this).css('box-shadow', '0px 0px 3px ' + surpriseColour + ' inset');
        if ($(this).val() == "password") {
            $(this).attr('type', 'password');
            $(this).css('color', 'black');
            $(this).val("");
        }
    }).focusout(function() {
        $(this).css('box-shadow', '0px 0px 3px #929292 inset');
        if ($(this).val() == "") {
            $(this).css('color', '#aaa');
            $(this).attr('type', 'text');
            $(this).val("password");
        }
    });
    $('#login-overlay').click(function() {
        $('#login-overlay').fadeOut('fast');
        enableScroll();
    });

    $('#login-overlay-content').click(function(event) {
        event.stopPropagation();
    });

    $('.right-links').css('background', surpriseColour);
    $('#login-go').css('background', surpriseColour);

    $('#about').html('<h4>About the project</h4><img class="close-overlay" src="img/cross_white.png" /><div class="content"><p><strong><span style="line-height: 200%;">Motivation</span></strong><br/>VisuAlgo was conceptualised in 2011 by Dr Steven Halim as a tool to help his students better understand data structures and algorithms, by allowing them to learn the basics on their own and at their own pace. Together with two of his students from the National University of Singapore, a series of visualisations were developed and consolidated, from simple sorting algorithms to complex graph data structures.</p><p>Though specifically designed for the use of NUS students taking various data structure and algorithm classes (CS1020, CS2010, CS2020, and CS3233), as advocators of online learning, we hope that curious minds around the world will find these visualisations useful as well.</p><p><strong><span style="line-height: 200%;">Ongoing developments</span></strong><br/>VisuAlgo is an ongoing project, and more complex visualisations are still being developed. Originally developed using HTML5 Canvas, we are currently redesigning the site to harness the power of Scalable Vector Graphics (SVG) instead. An automated testing system is also in the works.</p><p><strong><span style="line-height: 200%;">Publications</span></strong><br/>This work has been presented briefly at the CLI Workshop at the ACM ICPC World Finals 2012 (Poland, Warsaw) and at the <a href="http://www.mii.lt/olympiads_in_informatics/htm/INFOL099.htm" target="_blank">IOI Conference at IOI 2012</a> (Sirmione-Montichiari, Italy).</p></div>');

    $('#team').html('<h4>The team</h4><img class="close-overlay" src="img/cross_white.png" /><div class="content"><p><strong><span style="line-height: 200%;">Project leader</span></strong><br/><a href="http://www.comp.nus.edu.sg/~stevenha/" target="_blank">Dr Steven Halim</a>, Lecturer, SoC, NUS</p><p><strong><span style="line-height: 200%;">Initial Programmers</span></strong><br/><a href="http://zichun.i-xo.net/" target="_blank">Koh Zi Chun</a><br/><a href="http://roticv.rantx.com/" target="_blank">Victor Loh Bo Huai</a></p><p><strong><span style="line-height: 200%;">Past Final Year Project students</span></strong><br/>Phan Thi Quynh Trang<br/>Peter Phandi<br/>Albert Millardo Tjindradinata<br/><p><strong><span style="line-height: 200%;">Present Final Year Project students</span></strong><br/>Nguyen Hoang Duy<br/><a href="http://www.rosemarietan.com/" target="_blank">Rose Marie Tan Zhao Yun</a><br/>Ivan Reinaldo</p><p><strong><span style="line-height: 200%;">Advisor</span></strong><br/><a href="http://felix-halim.net/" target="_blank">Felix Halim</a></p></div>');

    $('#termsofuse').html('<h4>Terms of use</h4><img class="close-overlay" src="img/cross_white.png" /><div class="content"><p>If you are a data structure and algorithm teacher, you are allowed to use this website for your classes. You can take screen shots from this website and use the screen shots elsewhere as long as you cite this website as a reference.</p><!--I think we need a better copyright/terms of use statement--></div>');

    // $('#language-preferences').html(languagePreferences());

    // $('#language-options').html(showLanguageOptions());

    $('.colour').css("color", surpriseColour); //name
    $('h4').css("background-color", surpriseColour); //about, contact us etc. button background

    //title
    $('#title a').click(function() {
        $('#title a').removeClass('selected-viz');
        $(this).addClass('selected-viz');
    });

    //overlays stuff
    $('#trigger-about').click(function() {
        $('#dark-overlay').fadeIn(function() {
            $('#about').fadeIn();
        });
    });
    $('#trigger-team').click(function() {
        $('#dark-overlay').fadeIn(function() {
            $('#team').fadeIn();
        });
    });
    $('#trigger-terms').click(function() {
        $('#dark-overlay').fadeIn(function() {
            $('#termsofuse').fadeIn();
        });
    });

    $('.close-overlay').click(function() {
        $('.overlays').fadeOut(function() {
            $('#dark-overlay').fadeOut();
        });
    });

    $('#dark-overlay').click(function() {
        $('.overlays').fadeOut();
        $('#dark-overlay').fadeOut();
    });

    // $(document).on('click', '#trigger-language', function() {
    //     $('#dark-overlay').fadeIn(function() {
    //         $('#language-preferences').fadeIn();
    //     });
    // });

    // $(document).on('click', '#preference-save', function() {
    //     var languages = ["English", "Chinese", "Indonesian", "Vietnamese"];
    //     var showLanguages = [];
    //     var defaultLanguage = $("input:radio[name=defaultLanguage]:checked").val();
    //     for(var x = 0; x < languages.length; x++) {
    //         if($("#" + languages[x] + '-bar').prop('checked')) {
    //             showLanguages.push(languages[x]);
    //         }
    //     }
    //     localStorage.setItem("defaultLanguage", defaultLanguage);
    //     localStorage["languagePreferences"] = JSON.stringify(showLanguages);

    //     $('.overlays').fadeOut(function() {
    //         $('#dark-overlay').fadeOut();
    //     });

    //     $('#language-options').html(showLanguageOptions());
    // });
});
