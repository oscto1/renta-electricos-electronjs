$(window).on('load',function(){
  $('.loader-wrapper').fadeOut('slow');
  $('#menuToggle span').css('background','#cdcdcd');
  $('.texto1').css('animation','slide-bottom 1s cubic-bezier(.25,.46,.45,.94) both');
});

var $carousel = $('.slider');

var settings = {
  dots: false,
  arrows: false,
  slide: '.slick-slideshow__slide',
  slidesToShow: 3,
  centerMode: false,
  centerPadding: '70px',

};

function setSlideVisibility() {
  //Find the visible slides i.e. where aria-hidden="false"
  var visibleSlides = $carousel.find('.slick-slideshow__slide[aria-hidden="true"]');
  //Make sure all of the visible slides have an opacity of 1
  $(visibleSlides).each(function() {
    $(this).css('opacity', 1);
  });

  //Set the opacity of the first and last partial slides.
  $(visibleSlides).first().prev().css('opacity', 0);
}

$carousel.slick(settings);
$carousel.slick('slickGoTo', 1);
setSlideVisibility();

$carousel.on('afterChange', function() {
  setSlideVisibility();
});

//-------------------------------------------------------------------------------
var slickCarousel = $('.slider-vertical');
slickCarousel.slick({
    lazyLoad: 'progressive',
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    dots: false,
    centerPadding: '50px',
    arrows: false,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
            }
        }, {
            breakpoint: 639,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
			    vertical: false,
			    verticalSwiping: false,
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

//------------------------------------------------------------------------------------------



$(document).ready(function(){
    $(".slider").css("opacity", "0");
    $(".slider2").css("opacity", "0");

    $("#exito").hide();

    $("#botCarros").click(function(){
        $('.botonTipo').css('background-color', 'rgba(241,243,244,1)');
        $(this).css('background-color', 'rgba(253,202,1)');
        $(".slider").hide();
        $(".slider").css("opacity", "100");
        $(".slider").show(400);

      });

      $("#botMotos").click(function(){
          $('.botonTipo').css('background-color', 'rgba(241,243,244,1)');
          $(this).css('background-color', 'rgba(253,202,1)');
          $(".slider").hide();
          $(".slider").css("opacity", "100");
          $(".slider").show(400);

        });
        $('.izq').css('justify-content', 'center');
        $('.izq').css('align-items', 'center');

        $('.espec').css("display", "none");
});

//-------------------------------------------------------------------------------------------------

var mysql = require('mysql');


// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null, // or the original password : 'apaswword'
    database : 'renta_vehiculos',
    multipleStatements: true
});

// connect to mysql
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});


// Perform a query
$query = 'SELECT * FROM marcacarros;SELECT * FROM modelocarros;SELECT * FROM marcamotos; SELECT * FROM modelomotos';


connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    $marcaCarros = rows[0];
    $modelosCarros = rows[1];
    $marcaMotos = rows[2];
    $modelosMotos = rows[3];


    $('#botCarros').click(function(){


      $(".slider2").css("opacity", "0");
      $(".slider-vertical").slick('removeSlide', null, null, true);
      $(".slider").slick('removeSlide', null, null, true);
          $marcaCarros.forEach(function(row){

              $('.slider').slick('slickAdd', '<div class="slick-slideshow__slide" id="marca'+(row.id_marca)+'"> <div class="logo" style="background-image: url('+ row.logo +')"></div> <h2>' + row.nombre +'</div>');

              $('#marca'+row.id_marca).click(function(){
                  $(".slider-vertical").slick('removeSlide', null, null, true);
                  $('.slick-slideshow__slide').css('background-color','rgba(241,243,244,1)');
                  $(this).css('background-color','rgba(253,202,1)');

                  var cod_marca = row.id_marca;
                  var nombre_marca = row.nombre;
                  $modelosCarros.forEach(function(row){

                      if(row.marca == cod_marca){
                          $('.slider-vertical').slick('slickAdd', '<div class="lista" id="'+(row.id_carro)+'"><div class="nombre">'+row.modelo+'</div><div class="fotoP" style="background-image: url('+row.imagen_p+')"></div></div>');
                      }

                      $(".slider-vertical").css("display","block");
                      $(".slider2").css("opacity", "100");

                      $('#'+row.id_carro).click(function(){
                        $('.texto1').hide(500);
                        $('.texto1').css('display','none');
                        $('.texto2').hide(500);
                        $('.texto2').css('display','none');
                        $('.izq').css('justify-content', '');
                        $('.izq').css('align-items', '');

                        $('.lista').css('background-color','white');
                        $(this).css('background-color','rgba(253,202,1)');
                        $('.marcaG').html(nombre_marca);
                        $('#nombreM').html(row.modelo);
                        $('#precioH').html("$"+row.precio_hora+"/hora");
                        $('#motor').html(row.motor + " CV");
                        $('#autonom').html(row.autonomia + " Km");
                        $('#vel_max').html(row.vel_max + " Km/h");
                        $('#fotoG').css('background-image', 'url('+row.imagen_g+')');
                        var porcCV = parseInt(((row.motor / 518) * 100));
                        var porcKm = parseInt(((row.autonomia / 629) * 100));
                        var porcKmH = parseInt(((row.vel_max / 280) * 100));
                        $('#CV').attr("data-count", porcCV);
                        $('#Km').attr("data-count", porcKm);
                        $('#KmH').attr("data-count", porcKmH);

                        $('#fotoConf').css('background-image', 'url('+row.imagen_p+')');
                        $('.modelo').html(nombre_marca + " " + row.modelo);

                        //--------
                        var progressBar = document.querySelectorAll(".progress-bar");
                        var time = 500;


                        progressBar.forEach(function(i) {
                          let label = i.children[0];
                          let line = i.children[1];
                          let lineRe = line.children[0];
                          let count = 0;
                          let dataCount = label.getAttribute("data-count");
                          let lineCount = line.children[0];
                          if(label.getAttribute("data-count") >= 70){
                            lineRe.style.background = 'rgba(1,191,97,1)';
                          }else if (label.getAttribute("data-count") > 50) {
                            lineRe.style.background = 'rgba(255,201,14,1)';
                          }else if(label.getAttribute("data-count") <= 50){
                            lineRe.style.background = 'rgba(251,108,37,1)';
                          }
                          let runTime = time/dataCount;

                          let animationLineCount = setInterval(function(){
                            if(count < dataCount){
                              count++;
                              //label.innerHTML = count + '%';
                              lineCount.style.width = count + '%';
                            }
                          },runTime);
                          $('#bot_confirmar').click(function(){
                              $cantidad = row.rentados;
                              $queryI = 'update modelocarros set rentados = ('+$cantidad+' + 1) where id_carro = "' + row.id_carro + '";';
                              connection.query($queryI, function(err,rows,fields){
                                if(err){
                                    console.log(err.code);
                                    console.log(err.fatal);
                                }
                                console.log('funcionó');

                                $('#conf').hide(400);
                                $('#exito').show(400);

                                connection.end(function(){

                                });
                              });
                          });

                        });
                        //---------


                        $('.espec').show(500);

                      });
                  });
              });
          });
    });
    $('#v').click(function(){
      location.reload();
    });

    $('#botMotos').click(function(){

          $(".slider2").css("opacity", "0");
          $(".slider-vertical").slick('removeSlide', null, null, true);
          $(".slider").slick('removeSlide', null, null, true);


          $marcaMotos.forEach(function(row){

              $('.slider').slick('slickAdd', '<div class="slick-slideshow__slide" id="marca'+(row.id_marca)+'"> <div class="logo" style="background-image: url('+ row.logo +')"></div> <h2>' + row.nombre +'</div>');

              $('#marca'+row.id_marca).click(function(){
                  $(".slider-vertical").slick('removeSlide', null, null, true);
                  $('.slick-slideshow__slide').css('background-color','white');


                  var cod_marca = row.id_marca;
                  var nombre_marca = row.nombre;
                  $modelosMotos.forEach(function(row){

                      if(row.marca == cod_marca){
                          $('.slider-vertical').slick('slickAdd', '<div class="lista" id="'+(row.id_moto)+'"><div class="nombre">'+row.modelo+'</div><div class="fotoP" style="background-image: url('+row.imagen_p+')"></div></div>');
                      }

                      $(".slider-vertical").css("display","block");
                      $(".slider2").css("opacity", "100");

                      $('#'+row.id_moto).click(function(){
                        $('.texto1').hide(500);
                        $('.texto1').css('display','none');
                        $('.texto2').hide(500);
                        $('.texto2').css('display','none');
                        $('.izq').css('justify-content', '');
                        $('.izq').css('align-items', '');
                        $('.lista').css('background-color','white');


                        $('.marcaG').html(nombre_marca);
                        $('#nombreM').html(row.modelo);
                        $('#precioH').html("$"+row.precio_hora+"/hora");
                        $('#motor').html(row.motor + " CV");
                        $('#autonom').html(row.autonomia + " Km");
                        $('#vel_max').html(row.vel_max + " Km/h");
                        $('#fotoG').css('background-image', 'url('+row.imagen_g+')');
                        var porcCV = parseInt(((row.motor / 11) * 100));
                        var porcKm = parseInt(((row.autonomia / 125) * 100));
                        var porcKmH = parseInt(((row.vel_max / 100) * 100));
                        $('#CV').attr("data-count", porcCV);
                        $('#Km').attr("data-count", porcKm);
                        $('#KmH').attr("data-count", porcKmH);

                        $('#fotoConf').css('background-image', 'url('+row.imagen_p+')');
                        $('.modelo').html(nombre_marca + " " + row.modelo);

                        //--------
                        var progressBar = document.querySelectorAll(".progress-bar");
                        var time = 500;


                        progressBar.forEach(function(i) {
                          let label = i.children[0];
                          let line = i.children[1];
                          let lineRe = line.children[0];
                          let count = 0;
                          let dataCount = label.getAttribute("data-count");
                          let lineCount = line.children[0];
                          if(label.getAttribute("data-count") >= 70){
                            lineRe.style.background = 'rgba(1,191,97,1)';
                          }else if (label.getAttribute("data-count") > 50) {
                            lineRe.style.background = 'rgba(255,201,14,1)';
                          }else if(label.getAttribute("data-count") <= 50){
                            lineRe.style.background = 'rgba(251,108,37,1)';
                          }
                          let runTime = time/dataCount;

                          let animationLineCount = setInterval(function(){
                            if(count < dataCount){
                              count++;
                              //label.innerHTML = count + '%';
                              lineCount.style.width = count + '%';
                            }
                          },runTime);
                        });
                        //---------
                        $('#bot_confirmar').click(function(){
                            $cantidad = row.rentadas;
                            $queryI = 'update modelomotos set rentadas = ('+$cantidad+' + 1) where id_moto = "' + row.id_moto + '";';
                            connection.query($queryI, function(err,rows,fields){
                              if(err){
                                  console.log(err.code);
                                  console.log(err.fatal);
                              }
                              console.log('funcionó');

                              $('#conf').hide(400);
                              $('#exito').show(400);

                              connection.end(function(){

                              });
                            });
                        });

                        $('.espec').show(500);

                      });
                  });
              });
          });
    });
});

// Close the connection



//-------------------------------------------------------------------------------
