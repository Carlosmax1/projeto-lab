<?php
// crud

class Registration {
  private $user_id;
  private $evento_id;
  private $payment_status;

  private $conn;
  private $table_name = "registrations";

  public function __construct($db){
    $this->conn = $db;
    if ($this->conn->connect_error) {
      return die("Connection failed: " . $this->conn->connect_error);
    }
  }

  public function create($POST){
    // Obtenha os dados do formulário POST
    $this->user_id = $POST['user_id'];
    $this->evento_id = $POST['evento_id'];
    $this->payment_status = $POST['payment_status'];

    // Preparar a consulta SQL
    $query = "INSERT INTO {$this->table_name} (user_id, evento_id, payment_status) VALUES ({$this->user_id}, {$this->evento_id}, '{$this->payment_status}')";

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

    while ($row = $result->fetch_assoc()) {
      // Exibir os dados de inscrição
      echo "
      <div class='registration-container'>
        <span class='user-id'>{$row['user_id']}</span>
        <span class='evento-id'>{$row['evento_id']}</span>
        <span class='payment-status'>{$row['payment_status']}</span>
      </div>";
    }
  }

  public function update($POST){
    // Obtenha os dados do formulário POST
    $this->user_id = $POST['user_id'];
    $this->evento_id = $POST['evento_id'];
    $this->payment_status = $POST['payment_status'];

    // Preparar a consulta SQL
    $query = "UPDATE {$this->table_name} SET payment_status = '{$this->payment_status}' WHERE user_id = {$this->user_id} AND evento_id = {$this->evento_id}";

    // Executar a consulta
    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function delete($POST){
    $this->user_id = $POST['user_id'];
    $this->evento_id = $POST['evento_id'];

    $query = "DELETE FROM {$this->table_name} WHERE user_id = {$this->user_id} AND evento_id = {$this->evento_id}";

    if (!$this->conn->query($query)) {
      echo "Error: " . $query . "<br>" . $this->conn->error;
      return false;
    }
  }

  public function __destruct(){
    $this->conn->close();
  }
}
