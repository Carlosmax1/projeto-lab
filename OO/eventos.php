<?php
// crud

class Evento
{
  private $id;
  private $title;
  private $description;
  private $date;
  private $time;
  private $location;
  private $category_id;
  private $price;
  private $images;

  private $conn;
  private $table_name = "eventos";

  public function __construct($db)
  {
    $this->conn = $db;
    if ($this->conn->connect_error) {
      return die("Connection failed: " . $this->conn->connect_error);
    }
  }

  public function create($POST)
  {
    // Obtenha os dados do formulário POST
    $this->title = $POST['title'];
    $this->description = $POST['description'];
    $this->date = $POST['date'];
    $this->time = $POST['time'];
    $this->location = $POST['location'];
    $this->category_id = $POST['category'];
    $this->price = $POST['price'];
    $this->images = $POST['image'];

    // Preparar a consulta SQL
    $query = "INSERT INTO {$this->table_name} (title, description, date, time, location, category_id, price, images) VALUES ('{$this->title}', '{$this->description}', '{$this->date}', '{$this->time}', '{$this->location}', {$this->category_id}, {$this->price}, '{$this->images}')";

    // Executar a consulta
    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function read()
  {
    $query = "SELECT * FROM {$this->table_name}";

    $result = $this->conn->query($query);

    if ($result === false) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }

    $rows = array();
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    echo json_encode($rows);
  }

  public function update($POST)
  {
    // Obtenha os dados do formulário POST
    $this->id = $POST['id'];
    $this->title = $POST['title'];
    $this->description = $POST['description'];
    $this->date = $POST['date'];
    $this->time = $POST['time'];
    $this->location = $POST['location'];
    $this->category_id = $POST['category'];
    $this->price = $POST['price'];
    $this->images = $POST['image'];

    // Preparar a consulta SQL
    $query = "UPDATE {$this->table_name} SET title = '{$this->title}', description = '{$this->description}', date = '{$this->date}', time = '{$this->time}', location = '{$this->location}', category_id = {$this->category_id}, price = {$this->price}, images = '{$this->images}' WHERE id = {$this->id}";

    // Executar a consulta
    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function delete($POST)
  {
    $this->id = $POST['id'];

    $query = "DELETE FROM {$this->table_name} WHERE id = {$this->id}";

    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function event_recents()
  {
    $query = "SELECT * FROM {$this->table_name}
              ORDER BY ID DESC
              LIMIT 3
    ";

    $result = $this->conn->query($query);

    if ($result === false) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }

    $rows = array();
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    echo json_encode($rows);
  }

  public function getCommentsByEventId($id)
  {
    $query = "SELECT u.name, r.comment, r.score
      FROM reviews r JOIN users u ON r.user_id = u.id
      WHERE evento_id = $id
    ";

    $result = $this->conn->query($query);

    if ($result === false) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }

    $rows = array();
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    echo json_encode($rows);
  }

  public function getById($id)
  {
    $query = "SELECT * FROM eventos
      WHERE ID = $id
    ";

    $result = $this->conn->query($query);

    if ($result === false) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }

    $rows = array();
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    echo json_encode($rows);
  }

  public function createReviewEvent($POST)
  {
    $user_id = $POST['userID'];
    $event_id = $POST['eventID'];
    $rating = $POST['rating'];
    $review = $POST['review'];

    $query = " INSERT INTO reviews (user_id, evento_id, score, comment)
      VALUES ('{$user_id}', '{$event_id}', '{$rating}', '{$review}')
    ";

    $result = $this->conn->query($query);

    if ($result === false) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
    $rows = array();
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    echo json_encode($rows);
  }



  public function __destruct()
  {
    $this->conn->close();
  }
}
