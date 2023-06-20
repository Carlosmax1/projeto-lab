// You can use JavaScript to handle the selected rating
var ratingInputs = document.querySelectorAll('.stars input[type="radio"]');

ratingInputs.forEach(function (input) {
  input.addEventListener("change", function () {
    var rating = this.value;
  });
});
