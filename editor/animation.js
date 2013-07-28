//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide[data[1]] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(112);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.referee) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var checkioInput = data.ext["input"];
            var rightResult = data.ext["answer"];
            var userResult = data.req;
            var result = data.ext["result"];

            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + ext.JSON.encode(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + ext.JSON.encode(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new MorseClockCanvas();
            canvas.createCanvas($content.find(".explanation")[0], explanation);


            this_e.setAnimationHeight($content.height() + 60);

        });

        //TRYIT code
        var $tryit;


        //this function process returned data and show it
        ext.set_console_process_ret(function (this_e, ret) {
            try {
                ret = JSON.parse(ret);
            }
            catch(err){}

            $tryit.find(".checkio-result-in").html(ext.JSON.encode(ret));
        });

        ext.set_generate_animation_panel(function (this_e) {
            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find(".tryit-content");

            function checkInput(field, min, max){
                var value = parseInt(field.val());
                if (isNaN(value)) {
                    field.val(min);
                }
                else if (value < min || value > max) {
                    field.val(min);
                }
            }

            //run checking
            $tryit.find('.bn-check').click(function (e) {
                var $hh = $tryit.find(".input-hh");
                var $mm = $tryit.find(".input-mm");
                var $ss = $tryit.find(".input-ss");
                checkInput($hh, 0, 23);
                checkInput($mm, 0, 59);
                checkInput($ss, 0, 59);
                var data = [$hh.val(), $mm.val(), $ss.val()].join(":");
                //send it for check
                this_e.sendToConsoleCheckiO(data);
                //After it will be called set_console_process_ret
                e.stopPropagation();
                return false;
            });

        });

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#9D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";

        function MorseClockCanvas() {
            var x0 = 10;
            var y0 = 10;
            var radius = 20;
            var padding = 10;

            var sizeX = x0 * 2 + 7 * radius * 2 + padding * 3;
            var sizeY = y0 * 2 + 5 * radius * 2 + padding * 4;

            var attrCircle = {'stroke': colorBlue4, 'stroke-width': 2};
            var attrNumber = {'fill': colorBlue3, 'font-size': radius * 1.5, 'font-family': 'Verdana'};

            var paper;
            var circleSet;
            var numberSet;

            var lens = [2, 4, 3, 4, 3, 4];

            this.createCanvas = function(dom, data) {
                paper = Raphael(dom, sizeX, sizeY, 0, 0);
                circleSet = paper.set();
                numberSet = paper.set();
                var x = x0 + radius;
                for (var i = 0; i < lens.length; i++) {
                    var tempSet = paper.set();
                    var numb = parseInt(data[i]);
                    var t = paper.text(x, sizeY - y0 - radius, numb).attr(attrNumber);
                    numberSet.push(t);
                    for (var j = 0; j < lens[i]; j++){
                        var c = paper.circle(x,
                            sizeY - y0 - radius - ((j + 1) * (2 * radius + padding)),
                            radius).attr(attrCircle);

                        if (numb % 2) {
                            c.attr('fill', colorGrey3);
                        }
                        else {
                            c.attr('fill', colorWhite);
                        }
                        numb = Math.floor(numb / 2);
                        tempSet.push(c);
                    }
                    x += radius * 2 + padding;
                    if (i % 2 === 1) {
                        x += padding;
                    }
                    circleSet.push(tempSet);
                }
            }

        }


    }
);
