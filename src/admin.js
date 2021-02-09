$(window).on('load',function(){
  $('.loader-wrapper').fadeOut('slow');
  $('.pie').append('<style>.pie:before{background:white !important;}</style>');
});

//$(document).ready(function(){
//
//});
//----------------------------------------------------------------------
var mysql = require('mysql');
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

$query = 'select * from marcacarros; select sum(rentados), marca from modelocarros group by marca limit 1;select * from modelocarros where rentados = (select max(rentados) from modelocarros);select modelo, rentados from modelocarros order by rentados desc limit 5;select * from clientes where id_cliente != 1';
connection.query($query,function(err, rows, fields){
  if(err){
      console.log(err.code);
      console.log(err.fatal);
  }

  console.log(rows);

  $marcasCarros = rows[0];
  $mayorCarros = rows[1];
  $mayorModeloCarros = rows[2];
  $modelosCarros = rows[3];

  $clientes = rows[4];
  $clientes.forEach(function(row){
    $('tbody').append('<tr><td scope="row "data-label="Account">'+row.nombre+'</td><td scope="row "data-label="Due Date">'+row.id_cliente+'</td><td scope="row "data-label="Amount">'+row.correo+'</td><td scope="row "data-label="Period">'+row.edad+'</td></tr>');
  });

  $marcasCarros.forEach(function(row){


    if(row.id_marca == $mayorCarros[0].marca){
      $('#fotoMarca').css('background-image','url('+row.logo+')');
      $('#nombreMarca').html(row.nombre);
    }
  });
  $('#fotoModelo').css('background-image','url('+$mayorModeloCarros[0].imagen_g+')');
  $('#nombreModelo').html($mayorModeloCarros[0].modelo);
  for(var i=0;i<5;i++){
    $('#nombreV'+(i+1)).html($modelosCarros[i].modelo);
    $('#v'+(i+1)).html($modelosCarros[i].rentados);
  }

  createPie(".pieID.legend", ".pieID.pie");

  $('#bCarros').click(function(){
    $('.pagina').css('padding', '5%');
    $('.stat').css('border','4px solid rgb(34,158,246)');
    $marcasCarros.forEach(function(row){
      if(row.id_marca == $mayorCarros[0].marca){
        $('#fotoMarca').css('background-image','url('+row.logo+')');
        $('#nombreMarca').html(row.nombre);
      }
    });
    $('#fotoModelo').css('background-image','url('+$mayorModeloCarros[0].imagen_g+')');
    $('#nombreModelo').html($mayorModeloCarros[0].modelo);
    for(var i=0;i<5;i++){
      $('#nombreV'+(i+1)).html($modelosCarros[i].modelo);
      $('#v'+(i+1)).html($modelosCarros[i].rentados);
    }
    createPie(".pieID.legend", ".pieID.pie");
  });

});

$query = 'select * from marcamotos; select sum(rentadas), marca from modelomotos group by marca limit 1;select * from modelomotos where rentadas = (select max(rentadas) from modelomotos);select modelo, rentadas from modelomotos order by rentadas desc limit 5;';
connection.query($query,function(err, rows, fields){
  if(err){
      console.log(err.code);
      console.log(err.fatal);
  }

  console.log(rows);

  $marcasMotos = rows[0];
  $mayorMotos = rows[1];
  $mayorModeloMotos = rows[2];
  $modelosMotos = rows[3];

  $('#bMotos').click(function(){
    $('.pagina').css('padding', '8%');
    $('.stat').css('border','4px solid rgb(242,49,68)');
    $marcasMotos.forEach(function(row){
      if(row.id_marca == $mayorMotos[0].marca){
        $('#fotoMarca').css('background-image','url('+row.logo+')');
        $('#nombreMarca').html(row.nombre);
      }
    });
    $('#fotoModelo').css('background-image','url('+$mayorModeloMotos[0].imagen_g+')');
    $('#nombreModelo').html($mayorModeloMotos[0].modelo);
    for(var i=0;i<5;i++){
      $('#nombreV'+(i+1)).html($modelosMotos[i].modelo);
      $('#v'+(i+1)).html($modelosMotos[i].rentadas);
    }
    createPie(".pieID.legend", ".pieID.pie");
  });




  connection.end(function(){

  });

});




//-----------------------------------------------------


function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;
  $("."+sliceID).css({
    "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
  });
  $("."+sliceID+" span").css({
    "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
    "background-color": color
  });
}
function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var sliceID = "s"+dataCount+"-"+sliceCount;
  var maxSize = 179;
  if(sliceSize<=maxSize) {
    addSlice(sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(maxSize, pieElement, offset, sliceID, color);
    iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}
function createPie(dataElement, pieElement) {
  var listData = [];
  $(dataElement+" span").each(function() {
    listData.push(Number($(this).html()));
  });
  var listTotal = 0;
  for(var i=0; i<listData.length; i++) {
    listTotal += listData[i];
  }
  var offset = 0;
  var color = [
    "cornflowerblue",
    "olivedrab",
    "orange",
    "tomato",
    "crimson",
    "purple",
    "turquoise",
    "forestgreen",
    "navy",
    "gray"
  ];
  for(var i=0; i<listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    iterateSlices(size, pieElement, offset, i, 0, color[i]);
    $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
    offset += size;
  }
}


//----------------------------------------------------------------------------------------



// Add the credentials to access your database
