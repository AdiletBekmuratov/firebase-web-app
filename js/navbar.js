jQuery(document).ready(function ($) {
    var bsDefaults = {
        offset: false,
        overlay: true,
        width: '330px'
    },
        bsMain = $('.bs-offset-main'),
        bsOverlay = $('.bs-canvas-overlay');

    $('[data-toggle="canvas"][aria-expanded="false"]').on('click', function () {
        var canvas = $(this).data('target'),
            opts = $.extend({}, bsDefaults, $(canvas).data()),
            prop = $(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left';

        if (opts.width === '100%')
            opts.offset = false;

        $(canvas).css('width', opts.width);
        if (opts.offset && bsMain.length)
            bsMain.css(prop, opts.width);

        $(canvas + ' .bs-canvas-close').attr('aria-expanded', "true");
        $('[data-toggle="canvas"][data-target="' + canvas + '"]').attr('aria-expanded', "true");
        if (opts.overlay && bsOverlay.length)
            bsOverlay.addClass('show');
        return false;
    });

    $('.bs-canvas-close, .bs-canvas-overlay').on('click', function () {
        var canvas, aria;
        if ($(this).hasClass('bs-canvas-close')) {
            canvas = $(this).closest('.bs-canvas');
            aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
            if (bsMain.length)
                bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');
        } else {
            canvas = $('.bs-canvas');
            aria = $('.bs-canvas-close, [data-toggle="canvas"]');
            if (bsMain.length)
                bsMain.css({
                    'margin-left': '',
                    'margin-right': ''
                });
        }
        canvas.css('width', '');
        aria.attr('aria-expanded', "false");
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        return false;
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        $('.auth').css('display', 'none');
        $('.signed').css('display', 'block');
    } else {
        // No user is signed in.
        $('.auth').css('display', 'block');
        $('.signed').css('display', 'none');
    }
});

$('.signOut').click(function () {
    firebase.auth().signOut();
    location.reload();
});