<?php
include "db.php";
include "eventos.php";
include "users.php";
include "registros.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['acao'])) {
    $acao = $_POST['acao'];
    $evento = new Evento($conn);
    $usuario = new User($conn);
    $registro = new Registration($conn);
    switch ($acao) {
      case 'event_create':
        $evento->create($_POST);
        break;
      case 'event_edit':
        $evento->update($_POST);
        break;
      case 'user_create':
        $usuario->create($_POST);
        break;
      case 'user_login':
        $usuario->getUserByEmail($_POST);
        break;
      case 'delete_user':
        $usuario->delete($_POST);
        break;
      case 'userSubscribeEvent':
        $registro->create($_POST);
        break;
      case 'create_review':
        $evento->createReviewEvent($_POST);
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
    $registro = new Registration($conn);
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
      case 'getCommentsByEventId':
        $id = $_GET['id'];
        $evento->getCommentsByEventId($id);
        break;
      case 'read_users':
        $usuario->read();
        break;
      case 'verifyUserSubscribe':
        $evento_id = $_GET['eventID'];
        $user_id = $_GET['userID'];
        $registro->verifyUserSubscribe($evento_id, $user_id);
        break;
      case 'read_events_user':
        $id = $_GET['userID'];
        $registro->getAllEventByUserId($id);
        break;
      default:
        break;
    }
  } else {
    echo "Acao inválida";
  }
}
