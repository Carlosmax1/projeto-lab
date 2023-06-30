<?php
// crud

class User {
  private $id;
  private $name;
  private $email;
  private $password;
  private $user_type;

  private $conn;
  private $table_name = "users";

  public function __construct($db){
    $this->conn = $db;
    if ($this->conn->connect_error) {
      return die("Connection failed: " . $this->conn->connect_error);
    }
  }

  public function create($POST){
    // Obtenha os dados do formulário POST
    $this->name = $POST['name'];
    $this->email = $POST['email'];
    $this->password = $POST['password'];
    $this->user_type = $POST['user_type'];

    // Preparar a consulta SQL
    $query = "INSERT INTO {$this->table_name} (name, email, password, user_type) VALUES ('{$this->name}', '{$this->email}', '{$this->password}', '{$this->user_type}')";

    // Executar a consulta
    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function read() {
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

  public function update($POST){
    // Obtenha os dados do formulário POST
    $this->id = $POST['id'];
    $this->name = $POST['name'];
    $this->email = $POST['email'];
    $this->password = $POST['password'];
    $this->user_type = $POST['user_type'];

    // Preparar a consulta SQL
    $query = "UPDATE {$this->table_name} SET name = '{$this->name}', email = '{$this->email}', password = '{$this->password}', user_type = '{$this->user_type}' WHERE id = {$this->id}";

    // Executar a consulta
    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function delete($POST){
    $this->id = $POST['id'];

    $query = "DELETE FROM {$this->table_name} WHERE ID = {$this->id}";

    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }

  }

  /*public function __destruct(){
    $this->conn->close();
  }*/
}
