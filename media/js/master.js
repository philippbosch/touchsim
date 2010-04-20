$(document).ready(function() {
    $('#type-statusbar').bind('change', function() {
        $('#statusbar').attr('class', $(this).val());
    });
    $('#toggle-locationbar').bind('change', function() {
        $('body').toggleClass('locationbar', $(this).attr('checked'));
    });
    $('#toggle-toolbar').bind('change', function() {
        $('body').toggleClass('toolbar', $(this).attr('checked'));
    });
    $('#toggle-device').bind('change', function() {
        $('body').toggleClass('device', $(this).attr('checked'));
    });
    $('#carrier-text').bind('change keyup', function() {
        $('#carrier').text($(this).val());
    });
    $('#location').bind('keyup reload', function(event) {
        if ((event.keyCode == 13) || (event.type == 'reload')) {
            var url = $(this).val();
            console.log(url.substr(0,7));
            if (url.substr(0,7) != 'http://' && url.substr(0,7) != 'file://') url = 'http://' + url;
            $('#canvas').attr('src', url);
            $(this).blur();
        }
    });
    
    $('input,select').live('change keyup', function() {
        $('input,select').each(function() {
            var value;
            if ($(this).is('[type="checkbox"]')) {
                value = $(this).attr('checked');
            } else {
                value = $(this).val();
            }
            localStorage.setItem($(this).attr('id'), value);
        });
    }).each(function() {
        var value = localStorage.getItem($(this).attr('id'));
        if ($(this).is('[type="checkbox"]')) {
            if (value !== null) $(this).attr('checked', value == 'true');
        } else {
            if (value !== null) $(this).val(value);
        }
        $(this).triggerHandler('change');
        $(this).triggerHandler('reload');
    });
    
    $('#controlpanel form').bind('submit', function(e) {
        e.preventDefault();
    });
    
    $('body').addClass('platform-' + window.navigator.platform.substr(0,3).toLowerCase());
});
