<?php 
include "db.php";
include "eventos.php";
include "users.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['acao'])) {
    $acao = $_POST['acao'];
    $evento = new Evento($conn);
    $usuario = new User($conn);
    switch ($acao) {
      case 'event_create':
        $evento->create($_POST);
        break;
      case 'event_edit':
        $evento->update($_POST);
        break;
      case 'delete_user':
        $usuario->delete($_POST);
        break;
      default:
        break;
    }
  } else {
    echo "Acao inválida";
  }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if (isset($_GET['acao'])) {
    $acao = $_GET['acao'];
    $usuario = new User($conn);
    $evento = new Evento($conn);
    switch ($acao) {
      case 'read_events':
        $evento->read();
      break;
      case 'recent_events':
        $evento->event_recents();
        break;
      case 'getEventId':
        $id = $_GET['id'];
        $evento->getById($id);
        break;
      case 'getCommentsByEventId';
          $id = $_GET['id'];
          $evento->getCommentsByEventId($id);
        break;
      case 'read_users':
        $usuario->read();
        break;
      default:
        break;
    }
  } else {
    echo "Acao inválida";
  }
}
?>