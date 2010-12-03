$('form').submit(function() {
  console.log($(this).serializeArray());
  return false;
});