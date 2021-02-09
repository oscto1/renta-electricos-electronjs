
$(window).on('load', function(){
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });


  var mysql = require('mysql');


  // Add the credentials to access your database
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : null, // or the original password : 'apaswword'
      database : 'renta_vehiculos',
      multipleStatements: true
  });

  connection.connect(function(err) {
      // in case of error
      if(err){
          console.log(err.code);
          console.log(err.fatal);
      }
  });


  $query = "select * from clientes";

  connection.query($query, function(err, rows, fields){
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    $clientes = rows;
    console.log($clientes);
    $('#inic').click(function(){
      $clientes.forEach(function(row){
        if(($('#correoI').val() == row.correo) && ($('#contraseñaI').val() == row.contraseña) && row.id_cliente == 1){
          window.location.href = "admin.html";
          //$('#errorI').html('');
        }else if(($('#correoI').val() == row.correo) && ($('#contraseñaI').val() == row.contraseña)){
          window.location.href = "main.html";
          //$('#errorI').html('');
        }else if(($('#correoI').val() != row.correo) && ($('#contraseñaI').val() != row.contraseña)){
          //$('#errorI').html('Correo o contraseña incorrectos');
        }
      });
    });

  });

$('#regis').click(function(){
  $query2 = "insert into clientes(id_cliente,correo,nombre,edad,contraseña) values (" + $('#licenciaR').val() + ',"'+ $('#correoR').val() +'","' + $('#nombreR').val() + '",' + $('#edadR').val() + ',"' + $('#contraseñaR').val() + '");select * from clientes;';
  $('#errorI').css('color','rgb(50,190,166)');
  $('#errorI').html('Cuenta registrada ;)').delay(2000);
  location.reload();

  console.log($query2);
  connection.query($query2, function(err, rows, fields){
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
        $('#errorI').html('Revisa los datos');
    }
    connection.end(function(){
    //    // The connection has been closed
    });
  });
});





});
//--------------------------
