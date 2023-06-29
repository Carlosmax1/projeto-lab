<?php 
include "db.php";
include "eventos.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['acao'])) {
    $acao = $_POST['acao'];
    $evento = new Evento($conn);
    switch ($acao) {
      case 'create':
        $evento->create($_POST);
        break;
      case 'update':
        $evento->update($_POST);
        break;
      case 'delete':
        $evento->delete($_POST);
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
    $evento = new Evento($conn);
    switch ($acao) {
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
      default:
        break;
    }
  } else {
    echo "Acao inválida";
  }
}
?>